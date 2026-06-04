import pathlib; content = open("app/routes/resume.py").read(); fixed = content.replace("{\"\\$set\"", "{\"$set\""); open("app/routes/resume.py", "w").write(fixed); print("Fixed!")
