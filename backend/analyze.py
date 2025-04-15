import sys
import json
from textblob import TextBlob

def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment = blob.sentiment
    result = {
        "polarity": sentiment.polarity,
        "subjectivity": sentiment.subjectivity,
        "label": "positive" if sentiment.polarity > 0 else "negative" if sentiment.polarity < 0 else "neutral"
    }
    return result

if __name__ == "__main__":
    try:
        text = sys.argv[1]
        result = analyze_sentiment(text)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
