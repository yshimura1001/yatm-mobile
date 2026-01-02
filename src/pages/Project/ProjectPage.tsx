import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Project } from '../../models/Project';
import ProjectList from '../../components/Project/ProjectList';

const initialProjects: Project[] = [
  { id: '1', name: 'インボックス', color: '#808080', taskCount: 3 },
  { id: '2', name: '個人', color: '#ff0000', taskCount: 5 },
  { id: '3', name: '仕事', color: '#0000ff', taskCount: 2 },
  { id: '4', name: '買い物', color: '#00ff00', taskCount: 1 },
];

const ProjectPage: React.FC = () => {
  const history = useHistory();
  const [projects] = useState<Project[]>(initialProjects);

  const handleSelectProject = (projectId: string) => {
    history.push(`/project/${projectId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>プロジェクト</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ProjectList projects={projects} onSelectProject={handleSelectProject} />
      </IonContent>
    </IonPage>
  );
};

export default ProjectPage;
