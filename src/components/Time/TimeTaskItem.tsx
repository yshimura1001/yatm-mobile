import React from 'react';
import { IonItem, IonLabel, IonButton, IonIcon, IonNote, IonGrid, IonRow, IonCol } from '@ionic/react';
import { play, stop, checkmarkCircleOutline } from 'ionicons/icons';
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
      {/* 1. Timer / Complete Status Button (Start) */}
      {!task.isCompleted ? (
        <IonButton
          slot="start"
          size="small"
          color={task.isRunning ? "warning" : "primary"}
          onClick={(e) => {
            e.stopPropagation();
            // If running, Stop triggers Complete logic (Stop + Complete).
            // If not running, Start triggers Start.
            task.isRunning ? onComplete(task.id) : onStart(task.id);
          }}
        >
          <IonIcon slot="icon-only" icon={task.isRunning ? stop : play} />
        </IonButton>
      ) : (
        <IonButton
          slot="start"
          size="small"
          fill="clear"
          onClick={(e) => {
            e.stopPropagation();
            onComplete(task.id); // Toggle back to incomplete
          }}
        >
          <IonIcon slot="icon-only" icon={checkmarkCircleOutline} color="success" style={{ fontSize: '24px' }} />
        </IonButton>
      )}

      {/* 2. Task Details (Middle) */}
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol size="12">
            <IonLabel className={task.isCompleted ? 'ion-text-decoration-line-through' : ''}>
              <h2>{task.title}</h2>
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center">
          <IonCol size="6">
            <IonNote style={{ fontSize: '0.8em' }}>見積: {task.estimatedMinutes}分 / 実績: {task.actualMinutes}分</IonNote>
          </IonCol>
          <IonCol size="6" className="ion-text-end">
            <IonNote style={{ fontSize: '0.8em' }}>{formatTime(task.startTime)} - {formatTime(task.endTime)}</IonNote>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* 3. Complete Action Button (End) - Visible only when not completed AND not running */}
      {!task.isCompleted && !task.isRunning && (
        <IonButton
          slot="end"
          fill="clear"
          color="medium"
          onClick={(e) => {
            e.stopPropagation();
            onComplete(task.id);
          }}
        >
        </IonButton>
      )}
    </IonItem>
  );
};

export default TimeTaskItem;
