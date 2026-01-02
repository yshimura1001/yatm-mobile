import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import OutlinerItem from '../../components/Outliner/OutlinerItem';
import { useApp } from '../../context/AppContext';

const OutlinerPage: React.FC = () => {
  const { tasks, setTasks, activePerspectiveId, perspectives } = useApp();

  const toggleExpand = (id: string) => {
    const toggleRecursive = (items: any[]): any[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        if (item.children) {
          return { ...item, children: toggleRecursive(item.children) };
        }
        return item;
      });
    };
    setTasks(prev => toggleRecursive(prev));
  };

  const toggleComplete = (id: string) => {
    const toggleRecursive = (items: any[]): any[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        if (item.children) {
          return { ...item, children: toggleRecursive(item.children) };
        }
        return item;
      });
    };
    setTasks(prev => toggleRecursive(prev));
  };

  const currentPerspectiveName = activePerspectiveId
    ? perspectives.find(p => p.id === activePerspectiveId)?.name
    : 'すべて';

  // Filter tasks based on active perspective
  const filteredTasks = activePerspectiveId
    ? tasks.filter(t => t.perspectiveId === activePerspectiveId)
    : tasks;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>アウトライナー ({currentPerspectiveName})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {filteredTasks.map(task => (
            <OutlinerItem
              key={task.id}
              task={task}
              onToggleExpand={toggleExpand}
              onToggleComplete={toggleComplete}
              level={0}
            />
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default OutlinerPage;
