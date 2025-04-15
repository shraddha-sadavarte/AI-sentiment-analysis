import sys
from textblob import TextBlob

# Get text input from command line argument
text = sys.argv[1]

# Perform sentiment analysis using TextBlob
blob = TextBlob(text)
polarity = blob.sentiment.polarity

# Determine sentiment based on polarity
if polarity > 0:
    sentiment = "Positive"
elif polarity < 0:
    sentiment = "Negative"
else:
    sentiment = "Neutral"

# Confidence is the absolute value of polarity (from 0 to 1)
confidence = abs(polarity)

# Return sentiment and confidence score (polarity as confidence)
print(f"{sentiment}|{confidence}")
