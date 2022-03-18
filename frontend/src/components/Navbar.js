import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios"
import { API } from "../api"

export function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleSubmit() {
    axios.post(API.auth.logout)
      .then(res => {
        logout()
        navigate('/login')
      })
  }

  return (
    <nav className="max-w-7xl mx-auto py-5 px-4 border-b border-gray-200">
      <ul className="flex items-center justify-between">
        <div className="flex items-center">
          <li className="text-black">
            <Link className="hover:text-blue-600" to="/a">Home</Link>
          </li>

          <li className="px-3 text-black">
            <Link className="hover:text-blue-600" to="/create-files">Add a Link</Link>
          </li>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
            <li className="px-3 text-black">
                <Link className="hover:text-blue-600" to="/">My Video</Link>
            </li>
            <li className="px-3 text-black">
              <button className="hover:text-blue-600" onClick={handleSubmit}>
                Logout
              </button>
            </li>
            </div>
          ) : (
            <div className="flex items-center">
              <li className="px-3 text-black">
                <Link className="hover:text-blue-600" to="/signup">Signup</Link>
              </li>
              <li className="px-3 text-black">
                <Link className="hover:text-blue-600" to="/login">Login</Link>
              </li>
            </div>
          )}
        </div>

      </ul>
    </nav>
  )
}