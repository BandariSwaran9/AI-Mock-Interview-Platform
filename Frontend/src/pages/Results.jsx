import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Results() {
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const evaluate = async () => {
      const answers = JSON.parse(localStorage.getItem('interview_answers'))
      try {
        const res = await axios.post('http://127.0.0.1:8000/interview/evaluate', {
          email: user.email,
          answers: answers
        })
        if (res.data.success) {
          setFeedback(res.data.feedback)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    evaluate()
  }, [])
  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-blue-400 text-xl">AI is evaluating your answers...</p>
    </div>
  )
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-8 text-center">Interview Results</h1>
        {feedback && feedback.map((item, index) => (
          <div key={index} className="bg-gray-900 p-6 rounded-xl mb-4">
            <p className="text-gray-400 text-sm mb-2">Question {index + 1}</p>
            <p className="text-white font-bold mb-2">{item.question}</p>
            <p className="text-gray-300 mb-4">Your answer: {item.answer}</p>
            <div className="flex items-center gap-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                Score: {item.score}/10
              </span>
              <p className="text-green-400 text-sm">{item.feedback}</p>
            </div>
          </div>
        ))}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold mt-4"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
export default Results
