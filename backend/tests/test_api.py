import pytest
import sys
import os

# Add the parent directory to sys.path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_eligibility_eligible(client):
    """Test eligibility for a valid Indian citizen above 18."""
    response = client.post('/eligibility', json={'age': 25, 'citizenship': 'Indian'})
    data = response.get_json()
    assert response.status_code == 200
    assert data['eligible'] is True
    assert "eligible" in data['message']

def test_eligibility_underage(client):
    """Test eligibility for a person under 18."""
    response = client.post('/eligibility', json={'age': 15, 'citizenship': 'Indian'})
    data = response.get_json()
    assert response.status_code == 200
    assert data['eligible'] is False
    assert "not eligible" in data['message']

def test_eligibility_invalid_input(client):
    """Test eligibility with invalid age format."""
    response = client.post('/eligibility', json={'age': 'invalid', 'citizenship': 'Indian'})
    assert response.status_code == 400
    assert "error" in response.get_json()

def test_chat_registration(client):
    """Test chat response for registration query."""
    response = client.post('/chat', json={'message': 'How do I register to vote?'})
    data = response.get_json()
    assert response.status_code == 200
    assert "Form 6" in data['reply']

def test_chat_greeting(client):
    """Test chat response for greeting."""
    response = client.post('/chat', json={'message': 'Hello'})
    data = response.get_json()
    assert response.status_code == 200
    assert "Election Education Assistant" in data['reply']

def test_fake_news_positive(client):
    """Test fake news detection for a suspicious text."""
    response = client.post('/fake-news', json={'text': 'The election is rigged and cancelled!'})
    data = response.get_json()
    assert response.status_code == 200
    assert data['is_fake'] is True
    assert data['confidence'] > 0.5

def test_fake_news_negative(client):
    """Test fake news detection for a neutral text."""
    response = client.post('/fake-news', json={'text': 'The Election Commission announced the schedule.'})
    data = response.get_json()
    assert response.status_code == 200
    assert data['is_fake'] is False
