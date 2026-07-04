import { useState, useMemo } from 'react';
import { Search, User } from 'lucide-react';
import { TextField as AriaTextField } from 'react-aria-components/TextField';
import { Input as AriaInput } from 'react-aria-components/Input';

import { useCoursesData } from '../../hooks/useCoursesData';
import { Alert } from '../../components/ui/Alert';
import FocusTTS from '../../components/ui/FocusTTS';
import { CourseCardSkeleton } from '../../components/courses/CourseCardSkeleton';

export function ExplorarCursosPage() {
  const { courses, loading, error } = useCoursesData();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase().trim();
    return courses.filter((c) => c.title.toLowerCase().includes(query));
  }, [courses, searchQuery]);

  const resultCount = filteredCourses.length;
  const totalCount = courses.length;

  return (
    <FocusTTS>
      <main className="mx-auto w-full max-w-310 px-6 py-12">
        <h1 className="text-3xl font-semibold text-text-headings">
          Explorar cursos
        </h1>

        <div role="search" aria-label="Buscar cursos" className="mt-6">
          <AriaTextField
            value={searchQuery}
            onChange={setSearchQuery}
            aria-label="Buscar curso por nombre"
            className="flex flex-col gap-1"
          >
            <label className="font-body text-sm font-medium text-text-headings">
              Buscar curso por nombre
            </label>
            <div className="relative">
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled"
              />
              <AriaInput className="w-full rounded-lg border border-border-card bg-white py-2 pl-10 pr-4 text-sm text-text-body placeholder:text-text-disabled focus:border-border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus" />
            </div>
          </AriaTextField>
        </div>

        {!loading && (
          <p className="mt-4 text-sm text-text-body" aria-hidden="true">
            Mostrando {resultCount} de {totalCount} cursos
          </p>
        )}

        {loading && (
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Cargando cursos">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i}><CourseCardSkeleton /></li>
            ))}
          </ul>
        )}

        {error && (
          <div className="mt-6">
            <Alert>{error}</Alert>
          </div>
        )}

        {!loading && !error && filteredCourses.length === 0 && (
          <p
            role="status"
            className="mt-12 text-center text-sm text-text-body"
          >
            No se encontraron cursos con ese nombre.
          </p>
        )}

        {!loading && !error && filteredCourses.length > 0 && (
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <li key={course.id}>
                <article className="flex h-full flex-col rounded-xl border border-border-card bg-white p-5">
                  <div className="space-y-2">
                    <h2 className="text-base font-medium text-text-headings">
                      {course.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-sm text-text-body">
                      <User size={14} aria-hidden="true" className="shrink-0" />
                      <span>{course.teacherName}</span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
    </FocusTTS>
  );
}
