import { DisclosurePanel, type Key } from "react-aria-components";

import { DisclosureGroup } from "./kit/DisclosureGroup";
import { Disclosure, DisclosureHeader } from "./kit/Disclosure";

import { LessonsList } from "./LessonsList";
import type { Topic } from "../types/topic";
import { useLessonsListData } from "../hooks/useLessonsList";

import { useState } from "react";
import { useParams } from "react-router-dom";



interface TopicsDisplayProps {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

function TopicsDisplay({ topics, loading, error }: TopicsDisplayProps) {
  const [expandedKeys, setExpandedKeys] = useState(new Set<Key>([]));
  const { id } = useParams<{ id: string }>();
  const {
    lessons,
    loading: lessonsLoading,
    error: lessonsError,
  } = useLessonsListData(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-text-body text-body-lg animate-pulse">
          Loading topics…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full  mx-auto p-4 justify-center gap-4 flex flex-col">
      <h2>Temas</h2>

      <DisclosureGroup
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
      >
        {topics.map((topic) => (
          <Disclosure key={topic.id}>
            <DisclosureHeader>{topic.topicName}</DisclosureHeader>

            {
              <DisclosurePanel className="p-4 bg-gray-100 rounded-lg">
                <LessonsList
                  key={topic.id}
                  lessons={lessons}
                  loading={lessonsLoading}
                  error={lessonsError}
                />
              </DisclosurePanel>
            }
          </Disclosure>
        ))}
      </DisclosureGroup>
    </div>
  );
}

export default TopicsDisplay;
