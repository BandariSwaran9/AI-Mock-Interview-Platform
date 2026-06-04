import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-400">AI Mock Interview</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/login" className="hover:text-blue-400">Login</Link>
      </div>
    </nav>
  )
}
export default Navbar
