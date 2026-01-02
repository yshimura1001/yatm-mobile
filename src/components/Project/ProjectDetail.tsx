import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { Task } from '../../models/Task';

interface ProjectDetailProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <IonList>
      {tasks.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <p>このプロジェクトにタスクはありません。</p>
        </div>
      ) : (
        tasks.map(task => (
          <IonItemSliding key={task.id}>
            <IonItem>
              <IonCheckbox
                slot="start"
                checked={task.isCompleted}
                onIonChange={() => onToggleTask(task.id)}
              />
              <IonLabel className={task.isCompleted ? 'ion-text-decoration-line-through' : ''}>
                {task.title}
              </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="danger" onClick={() => onDeleteTask(task.id)}>
                <IonIcon slot="icon-only" icon={trash} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))
      )}
    </IonList>
  );
};

export default ProjectDetail;
