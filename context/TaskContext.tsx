import React, { createContext, useState, useContext } from 'react';

type Task = {
  id: number;
  text: string;
  project?: string;
  context?: string;
  done?: boolean;
};

type TaskContextType = {
  inboxTasks: Task[];
  setInboxTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  projects: string[];
  setProjects: React.Dispatch<React.SetStateAction<string[]>>;
  contexts: string[];
  setContexts: React.Dispatch<React.SetStateAction<string[]>>;
  nextActions: Task[];
  setNextActions: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [inboxTasks, setInboxTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState(['Work', 'Personal']);
  const [contexts, setContexts] = useState(['@home', '@computer', '@errands']);
  const [nextActions, setNextActions] = useState<Task[]>([]);

  return (
    <TaskContext.Provider value={{ inboxTasks, setInboxTasks, projects, setProjects, contexts, setContexts, nextActions, setNextActions }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
};
