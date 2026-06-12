import CourseCard from "./CourseCard";
import type { Course } from "../types/dashboard";

interface CourseListProps {
  courses: Course[];
}

function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return <p className="text-sm text-text-body">No hay cursos disponibles</p>;
  }

  return (
    <section aria-label="Lista de cursos">
      <ul className="grid list-none grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <li key={course.id} className="h-full">
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CourseList;