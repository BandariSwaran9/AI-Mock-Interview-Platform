from fastapi import APIRouter
from pydantic import BaseModel
from app.config.database import get_database
router = APIRouter()
class UserRegister(BaseModel):
    name: str
    email: str
    password: str
class UserLogin(BaseModel):
    email: str
    password: str
@router.post("/register")
def register(user: UserRegister):
    db = get_database()
    existing = db.users.find_one({"email": user.email})
    if existing:
        return {"success": False, "message": "Email already exists"}
    db.users.insert_one({
        "name": user.name,
        "email": user.email,
        "password": user.password
    })
    return {"success": True, "message": "Account created successfully"}
@router.post("/login")
def login(user: UserLogin):
    db = get_database()
    found = db.users.find_one({"email": user.email, "password": user.password})
    if not found:
        return {"success": False, "message": "Invalid email or password"}
    return {"success": True, "message": "Login successful", "name": found["name"]}
