from fastapi import APIRouter, UploadFile, File
from app.config.database import get_database
import PyPDF2
import io
router = APIRouter()
@router.post("/upload")
async def upload_resume(email: str, file: UploadFile = File(...)):
    db = get_database()
    contents = await file.read()
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    db.resumes.update_one(
        {"email": email},
        {"$set": {"email": email, "resume_text": text}},
        upsert=True
    )
    return {"success": True, "message": "Resume uploaded successfully", "text_length": len(text)}
