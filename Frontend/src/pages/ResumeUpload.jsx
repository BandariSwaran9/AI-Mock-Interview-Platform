import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function ResumeUpload() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a PDF file first!')
      return
    }
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/resume/upload?email=' + user.email,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      if (res.data.success) {
        setMessage('Resume uploaded successfully! Redirecting...')
        setTimeout(() => navigate('/dashboard'), 2000)
      } else {
        setMessage('Upload failed. Try again.')
      }
    } catch (err) {
      setMessage('Something went wrong. Try again.')
    }
    setLoading(false)
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold text-blue-400 mb-2">Upload Resume</h2>
        <p className="text-gray-400 mb-6">Upload your PDF resume to get started</p>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6">
          <p className="text-gray-400 mb-4">Select your resume (PDF only)</p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="text-white"
          />
        </div>
        {file && (
          <p className="text-green-400 mb-4">Selected: {file.name}</p>
        )}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold"
        >
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
        {message && (
          <p className="text-center mt-4 text-yellow-400">{message}</p>
        )}
      </div>
    </div>
  )
}
export default ResumeUpload
