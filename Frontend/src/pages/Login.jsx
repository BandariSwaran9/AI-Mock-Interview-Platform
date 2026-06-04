import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/login', form)
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify({ name: res.data.name, email: form.email }))
        setMessage('Login successful! Redirecting...')
        setTimeout(() => navigate('/dashboard'), 2000)
      } else {
        setMessage(res.data.message)
      }
    } catch (err) {
      setMessage('Something went wrong. Try again.')
    }
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-6 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold"
        >
          Login
        </button>
        {message && <p className="text-center mt-4 text-yellow-400">{message}</p>}
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  )
}
export default Login
