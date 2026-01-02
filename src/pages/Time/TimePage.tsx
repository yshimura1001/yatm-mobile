import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonProgressBar, IonFooter, IonLabel } from '@ionic/react';
import { TimeTask } from '../../models/TimeTask';
import TimeTaskItem from '../../components/Time/TimeTaskItem';

const initialTimeTasks: TimeTask[] = [
  { id: '1', title: '朝のルーチン', estimatedMinutes: 30, actualMinutes: 0, isCompleted: false, isRunning: false },
  { id: '2', title: 'メールチェック', estimatedMinutes: 15, actualMinutes: 0, isCompleted: false, isRunning: false },
  { id: '3', title: '集中作業 1', estimatedMinutes: 90, actualMinutes: 0, isCompleted: false, isRunning: false },
];

const TimePage: React.FC = () => {
  const [tasks, setTasks] = useState<TimeTask[]>(initialTimeTasks);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTasks(prev => prev.map(task => {
        if (task.isRunning) {
          // In a real app, we would track start timestamp and diff, 
          // but for simple mock UI we just increment generic counter or keep it static.
          // Let's just update the view ref
        }
        return task;
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, isRunning: true, startTime: task.startTime || new Date() }
        : { ...task, isRunning: false } // Stop others? TaskChute typically serial.
    ));
  };

  const handleStop = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isRunning: false, endTime: new Date() } : task
    ));
  };

  const handleComplete = (id: string) => {
    handleStop(id);
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted, endTime: new Date() } : task
    ));
  };

  // Calculate total progress
  const totalEst = tasks.reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const completedEst = tasks.filter(t => t.isCompleted).reduce((acc, t) => acc + t.estimatedMinutes, 0);
  const progress = totalEst > 0 ? completedEst / totalEst : 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>時間管理 ({currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</IonTitle>
        </IonToolbar>
        <IonProgressBar value={progress} color="success"></IonProgressBar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {tasks.map(task => (
            <TimeTaskItem
              key={task.id}
              task={task}
              onStart={handleStart}
              onStop={handleStop}
              onComplete={handleComplete}
            />
          ))}
        </IonList>
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
