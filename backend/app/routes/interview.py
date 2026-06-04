from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.config.database import get_database
from app.services.gemini_service import generate_questions, evaluate_answers
router = APIRouter()
class AnswerItem(BaseModel):
    question: str
    answer: str
class EvaluateRequest(BaseModel):
    email: str
    answers: List[AnswerItem]
@router.get("/questions")
def get_questions(email: str):
    db = get_database()
    resume = db.resumes.find_one({"email": email})
    if not resume:
        return {"success": False, "message": "Resume not found"}
    questions = generate_questions(resume["resume_text"])
    db.interviews.insert_one({"email": email, "questions": questions})
    return {"success": True, "questions": questions}
@router.post("/evaluate")
def evaluate(request: EvaluateRequest):
    db = get_database()
    feedback = evaluate_answers(request.answers)
    db.results.insert_one({
        "email": request.email,
        "feedback": [f.dict() for f in request.answers]
    })
    return {"success": True, "feedback": feedback}
