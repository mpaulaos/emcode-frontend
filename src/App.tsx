import "swiper/swiper-bundle.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import { GuidesPage } from "./pages/GuidesPage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import TeacherDashboardPage  from "./pages/TeacherDashboardPage";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {

  return (
    <AuthProvider>
      <div className="min-h-screen bg-surface-page text-text-body">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/cursos/:id" element={<CoursePage />} />
          <Route path="/guias" element={<GuidesPage />} />
          <Route path="/acerca-de" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/teacher" element={<TeacherDashboardPage teacherName="Profesor" courses={[]} onAddCourse={() => {}} />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
