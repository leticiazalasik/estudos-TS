import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns'; // Importe a biblioteca date-fns

type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dateCreate: string;
  dateConclusion: string | null;
};

const TaskList = () => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('low');
  const [dateConclusion, setDateConclusion] = useState<string>('');
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('low');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority,
      dateCreate: new Date().toISOString(),
      dateConclusion: dateConclusion || null,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask('');
    setDateConclusion('');
  };

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              dateConclusion: task.completed ? null : new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleFilterPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityFilter(e.target.value);
  };

  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    } else if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  const getFilteredTasksByPriority = () => {
    return tasks.filter((task) => task.priority === priorityFilter);
  };

  const formatDateForInput = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Atualize a função formatDateForDisplay para usar date-fns
  const formatDateForDisplay = (date: string) => {
    const dateObj = parseISO(date);
    return format(dateObj, 'dd/MM/yyyy');
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDateConclusion(selectedDate);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Task['priority'])}
        style={{
          padding: '10px',
          marginRight: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      >
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      <input
        type="date"
        value={dateConclusion}
        onChange={handleDateChange}
        placeholder="Data de Conclusão"
        style={{
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      <button
        onClick={addTask}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: '2px solid #007bff',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Adicionar
      </button>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={filter}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="all">Mostrar Todas as Tarefas</option>
          <option value="completed">Mostrar Tarefas Concluídas</option>
          <option value="pending">Mostrar Tarefas Pendentes</option>
        </select>

        <select
          value={priorityFilter}
          onChange={handleFilterPriority}
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="low">Baixa Prioridade</option>
          <option value="medium">Média Prioridade</option>
          <option value="high">Alta Prioridade</option>
        </select>
      </div>

      <ul>
        {getFilteredTasks()
          .filter((task) => getFilteredTasksByPriority().includes(task))
          .map((task) => (
            <li
              key={task.id}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.priority === 'high' ? 'red' : 'inherit',
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => toggleTask(task.id)}
            >
              <div>
                <strong>{task.title}</strong>
                <p>Prioridade: {task.priority}</p>
                <p>Data de Criação: {new Date(task.dateCreate).toLocaleDateString()}</p>
                <p>
                  Data de Conclusão:{' '}
                  {task.dateConclusion
                    ? formatDateForDisplay(task.dateConclusion)
                    : 'Não definida'}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
