from google import genai
import os
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)
def generate_questions(resume_text: str):
    prompt = f"""
    You are an expert technical interviewer.
    Based on the following resume, generate 5 interview questions.
    Resume:
    {resume_text}
    Generate exactly 5 questions in this format:
    1. Question one
    2. Question two
    3. Question three
    4. Question four
    5. Question five
    Only return the questions, nothing else.
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    text = response.text
    questions = []
    for line in text.strip().split("\n"):
        line = line.strip()
        if line and line[0].isdigit():
            question = line.split(".", 1)[-1].strip()
            questions.append(question)
    return questions
