import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Interview() {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('https://ai-mock-interview-platform-j6yx.onrender.com/interview/questions?email=' + user.email)
        if (res.data.success) {
          setQuestions(res.data.questions)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchQuestions()
  }, [])
  const handleNext = () => {
    const newAnswers = [...answers, { question: questions[currentIndex], answer }]
    setAnswers(newAnswers)
    setAnswer('')
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      localStorage.setItem('interview_answers', JSON.stringify(newAnswers))
      setFinished(true)
      setTimeout(() => navigate('/results'), 2000)
    }
  }
  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-blue-400 text-xl">Loading your questions...</p>
    </div>
  )
  if (finished) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-green-400 text-xl">Interview complete! Generating feedback...</p>
    </div>
  )
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-blue-400 font-bold text-lg">AI Mock Interview</h2>
          <span className="text-gray-400">Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: progress + '%' }}
          ></div>
        </div>
        <p className="text-white text-xl mb-6">{questions[currentIndex]}</p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={6}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none mb-6 resize-none"
        />
        <button
          onClick={handleNext}
          disabled={!answer.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-bold"
        >
          {currentIndex + 1 === questions.length ? 'Finish Interview' : 'Next Question'}
        </button>
      </div>
    </div>
  )
}
export default Interview
