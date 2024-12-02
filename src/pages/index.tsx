import { useState, useEffect } from 'react';

// Definindo a tipagem de uma tarefa
type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
};

// Tipagem para o filtro
type Filter = 'all' | 'completed' | 'pending';
type PriorityFilter = 'low' | 'medium' | 'high';

const TaskList = () => {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<Task[]>([]);
  // Estado para a nova tarefa
  const [newTask, setNewTask] = useState('');
  // Estado para a prioridade da tarefa
  const [priority, setPriority] = useState<Task['priority']>('medium');
  // Estado para o filtro de tarefas (corrigido com tipo explícito)
  const [filter, setFilter] = useState<Filter>('all');
  // Estado para o filtro de prioridade
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('medium');

  // Função para adicionar nova tarefa
  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority,
      };
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      setNewTask('');

      // Salvar no localStorage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  // Função para alternar o status de "completo" ou "pendente"
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Salvar no localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Função para filtrar as tarefas com base no filtro de status
  const getFilteredTasks = () => {
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    return tasks; // 'all' retorna todas as tarefas
  };

  // Função para filtrar as tarefas com base no filtro de prioridade
  const getFilteredTasksByPriority = () => {
    if (priorityFilter === 'low') {
      return tasks.filter((task) => task.priority === 'low');
    }
    if (priorityFilter === 'medium') {
      return tasks.filter((task) => task.priority === 'medium');
    }
    if (priorityFilter === 'high') {
      return tasks.filter((task) => task.priority === 'high');
    }
    return tasks; // 'all' retorna todas as tarefas
  };

  // Função para atualizar o filtro de prioridade
  const handleFilterPriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = event.target.value as PriorityFilter;
    setPriorityFilter(selectedPriority);
  };

  // Função para atualizar o filtro de tarefas (status)
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value as Filter;
    setFilter(selectedFilter);
  };

  // Recupera as tarefas do localStorage quando o componente é montado
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

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

      {/* Dropdown select para o filtro de status */}
      <select value={filter} onChange={handleFilterChange}>
        <option value="all">Mostrar Todas as Tarefas</option>
        <option value="completed">Mostrar Tarefas Concluídas</option>
        <option value="pending">Mostrar Tarefas Pendentes</option>
      </select>

      {/* Dropdown select para o filtro de prioridade */}
      <select value={priorityFilter} onChange={handleFilterPriority}>
        <option value="low">Baixa Prioridade</option>
        <option value="medium">Média Prioridade</option>
        <option value="high">Alta Prioridade</option>
      </select>

      <ul>
        {getFilteredTasks()
          .filter((task) => getFilteredTasksByPriority().includes(task)) // Combina os filtros de status e prioridade
          .map((task) => (
            <li
              key={task.id}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.priority === 'high' ? 'red' : 'inherit',
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
