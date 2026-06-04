from fastapi import APIRouter
from app.config.database import get_database
from app.services.gemini_service import generate_questions
router = APIRouter()
@router.get("/questions")
def get_questions(email: str):
    db = get_database()
    resume = db.resumes.find_one({"email": email})
    if not resume:
        return {"success": False, "message": "Resume not found"}
    questions = generate_questions(resume["resume_text"])
    db.interviews.insert_one({
        "email": email,
        "questions": questions
    })
    return {"success": True, "questions": questions}
