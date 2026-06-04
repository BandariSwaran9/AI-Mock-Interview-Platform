function Register() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Create Account</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-4 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg mb-6 outline-none"
        />
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold">
          Register
        </button>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  )
}
export default Register
