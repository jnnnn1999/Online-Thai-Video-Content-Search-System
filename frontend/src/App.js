import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,

} from "react-router-dom";
import { AuthContext, AuthContextProvider } from './contexts/AuthContext'
import { FileList } from "./components/FileList";
import { FileDetail } from "./components/FileDetail";
import { FileCreate } from "./components/FileCreate";
import { FileUpdate } from "./components/FileUpdate";
import { FileDelete } from "./components/FileDelete";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Signup } from "./components/Signup";
import { ConfirmEmail } from "./components/ConfirmEmail";
import { Search } from "./components/Search";
import { LandingPage } from "./components/LandingPage";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)
  return user ? children : <Navigate replace to="/login" />
}

export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>
          <Navbar />


          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <div>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/users" element={<Users />} />
              <Route path="/files/:id" element={<PrivateRoute><FileDetail /></PrivateRoute>} exact/>
              <Route path="/files/:id/update" element={<PrivateRoute><FileUpdate /></PrivateRoute>} exact />
              <Route path="/files/:id/delete" element={<PrivateRoute><FileDelete /></PrivateRoute>} exact />
              <Route path="/search/custom/" element={<PrivateRoute><Search /></PrivateRoute>} exact />
              <Route path="/create-files" element={<PrivateRoute><FileCreate /></PrivateRoute>} exact />
              <Route path="/login" element={<Login />} exact/>
              <Route path="/signup" element={<Signup />} exact />
              <Route path="/accounts/confirm-email/:key" element={<ConfirmEmail />} exact />
              <Route path="/a" element={<LandingPage/>} exact />
              <Route path="/" element={<FileList />} exact />
            </Routes>
          </div>

        </div>
      </AuthContextProvider>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
