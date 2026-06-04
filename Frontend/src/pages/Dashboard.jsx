import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      navigate('/login')
    } else {
      setUser(JSON.parse(stored))
    }
  }, [])
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">
        Welcome, {user?.name}!
      </h1>
      <p className="text-gray-400 text-xl mb-8">Your AI Mock Interview Dashboard</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/resume-upload')}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg"
        >
          Upload Resume
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg"
        >
          Start Interview
        </button>
      </div>
    </div>
  )
}
export default Dashboard
