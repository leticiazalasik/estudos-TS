import { useState } from 'react';

// Definindo a tipagem de uma tarefa
type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
};

// Tipagem para o filtro
type Filter = 'all' | 'completed' | 'pending';

const TaskList = () => {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<Task[]>([]);
  // Estado para a nova tarefa
  const [newTask, setNewTask] = useState('');
  // Estado para a prioridade da tarefa
  const [priority, setPriority] = useState<Task['priority']>('medium');
  // Estado para o filtro de tarefas (corrigido com tipo explícito)
  const [filter, setFilter] = useState<Filter>('all');

  // Função para adicionar nova tarefa
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

  // Função para alternar o status de "completo" ou "pendente"
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Função para filtrar as tarefas com base no filtro selecionado
  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    return tasks; // 'all' retorna todas as tarefas
  };

  // Função para atualizar o filtro com base na opção do dropdown
  const handleFilterChange = (region: string) => {
    if (region === 'Todas as tarefas') {
      setFilter('all');
    } else if (region === 'Tarefas pendentes') {
      setFilter('pending');
    } else if (region === 'Tarefas concluídas') {
      setFilter('completed');
    }
  };


  return (
    <div>
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
        
        {/* Dropdown select para o filtro */}
      <select 
        value={filter} 
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value="all">Mostrar Todas as Tarefas</option>
        <option value="completed">Mostrar Tarefas Concluídas</option>
        <option value="pending">Mostrar Tarefas Pendentes</option>
      </select>
       
    <ul>
        {getFilteredTasks().map(task => (
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
