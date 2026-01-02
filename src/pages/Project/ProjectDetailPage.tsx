import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { Task } from '../../models/Task';
import ProjectDetail from '../../components/Project/ProjectDetail';

// Mock Tasks for demonstration (normally fetched by ID)
const mockTasks: { [key: string]: Task[] } = {
  '1': [
    { id: 't1', title: 'メールチェック', isCompleted: false, isExpanded: false, children: [] },
    { id: 't2', title: '上司に返信', isCompleted: true, isExpanded: false, children: [] }
  ],
  '2': [
    { id: 't3', title: '牛乳を買う', isCompleted: false, isExpanded: false, children: [] }
  ],
  '3': [],
  '4': [
    { id: 't4', title: 'リンゴを買う', isCompleted: false, isExpanded: false, children: [] }
  ]
};

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<Task[]>(mockTasks[id] || []);
  const projectName = id === '1' ? 'インボックス' : id === '2' ? '個人' : id === '3' ? '仕事' : '買い物'; // Simple mock name lookup

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/project" />
          </IonButtons>
          <IonTitle>{projectName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ProjectDetail tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
      </IonContent>
    </IonPage>
  );
};

export default ProjectDetailPage;
