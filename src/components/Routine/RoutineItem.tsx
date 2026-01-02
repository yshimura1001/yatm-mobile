import React from 'react';
import { IonItem, IonLabel, IonCheckbox, IonBadge, IonNote } from '@ionic/react';
import { Routine } from '../../models/Routine';

interface RoutineItemProps {
  routine: Routine;
  onToggle: (id: string) => void;
}

const frequencyMap: { [key: string]: string } = {
  'Daily': '毎日',
  'Weekly': '毎週',
  'Monthly': '毎月',
  'Custom': 'カスタム'
};

const RoutineItem: React.FC<RoutineItemProps> = ({ routine, onToggle }) => {
  return (
    <IonItem>
      <IonCheckbox slot="start" checked={routine.completedToday} onIonChange={() => onToggle(routine.id)} />
      <IonLabel>
        <h2>{routine.title}</h2>
        <IonNote>{frequencyMap[routine.frequency] || routine.frequency}</IonNote>
      </IonLabel>
      <IonBadge slot="end" color={routine.streak > 5 ? 'warning' : 'medium'}>
        🔥 {routine.streak}
      </IonBadge>
    </IonItem>
  );
};

export default RoutineItem;
