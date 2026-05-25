import { useState } from 'react';
import './App.css';

import TopicsDisplay from './components/TopicsDisplay';

import { useTopicData } from './hooks/useTopicData';


function App() {

  const { topics, loading, error } = useTopicData();
 


  return (

    <>
      {/* Page background and centering container */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
        <TopicsDisplay
          topics={topics}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
}

export default App;