from pymongo import MongoClient
import os
MONGO_URI = "mongodb+srv://bandariswaran77_db_user:e9xZY0NovNde9d4W@ai-mock-interview.5woxz9n.mongodb.net/?appName=AI-Mock-Interview"
DATABASE_NAME = "ai_mock_interview"
with open(os.path.join(os.path.dirname(__file__), '..', '..', '.env')) as f:
    for line in f:
        line = line.strip()
        if line and '=' in line:
            key, value = line.split('=', 1)
            os.environ[key.strip()] = value.strip()
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
def get_database():
    return db
