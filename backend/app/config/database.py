from pymongo import MongoClient
MONGO_URI = "mongodb+srv://bandariswaran77_db_user:e9xZY0NovNde9d4W@ai-mock-interview.5woxz9n.mongodb.net/?appName=AI-Mock-Interview"
DATABASE_NAME = "ai_mock_interview"
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
def get_database():
    return db
