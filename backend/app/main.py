from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import get_database
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "Backend Running"}
@app.get("/health")
def health():
    db = get_database()
    return {"status": "ok", "database": "connected"}
