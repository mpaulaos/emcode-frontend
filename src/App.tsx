import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTeacherDashboard } from './hooks/useTeacherDashboard';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import CoursePage from './pages/CoursePage';
import type { Course } from './components/dashboardData';

function App() {
  
  const { data, loading, error } = useTeacherDashboard();
  const [courses, setCourses] = useState<Course[]>([]);
  

  useEffect(() => {
    if (data?.courses) setCourses(data.courses);
  }, [data]);

  function handleAddCourse(newCourse: Course) {
    setCourses((prev) => [...prev, newCourse]);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p role="alert" className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TeacherDashboardPage
            teacherName={data?.teacherName ?? ''}
            courses={courses}
            onAddCourse={handleAddCourse}
          />
        }
      />

      <Route path="/courses/:id" element={<CoursePage />} />
    </Routes>
  );
}

export default App;