from functools import lru_cache
from utils import sanitize_input

# Pre-defined responses to avoid re-creation on every function call
CHAT_RESPONSES = {
    "registration": "To register to vote, you need to fill Form 6. You can do this online on the NVSP (National Voter's Service Portal) website or offline via your BLO.",
    "dates": "Election dates vary by state and constituency. Please visit the official Election Commission of India website (eci.gov.in) for the latest schedule.",
    "evm": "An EVM (Electronic Voting Machine) is used to cast your vote. You press the blue button next to your chosen candidate's symbol. A beep sound indicates your vote is cast.",
    "greeting": "Hello! I am your Election Education Assistant. How can I help you today?"
}

# Compiled sets for faster lookup
FAKE_KEYWORDS = {'cancel', 'postpone', 'banned', 'secret', 'hacked', 'leak', 'fraud', 'rigged', 'fake', 'scam'}
TRUST_KEYWORDS = {'eci', 'election commission', 'official', 'announced', 'press release', 'verified', 'authentic'}

def get_eligibility_status(age, citizenship):
    """
    Checks if a person is eligible to vote in India.
    """
    citizenship = citizenship.lower()
    if age >= 18 and 'india' in citizenship:
        return {
            "eligible": True,
            "message": "You are eligible to vote!"
        }
    elif age < 18:
        return {
            "eligible": False,
            "message": f"You are not eligible to vote. You must be 18 or older. You are {age}."
        }
    else:
        return {
            "eligible": False,
            "message": "You must be an Indian citizen to vote in India."
        }

@lru_cache(maxsize=256)
def get_chat_response(message):
    """
    Simple rule-based chatbot for election education.
    """
    msg_words = set(sanitize_input(message).lower().split())
    
    if any(word in msg_words for word in {'register', 'apply', 'voter id', 'form 6'}):
        return CHAT_RESPONSES["registration"]
    elif any(word in msg_words for word in {'date', 'when', 'schedule'}):
        return CHAT_RESPONSES["dates"]
    elif any(word in msg_words for word in {'evm', 'machine', 'button', 'cast'}):
        return CHAT_RESPONSES["evm"]
    elif any(word in msg_words for word in {'hello', 'hi', 'hey', 'greetings'}):
        return CHAT_RESPONSES["greeting"]
    
    return "I'm sorry, I didn't understand that. You can ask me about voter registration, election dates, or how to use an EVM."

@lru_cache(maxsize=256)
def detect_fake_news(text):
    """
    Keyword-based fake news detection optimized with set operations.
    """
    words = set(sanitize_input(text).lower().split())
    
    # Calculate scores using set intersections (O(n) where n is number of words)
    fake_matches = words.intersection(FAKE_KEYWORDS)
    trust_matches = words.intersection(TRUST_KEYWORDS)
    
    fake_score = len(fake_matches)
    trust_score = len(trust_matches)
    
    if fake_score > trust_score:
        confidence = min(0.95, 0.7 + (fake_score * 0.05))
        return {
            "is_fake": True,
            "confidence": confidence,
            "message": f"Alert: This text contains suspicious keywords ({', '.join(fake_matches)}). Please verify with official ECI sources."
        }
    else:
        confidence = min(0.9, 0.6 + (trust_score * 0.05))
        return {
            "is_fake": False,
            "confidence": confidence,
            "message": "This text does not trigger major fake news alerts. However, always cross-check with reliable sources."
        }
