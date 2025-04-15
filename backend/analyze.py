import sys
from textblob import TextBlob

text = sys.argv[1]
blob = TextBlob(text)
polarity = blob.sentiment.polarity

if polarity > 0:
    print("Positive")
elif polarity < 0:
    print("Negative")
else:
    print("Neutral")
