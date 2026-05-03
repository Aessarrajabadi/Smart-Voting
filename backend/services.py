from utils import sanitize_input

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

def get_chat_response(message):
    """
    Simple rule-based chatbot for election education.
    """
    message = sanitize_input(message).lower()
    
    responses = {
        "registration": "To register to vote, you need to fill Form 6. You can do this online on the NVSP (National Voter's Service Portal) website or offline via your BLO.",
        "dates": "Election dates vary by state and constituency. Please visit the official Election Commission of India website (eci.gov.in) for the latest schedule.",
        "evm": "An EVM (Electronic Voting Machine) is used to cast your vote. You press the blue button next to your chosen candidate's symbol. A beep sound indicates your vote is cast.",
        "greeting": "Hello! I am your Election Education Assistant. How can I help you today?"
    }

    if any(word in message for word in ['register', 'apply', 'voter id', 'form 6']):
        return responses["registration"]
    elif any(word in message for word in ['date', 'when', 'schedule']):
        return responses["dates"]
    elif any(word in message for word in ['evm', 'machine', 'button', 'cast']):
        return responses["evm"]
    elif any(word in message for word in ['hello', 'hi', 'hey']):
        return responses["greeting"]
    
    return "I'm sorry, I didn't understand that. You can ask me about voter registration, election dates, or how to use an EVM."

def detect_fake_news(text):
    """
    Keyword-based fake news detection.
    """
    text = sanitize_input(text).lower()
    
    fake_keywords = ['cancel', 'postpone', 'banned', 'secret', 'hacked', 'leak', 'fraud', 'rigged']
    trust_keywords = ['eci', 'election commission', 'official', 'announced', 'press release']
    
    fake_score = sum(1 for word in fake_keywords if word in text)
    trust_score = sum(1 for word in trust_keywords if word in text)
    
    if fake_score > trust_score:
        return {
            "is_fake": True,
            "confidence": 0.85,
            "message": "This text contains words often associated with fake news or rumors. Please verify with official ECI sources."
        }
    else:
        return {
            "is_fake": False,
            "confidence": 0.65,
            "message": "This text does not trigger our fake news alerts, but always cross-check with reliable sources."
        }
