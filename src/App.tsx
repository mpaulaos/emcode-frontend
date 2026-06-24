import { useState } from "react";
import "swiper/swiper-bundle.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import CoursePage from "./pages/CoursePage";
import GuidesPage from "./pages/GuidesPage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import TeacherDashboardPage  from "./pages/TeacherDashboardPage";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";
import DisabilityInfoPage from "./pages/DisabilityInfoPage";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { AccessibilityWidget } from "./components/accessibility/AccessibilityWidget";
import { ColorBlindnessFilters } from "./components/accessibility/ColorBlindnessFilters";
import { ReadingMask } from "./components/accessibility/ReadingMask";
import StudentsPage from "./pages/StudentListPage";
import TeacherStudentsListPage from "./pages/TeacherStudentsListPage";

function App() {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  return (
    <AuthProvider>
      <AccessibilityProvider>
        <ColorBlindnessFilters />
        <ReadingMask />
        <div className="min-h-screen bg-surface-page text-text-body">
          <Navbar onAccessibilityOpen={() => setIsAccessibilityOpen(true)} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cursos" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursePage />} />
            <Route path="/guias" element={<GuidesPage />} />
            <Route path="/acerca-de" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/teacher" element={<TeacherDashboardPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/disabilities" element={<DisabilityInfoPage />} />
            <Route path="/teacher/students" element={<TeacherStudentsListPage />} />
              <Route path="/courses/:id/students" element={<StudentsPage />} />
            </Route>
          </Routes>

          <Footer />
          <AccessibilityWidget
            isOpen={isAccessibilityOpen}
            onClose={() => setIsAccessibilityOpen(false)}
          />
          <ChatWidget />
        </div>
      </AccessibilityProvider>
    </AuthProvider>
  );
}

export default App;
