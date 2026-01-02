import React from 'react';
import { IonItem, IonLabel, IonButton, IonIcon, IonNote, IonGrid, IonRow, IonCol } from '@ionic/react';
import { play, stop, checkmarkCircle } from 'ionicons/icons';
import { TimeTask } from '../../models/TimeTask';

interface TimeTaskItemProps {
  task: TimeTask;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onComplete: (id: string) => void;
}

const TimeTaskItem: React.FC<TimeTaskItemProps> = ({ task, onStart, onStop, onComplete }) => {
  const formatTime = (date?: Date) => {
    return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
  };

  return (
    <IonItem>
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol size="12">
            <IonLabel>
              <h2>{task.title}</h2>
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center">
          <IonCol size="4">
            <IonNote>見積: {task.estimatedMinutes}分</IonNote>
          </IonCol>
          <IonCol size="4">
            <IonNote>実績: {task.actualMinutes}分</IonNote>
          </IonCol>
          <IonCol size="4" className="ion-text-end">
            {formatTime(task.startTime)} - {formatTime(task.endTime)}
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center ion-justify-content-between" style={{ marginTop: '5px' }}>
          <IonCol>
            {/* Action Buttons */}
            {!task.isCompleted && (
              <>
                {task.isRunning ? (
                  <IonButton size="small" color="warning" onClick={() => onStop(task.id)}>
                    <IonIcon slot="icon-only" icon={stop} />
                  </IonButton>
                ) : (
                  <IonButton size="small" color="primary" onClick={() => onStart(task.id)}>
                    <IonIcon slot="icon-only" icon={play} />
                  </IonButton>
                )}
              </>
            )}
            <IonButton size="small" color="success" fill={task.isCompleted ? 'solid' : 'outline'} onClick={() => onComplete(task.id)}>
              <IonIcon slot="icon-only" icon={checkmarkCircle} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default TimeTaskItem;
