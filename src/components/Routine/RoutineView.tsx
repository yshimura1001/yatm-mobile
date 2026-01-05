import React from 'react';
import { IonList, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import RoutineItem from './RoutineItem';
import { useApp } from '../../context/AppContext';

const RoutineView: React.FC = () => {
  const { routines, setRoutines, activePerspectiveId } = useApp();

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

  // Filter routines based on active perspective
  const filteredRoutines = activePerspectiveId
    ? routines.filter(r => r.perspectiveId === activePerspectiveId)
    : routines;

  return (
    <>
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
    </>
  );
};

export default RoutineView;
