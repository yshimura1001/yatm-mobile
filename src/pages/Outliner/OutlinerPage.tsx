import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList } from '@ionic/react';
import { Task } from '../../models/Task';
import OutlinerItem from '../../components/Outliner/OutlinerItem';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'プロジェクト アルファ',
    isCompleted: false,
    isExpanded: true,
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

const OutlinerPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleProperty = (taskList: Task[], id: string, prop: 'isExpanded' | 'isCompleted'): Task[] => {
    return taskList.map(task => {
      if (task.id === id) {
        return { ...task, [prop]: !task[prop] };
      }
      if (task.children && task.children.length > 0) {
        return { ...task, children: toggleProperty(task.children, id, prop) };
      }
      return task;
    });
  };

  const handleToggleExpand = (id: string) => {
    setTasks(prev => toggleProperty(prev, id, 'isExpanded'));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => toggleProperty(prev, id, 'isCompleted'));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>アウトライナー</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="none">
          {tasks.map(task => (
            <OutlinerItem
              key={task.id}
              task={task}
              level={0}
              onToggleExpand={handleToggleExpand}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default OutlinerPage;
