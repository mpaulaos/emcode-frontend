import "swiper/swiper-bundle.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import TeacherDashboardPage  from "./pages/TeacherDashboardPage";
import Footer from "./components/Footer";

function App() {

  return (
      <div className="min-h-screen bg-neutral-100 text-neutral-900">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/teacher" element={<TeacherDashboardPage />} />
        </Routes>

        <Footer />
      </div>
  );
}

export default App;
