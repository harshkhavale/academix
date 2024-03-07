import Navbar from "./components/Navbar";
import "./index.css";
import Main from "./pages/Main";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth";
// import MentorProfile from "./components/MentorProfile";
import Mentor from "./pages/Teacher";
import TeacherForm from "./pages/TeacherForm";
import Teacher from "./pages/Teacher";
import TeacherProfile from "./pages/TeacherProfile";
import ClassroomProfile from "./pages/ClassroomProfile";

function App() {
  const user = useSelector((state) => state.user.user);
  console.log("userrrr", user);
  return (
    <div className="App  overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<NotFound />} />

          {user && (
            <Route
              path="/userdashboard"
              element={
                !user.isTeacher ? <User /> : <Navigate to="/auth/login" />
              }
            />
          )}

          {user && (
            <Route
              path="/teacherdashboard"
              element={
                user.isTeacher ? <Teacher /> : <Navigate to="/auth/login" />
              }
            />
          )}
          <Route
            path="/auth/:parameter"
            element={user ? user.isTeacher ? <Teacher /> : <User /> : <Auth />}
          />

          <Route path="/teachers/:id" element={<TeacherProfile />} />
          <Route path="/classrooms/:id" element={<ClassroomProfile />} />

          <Route path="/teacherform" element={<TeacherForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
