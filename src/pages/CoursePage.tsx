import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DisclosurePanel, type Key, Button } from "react-aria-components";
import { Plus, UserPlus, BookOpen, MessageSquare, Users } from "lucide-react";

import { useCourse } from '../hooks/useCourse';
import { useTopicData } from '../hooks/useTopicData';
import { useCourseStudents, useRemoveStudentFromCourse } from '../hooks/useStudentList';
import { useAuth } from '../context/AuthContext';
import { useForum } from '../hooks/useForum';

import { DisclosureGroup } from "../components/kit/DisclosureGroup";
import { Disclosure, DisclosureHeader } from "../components/kit/Disclosure";
import CreateTopicModal from '../components/CreateTopicModal';
import TopicLessonsPanel from '../components/TopicLessonPanel';
import DashboardTabs from '../components/DashboardTabs';
import CourseStudentList from '../components/CourseStudentList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import StudentDetailModal from '../components/StudentDetailModal';
import RemoveStudentConfirmModal from '../components/StudentActionModal';
import AddOrEditStudentModal from '../components/StudentModal';
import PostCreator from '../components/PostCreator';
import PostCard from '../components/PostCard';
import FocusTTS from '../components/FocusTTS';
import { Alert } from '../components/Alert';

import type { Topic } from '../types/topic';
import type { CourseStudent, Student } from '../types/Student';

const TABS = [
  { id: "temas", label: "Temas", icon: <BookOpen size={16} aria-hidden="true" /> },
  { id: "estudiantes", label: "Estudiantes", icon: <Users size={16} aria-hidden="true" /> },
];

const PAGE_SIZE = 4;

function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { course, loading, error, notFound } = useCourse(id);
  const { topics, loading: topicsLoading, error: topicsError } = useTopicData(id);
  const { posts, loading: forumLoading, error: forumError, fetchPosts } = useForum();
  const [expandedKeys, setExpandedKeys] = useState(new Set<Key>([]));
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [localTopics, setLocalTopics] = useState<Topic[]>([]);
  const [openLessonModalFor, setOpenLessonModalFor] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState("temas");
  const [studentQuery, setStudentQuery] = useState("");
  const [studentPage, setStudentPage] = useState(1);
  const [hasVisitedStudents, setHasVisitedStudents] = useState(false);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [studentToView, setStudentToView] = useState<number | null>(null);
  const [studentToRemove, setStudentToRemove] = useState<CourseStudent | null>(null);

  const { data: studentsData, loading: studentsLoading, error: studentsError, refetch: refetchStudents } =
    useCourseStudents(hasVisitedStudents ? id : undefined, studentQuery, studentPage, PAGE_SIZE);
  const { removeStudent, loading: removing } = useRemoveStudentFromCourse();
  const [forumInitialFetchDone, setForumInitialFetchDone] = useState(false);

  const topicList = [...topics, ...localTopics];
  const totalStudentPages = studentsData ? Math.max(Math.ceil(studentsData.total / studentsData.pageSize), 1) : 1;

  function handleTabSelect(tabId: string) {
    setActiveTab(tabId);
    if (tabId === "estudiantes") {
      setHasVisitedStudents(true);
    }
  }

  useEffect(() => {
    if (!id) return;
    fetchPosts(id)
      .then(() => setForumInitialFetchDone(true))
      .catch(() => setForumInitialFetchDone(true));
  }, [id, fetchPosts]);

  function handleTopicCreated(newTopic: Topic) {
    setLocalTopics((prev) => [...prev, newTopic]);
  }

  function handleStudentSearchChange(value: string) {
    setStudentQuery(value);
    setStudentPage(1);
  }

  function handleStudentSaved() {
    setShowAddStudentModal(false);
    setStudentToEdit(null);
    refetchStudents();
  }

  function handleEditStudent(studentId: number) {
    const student = studentsData?.items.find((s) => s.id === studentId);
    if (!student) return;
    setStudentToEdit({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      disabilities: student.disabilities,
      courses: [],
    });
  }

  function handleRemoveStudent(studentId: number) {
    const student = studentsData?.items.find((s) => s.id === studentId);
    if (!student) return;
    setStudentToRemove(student);
  }

  function handleForumAction() {
    if (id) fetchPosts(id);
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col gap-10 px-4 py-8 focus:outline-none lg:px-16 lg:py-12">
        <section aria-label="Detalle del curso" className="flex flex-col gap-4">
          {loading && <p className="text-sm text-text-body">Cargando...</p>}
          {error && <p role="alert" className="text-sm text-text-danger">{error}</p>}
          {notFound && (
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-text-headings">Curso no disponible</h1>
              <p className="text-sm text-text-body">
                El equipo de Emcode sigue chambeando para mostrar el detalle de este curso lo antes posible.
              </p>
            </div>
          )}
          {!loading && !error && !notFound && course && (
            <div className="flex flex-col gap-4">
              <FocusTTS text={`${course.title}. ${course?.description ?? ""}`}>
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold text-text-headings">{course.title}</h1>
                  <p>Sigla: {course?.subtitle}</p>
                  <p>Descripción: {course?.description}</p>
                </div>
              </FocusTTS>
              {id && (
                <Link
                  to={`/courses/${id}/students`}
                  className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-surface-card px-4 py-2 text-sm font-semibold text-text-headings transition hover:bg-surface-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <Users size={18} aria-hidden="true" />
                  Estudiantes del curso
                </Link>
              )}
            </div>
          )}
        </section>

        <DashboardTabs tabs={TABS} activeId={activeTab} onSelect={handleTabSelect} />

        {activeTab === "temas" && (
          <section aria-label="Temas del curso" className="w-full mx-auto p-4 justify-center gap-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h2>Temas</h2>
              <Button
                aria-label="Crear nuevo tema"
                onPress={() => setShowTopicModal(true)}
                className="flex items-center gap-2 rounded-lg bg-surface-action px-4 py-2 text-sm font-semibold text-text-on-action border-none cursor-pointer transition hover:bg-surface-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <Plus size={18} aria-hidden="true" />
                Agregar tema
              </Button>
            </div>

            {topicsLoading && <p className="text-sm text-text-body">Cargando temas…</p>}
            {topicsError && <p role="alert" className="text-sm text-text-danger">{topicsError}</p>}

            {!topicsLoading && !topicsError && (
              <DisclosureGroup expandedKeys={expandedKeys} onExpandedChange={setExpandedKeys}>
                {topicList.map((topic: Topic) => (
                  <Disclosure key={topic.id}>
                    <DisclosureHeader
                      onAddLessonPress={() => setOpenLessonModalFor(topic.id)}
                    >
                      {topic.topicName}
                    </DisclosureHeader>
                    <DisclosurePanel className="p-4">
                      <TopicLessonsPanel
                        topicId={topic.id}
                        showLessonModal={openLessonModalFor === topic.id}
                        onCloseLessonModal={() => setOpenLessonModalFor(null)}
                      />
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </DisclosureGroup>
            )}
          </section>
        )}

        {activeTab === "estudiantes" && (
          <section aria-label="Estudiantes del curso" className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <SearchBar
                  value={studentQuery}
                  onChange={handleStudentSearchChange}
                  placeholder="Escribe el nombre que buscas"
                  aria-label="Buscar estudiante por nombre"
                />
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(true)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-surface-action px-4 py-2 text-sm font-semibold text-text-on-action transition hover:bg-surface-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <UserPlus size={18} aria-hidden="true" />
                  Agregar
                </button>
              </div>
            </div>

            {studentsLoading && (
              <p className="text-sm text-text-body" aria-live="polite">
                Cargando estudiantes...
              </p>
            )}
            {studentsError && <p className="text-sm text-text-danger">{studentsError}</p>}

            {!studentsLoading && !studentsError && studentsData && (
              <>
                <CourseStudentList
                  teacher={studentsData.teacher}
                  courseStudents={studentsData.items}
                  removeLabel="Remover del curso"
                  onViewDetails={(studentId) => setStudentToView(studentId)}
                  onEdit={handleEditStudent}
                  onRemove={handleRemoveStudent}
                />

                {studentsData.total > studentsData.pageSize && (
                  <Pagination page={studentPage} totalPages={totalStudentPages} onPageChange={setStudentPage} />
                )}
              </>
            )}
          </section>
        )}

        <section aria-label="Foro del curso" className="w-full mx-auto p-3 sm:p-4 justify-center gap-4 flex flex-col">
          <div className="flex items-center gap-2">
            <MessageSquare size={24} className="text-text-headings" aria-hidden="true" />
            <h2 className="text-xl font-bold text-text-headings">Foro</h2>
          </div>

          {!isAuthenticated && (
            <Alert>Inicia sesión para participar en el foro.</Alert>
          )}

          {isAuthenticated && id && (
            <PostCreator courseId={id} onPostCreated={handleForumAction} />
          )}

          {forumLoading && !forumInitialFetchDone && (
            <p className="text-sm text-text-body">Cargando foro...</p>
          )}

          {forumError && forumInitialFetchDone && (
            <Alert>{forumError}</Alert>
          )}

          {!forumLoading && forumInitialFetchDone && !forumError && posts.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <MessageSquare size={32} className="text-text-disabled" aria-hidden="true" />
              <p className="text-text-body text-sm">No hay publicaciones aún.</p>
              {isAuthenticated && (
                <p className="text-text-disabled text-xs">Sé el primero en publicar.</p>
              )}
            </div>
          )}

          {!forumLoading && posts.length > 0 && (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <div key={post.id} className="rounded-lg border border-border-card bg-surface-primary p-3 sm:p-4">
                  <PostCard post={post} courseId={id!} depth={0} onAction={handleForumAction} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showTopicModal && id && (
        <CreateTopicModal
          courseId={id}
          onClose={() => setShowTopicModal(false)}
          onAddTopic={handleTopicCreated}
        />
      )}

      {showAddStudentModal && id && (
        <AddOrEditStudentModal
          courseId={Number(id)}
          onClose={() => setShowAddStudentModal(false)}
          onSaved={handleStudentSaved}
        />
      )}

      {studentToEdit && id && (
        <AddOrEditStudentModal
          courseId={Number(id)}
          studentToEdit={studentToEdit}
          onClose={() => setStudentToEdit(null)}
          onSaved={handleStudentSaved}
        />
      )}

      {studentToView !== null && (
        <StudentDetailModal studentId={studentToView} onClose={() => setStudentToView(null)} />
      )}

      {studentToRemove && id && (
        <RemoveStudentConfirmModal
          studentName={`${studentToRemove.firstName} ${studentToRemove.lastName}`}
          courseName={studentsData?.course.title}
          loading={removing}
          onClose={() => setStudentToRemove(null)}
          onConfirm={async () => {
            try {
              await removeStudent(Number(id), studentToRemove.id);
              setStudentToRemove(null);
              refetchStudents();
            } catch {
              // El hook ya expone el error si se necesita mostrar feedback adicional.
            }
          }}
        />
      )}

      {removing && (
        <p role="status" aria-live="polite" className="sr-only">
          Removiendo estudiante del curso...
        </p>
      )}
    </div>
  );
}

export default CoursePage;
