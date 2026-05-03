import re

def sanitize_input(text, max_length=5000):
    """
    Sanitizes input by removing HTML tags, trimming whitespace, and enforcing max length.
    """
    if not isinstance(text, str):
        return ""
    # Remove HTML tags using a more robust regex or just basic escaping
    clean_text = re.sub(r'<[^>]*>', '', text)
    # Basic protection against common injection patterns
    clean_text = clean_text.replace("'", "''") 
    return clean_text.strip()[:max_length]

def validate_string_input(data, key, max_length=5000, required=True):
    """
    Validates that a key exists in data and is a valid sanitized string.
    """
    val = data.get(key)
    if required and (val is None or str(val).strip() == ""):
        return None, f"{key.capitalize()} is required"
    
    sanitized = sanitize_input(val, max_length)
    return sanitized, None

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
