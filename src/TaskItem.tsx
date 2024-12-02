import React from 'react';

// Tipo de tarefa
type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dateCreate: string;
  dateConclusion: string | null;
};

// Tipagem das props que o componente TaskItem receberá
type TaskItemProps = {
  task: Task;
  toggleTask: (id: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask }) => {
  return (
    <li
      style={{
        textDecoration: task.completed ? 'line-through' : 'none', // Riscar a tarefa quando completa
        color: task.priority === 'high' ? 'red' : 'inherit', // Definir a cor vermelha para alta prioridade
        cursor: 'pointer', // Adiciona um cursor de clique
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
      }}
      onClick={() => toggleTask(task.id)} // Alterna o estado de concluído ao clicar
    >
      <div>
        <strong>{task.title}</strong>
        <p>Prioridade: {task.priority}</p>
        <p>Data de Criação: {new Date(task.dateCreate).toLocaleDateString()}</p>
        <p>
          Data de Conclusão:{' '}
          {task.dateConclusion
            ? new Date(task.dateConclusion).toLocaleDateString()
            : 'Não definida'}
        </p>
      </div>
    </li>
  );
};

export default TaskItem;
