from google import genai
import os
import json
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
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
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
    for item in answers:
        prompt = f"""
        You are an expert interviewer evaluating a candidate's answer.
        Question: {item.question}
        Answer: {item.answer}
        Evaluate the answer and respond in this exact JSON format:
        {{"score": 7, "feedback": "Good explanation but missing key concepts."}}
        Only return the JSON, nothing else.
        """
        response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
        text = response.text.strip()
        text = text.replace("`json", "").replace("`", "").strip()
        try:
            data = json.loads(text)
            results.append({
                "question": item.question,
                "answer": item.answer,
                "score": data.get("score", 5),
                "feedback": data.get("feedback", "Good attempt.")
            })
        except:
            results.append({
                "question": item.question,
                "answer": item.answer,
                "score": 5,
                "feedback": "Could not evaluate. Please try again."
            })
    return results
