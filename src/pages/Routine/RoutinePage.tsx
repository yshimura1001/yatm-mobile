import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import RoutineItem from '../../components/Routine/RoutineItem';
import { useApp } from '../../context/AppContext';

const RoutinePage: React.FC = () => {
  const { routines, setRoutines, activePerspectiveId, perspectives } = useApp();

  const toggleComplete = (id: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.id === id) {
        const newCompleted = !r.completedToday;
        return {
          ...r,
          completedToday: newCompleted,
          streak: newCompleted ? r.streak + 1 : Math.max(0, r.streak - 1),
          lastCompleted: newCompleted ? new Date() : r.lastCompleted
        };
      }
      return r;
    }));
  };

  const currentPerspectiveName = activePerspectiveId
    ? perspectives.find(p => p.id === activePerspectiveId)?.name
    : 'すべて';

  // Filter routines based on active perspective
  const filteredRoutines = activePerspectiveId
    ? routines.filter(r => r.perspectiveId === activePerspectiveId)
    : routines;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ルーチン ({currentPerspectiveName})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {filteredRoutines.map(routine => (
            <RoutineItem
              key={routine.id}
              routine={routine}
              onToggle={toggleComplete}
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

export default RoutinePage;
