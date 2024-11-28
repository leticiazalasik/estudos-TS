
// TaskList.tsx
import { useState } from 'react';


const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="p-[5%] mr-[2%] flex space-x-2">
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as Task['priority'])}
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>
      <button onClick={addTask}>Adicionar</button>
      
      <ul>
        {tasks.map(task => (
          <li 
            key={task.id}
            style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.priority === 'high' ? 'red' : 'inherit'
            }}
            onClick={() => toggleTask(task.id)}
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
