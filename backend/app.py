from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman

from utils import validate_eligibility_input, validate_string_input
from services import get_eligibility_status, get_chat_response, detect_fake_news

import os

app = Flask(__name__, static_folder='static', static_url_path='')

# Security & CORS
CORS(app)

# Use Talisman for secure headers. 
# Basic CSP to allow local dev and common assets.
csp = {
    'default-src': '\'self\'',
    'script-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://apis.google.com',
        'https://www.gstatic.com'
    ],
    'style-src': [
        '\'self\'',
        '\'unsafe-inline\'',
        'https://fonts.googleapis.com'
    ],
    'font-src': [
        '\'self\'',
        'https://fonts.gstatic.com'
    ],
    'img-src': ['\'self\'', 'data:', 'https://*.googleusercontent.com']
}

Talisman(app, content_security_policy=csp, force_https=False)

# Rate Limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

@app.route('/eligibility', methods=['POST'])
@limiter.limit("10 per minute")
def check_eligibility():
    data = request.get_json()
    validated_data, error = validate_eligibility_input(data)
    
    if error:
        return jsonify({"error": error}), 400
    
    result = get_eligibility_status(validated_data['age'], validated_data['citizenship'])
    return jsonify(result)

@app.route('/chat', methods=['POST'])
@limiter.limit("20 per minute")
def chat():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    message, error = validate_string_input(data, 'message', max_length=500)
    if error:
        return jsonify({"error": error}), 400
    
    response = get_chat_response(message)
    return jsonify({"reply": response})

@app.route('/fake-news', methods=['POST'])
@limiter.limit("10 per minute")
def fake_news():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    text, error = validate_string_input(data, 'text', max_length=2000)
    if error:
        return jsonify({"error": error}), 400
    
    result = detect_fake_news(text)
    return jsonify(result)

@app.route('/')
def serve():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({"error": "Rate limit exceeded. Please try again later."}), 429

if __name__ == '__main__':
    # Running on 0.0.0.0 to allow access from local network if needed
    app.run(debug=True, port=5000)
