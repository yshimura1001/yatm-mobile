import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project } from '../models/Project';
import { Perspective } from '../models/Perspective';
import { Task } from '../models/Task';
import { Routine } from '../models/Routine';
import { TimeTask } from '../models/TimeTask';

interface AppContextType {
  projects: Project[];
  perspectives: Perspective[];
  activePerspectiveId: string | null;
  tasks: Task[];
  routines: Routine[];
  timeTasks: TimeTask[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setPerspectives: React.Dispatch<React.SetStateAction<Perspective[]>>;
  setActivePerspectiveId: (id: string | null) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setRoutines: React.Dispatch<React.SetStateAction<Routine[]>>;
  setTimeTasks: React.Dispatch<React.SetStateAction<TimeTask[]>>;
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
  updateProject: (project: Project) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialProjects: Project[] = [
  { id: '1', name: 'インボックス', color: '#808080', taskCount: 3 },
  { id: '2', name: '個人', color: '#ff0000', taskCount: 5, perspectiveId: 'private' },
  { id: '3', name: '仕事', color: '#0000ff', taskCount: 2, perspectiveId: 'work' },
  { id: '4', name: '買い物', color: '#00ff00', taskCount: 1, perspectiveId: 'private' },
];

const initialPerspectives: Perspective[] = [
  { id: 'work', name: '仕事', color: '#0000ff' },
  { id: 'private', name: 'プライベート', color: '#ff0000' }
];

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'プロジェクト アルファ',
    isCompleted: false,
    isExpanded: true,
    perspectiveId: 'work',
    children: [
      {
        id: '1-1',
        title: 'リサーチ',
        isCompleted: true,
        isExpanded: false,
        children: []
      },
      {
        id: '1-2',
        title: 'デザイン',
        isCompleted: false,
        isExpanded: true,
        children: [
          {
            id: '1-2-1',
            title: 'スケッチ',
            isCompleted: false,
            isExpanded: false,
            children: []
          },
          {
            id: '1-2-2',
            title: 'プロトタイプ作成',
            isCompleted: false,
            isExpanded: false,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: '個人の目標',
    isCompleted: false,
    isExpanded: false,
    perspectiveId: 'private',
    children: [
      {
        id: '2-1',
        title: '運動',
        isCompleted: false,
        isExpanded: false,
        children: []
      }
    ]
  }
];

const initialRoutines: Routine[] = [
  { id: '1', title: '朝の運動', frequency: 'Daily', completedToday: false, streak: 5, perspectiveId: 'private' },
  { id: '2', title: '読書', frequency: 'Daily', completedToday: true, streak: 12, perspectiveId: 'private' },
  { id: '3', title: '週次レビュー', frequency: 'Weekly', completedToday: false, streak: 2, perspectiveId: 'work' },
  { id: '4', title: '瞑想', frequency: 'Daily', completedToday: false, streak: 0, perspectiveId: 'private' },
];

const initialTimeTasks: TimeTask[] = [
  { id: '1', title: '朝のルーチン', estimatedMinutes: 30, actualMinutes: 0, isCompleted: false, isRunning: false, perspectiveId: 'private' },
  { id: '2', title: 'メールチェック', estimatedMinutes: 15, actualMinutes: 0, isCompleted: false, isRunning: false, perspectiveId: 'work' },
  { id: '3', title: '集中作業 1', estimatedMinutes: 90, actualMinutes: 0, isCompleted: false, isRunning: false, perspectiveId: 'work' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [perspectives, setPerspectives] = useState<Perspective[]>(initialPerspectives);
  const [activePerspectiveId, setActivePerspectiveIdState] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);
  const [timeTasks, setTimeTasks] = useState<TimeTask[]>(initialTimeTasks);

  const setActivePerspectiveId = (id: string | null) => {
    setActivePerspectiveIdState(id);
  };

  const addProject = (name: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: name,
      color: '#808080',
      taskCount: 0,
      perspectiveId: activePerspectiveId || undefined // Inherit current perspective if set
    };
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  return (
    <AppContext.Provider value={{
      projects,
      perspectives,
      activePerspectiveId,
      tasks,
      routines,
      timeTasks,
      setProjects,
      setPerspectives,
      setActivePerspectiveId,
      setTasks,
      setRoutines,
      setTimeTasks,
      addProject,
      deleteProject,
      updateProject
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
