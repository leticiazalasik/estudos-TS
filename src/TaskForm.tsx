import React, { useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dateConclusion: string | null;
};

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dateConclusion, setDateConclusion] = useState<string>('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority,
        dateConclusion: dateConclusion || null,
      };
      addTask(task);
      setNewTask('');
      setDateConclusion('');
    }
  };

  return (
    <div>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>
      <input
        type="date"
        value={dateConclusion}
        onChange={(e) => setDateConclusion(e.target.value)}
      />
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
};

export default TaskForm;
