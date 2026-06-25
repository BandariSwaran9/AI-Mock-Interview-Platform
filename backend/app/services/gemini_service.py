from google import genai
from google.genai import types
import os
import json
import time
import random
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)
def generate_questions(resume_text: str):
    angles = [
        "Focus more on technical depth and implementation details.",
        "Focus more on problem-solving approach and decision-making.",
        "Focus more on real-world impact and practical applications.",
        "Focus more on challenges faced and how they were overcome.",
        "Focus more on collaboration, learning, and growth from the experience."
    ]
    chosen_angle = random.choice(angles)
    prompt = f"""
    You are an expert technical interviewer.
    Based on the following resume, generate 5 interview questions.
    {chosen_angle}
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
        contents=prompt,
        config=types.GenerateContentConfig(temperature=1.0)
    )
    text = response.text
    questions = []
    for line in text.strip().split("\n"):
        line = line.strip()
        if line and line[0].isdigit():
            question = line.split(".", 1)[-1].strip()
            questions.append(question)
    return questions
def evaluate_answers(answers):
    results = []
    for index, item in enumerate(answers):
        prompt = f"""
        You are an expert interviewer evaluating a candidate's answer.
        Question: {item.question}
        Answer: {item.answer}
        Evaluate the answer and respond in this exact JSON format:
        {{"score": 7, "feedback": "Good explanation but missing key concepts."}}
        Only return the JSON, nothing else.
        """
        try:
            response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
            text = response.text.strip()
            text = text.replace("", "").replace("", "").strip()
            data = json.loads(text)
            results.append({
                "question": item.question,
                "answer": item.answer,
                "score": data.get("score", 5),
                "feedback": data.get("feedback", "Good attempt.")
            })
        except Exception as e:
            results.append({
                "question": item.question,
                "answer": item.answer,
                "score": 5,
                "feedback": "Could not evaluate this answer. Quota limit reached, please try again in a minute."
            })
        if index < len(answers) - 1:
            time.sleep(13)
    return results
