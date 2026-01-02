import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonProgressBar, IonFooter, IonLabel, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import TimeTaskItem from '../../components/Time/TimeTaskItem';
import { useApp } from '../../context/AppContext';

const TimePage: React.FC = () => {
  const { timeTasks, setTimeTasks, activePerspectiveId, perspectives } = useApp();
  // currentTime is local UI state
  const [currentTime, setCurrentTime] = React.useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // In a real app, update running tasks' actual time here.
      // For mock UI, we might just re-render or do nothing as visual update is minimal.
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = (id: string) => {
    setTimeTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, isRunning: true, startTime: task.startTime || new Date() }
        : { ...task, isRunning: false } // Serial execution: stop others
    ));
  };

  const handleStop = (id: string) => {
    setTimeTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isRunning: false, endTime: new Date() } : task
    ));
  };

  const handleComplete = (id: string) => {
    // If running, stop it first (logic usually handled in UI, but good to be safe)
    setTimeTasks(prev => prev.map(task => {
      if (task.id === id) {
        const isNowCompleted = !task.isCompleted;
        return {
          ...task,
          isCompleted: isNowCompleted,
          isRunning: false, // Force stop if completing
          endTime: isNowCompleted ? new Date() : task.endTime
        };
      }
      return task;
    }));
  };

  const currentPerspectiveName = activePerspectiveId
    ? perspectives.find(p => p.id === activePerspectiveId)?.name
    : 'すべて';

  // Filter time tasks based on active perspective
  const filteredTasks = activePerspectiveId
    ? timeTasks.filter(t => t.perspectiveId === activePerspectiveId)
    : timeTasks;

  // Calculate progress based on FILTERED tasks
  const totalEst = filteredTasks.reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const completedEst = filteredTasks.filter(t => t.isCompleted).reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const progress = totalEst > 0 ? completedEst / totalEst : 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>時間 ({currentPerspectiveName})</IonTitle>
        </IonToolbar>
        <IonProgressBar value={progress} color="success"></IonProgressBar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {filteredTasks.map(task => (
            <TimeTaskItem
              key={task.id}
              task={task}
              onStart={handleStart}
              onStop={handleStop}
              onComplete={handleComplete}
            />
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonLabel className="ion-text-center ion-padding">
            見積もり合計: {totalEst} 分
          </IonLabel>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default TimePage;
