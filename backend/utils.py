import re

def sanitize_input(text):
    """
    Basic sanitization to remove HTML tags and trim whitespace.
    """
    if not isinstance(text, str):
        return ""
    # Remove HTML tags
    clean_text = re.sub(r'<[^>]*>', '', text)
    return clean_text.strip()

def validate_eligibility_input(data):
    """
    Validates input for the eligibility endpoint.
    """
    if not data:
        return None, "No data provided"
    
    age = data.get('age')
    citizenship = data.get('citizenship', '')
    
    if age is None:
        return None, "Age is required"
    
    try:
        age = int(age)
    except (ValueError, TypeError):
        return None, "Invalid age format"
    
    return {"age": age, "citizenship": str(citizenship)}, None
