
// src/pages/index.tsx
import React from 'react';
import TaskList from '../../src/taskList'; // Importe o TaskList

const HomePage = () => {
  return (
    <div>
      <TaskList /> {/* Renderiza o TaskList, que já inclui o TaskForm */}
    </div>
  );
};

export default HomePage;
