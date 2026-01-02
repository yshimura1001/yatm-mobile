import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonListHeader } from '@ionic/react';
import { Routine } from '../../models/Routine';
import RoutineItem from '../../components/Routine/RoutineItem';

const initialRoutines: Routine[] = [
  { id: '1', title: '朝の運動', frequency: 'Daily', completedToday: false, streak: 5 },
  { id: '2', title: '読書', frequency: 'Daily', completedToday: true, streak: 12 },
  { id: '3', title: '週次レビュー', frequency: 'Weekly', completedToday: false, streak: 2 },
  { id: '4', title: '瞑想', frequency: 'Daily', completedToday: false, streak: 0 },
];

const RoutinePage: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);

  const handleToggle = (id: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.id === id) {
        const newCompleted = !r.completedToday;
        return {
          ...r,
          completedToday: newCompleted,
          streak: newCompleted ? r.streak + 1 : r.streak - 1
        };
      }
      return r;
    }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ルーチン</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>今日</IonListHeader>
          {routines.map(routine => (
            <RoutineItem key={routine.id} routine={routine} onToggle={handleToggle} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RoutinePage;
