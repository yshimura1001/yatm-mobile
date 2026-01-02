import React from 'react';
import { IonList, IonItem, IonLabel, IonIcon, IonBadge } from '@ionic/react';
import { folderOutline } from 'ionicons/icons';
import { Project } from '../../models/Project';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  return (
    <IonList>
      {projects.map(project => (
        <IonItem key={project.id} button detail={false} onClick={() => onSelectProject(project.id)}>
          <IonIcon slot="start" icon={folderOutline} style={{ color: project.color }} />
          <IonLabel>{project.name}</IonLabel>
          {project.taskCount !== undefined && (
            <IonBadge slot="end" color="light">{project.taskCount}</IonBadge>
          )}
        </IonItem>
      ))}
    </IonList>
  );
};

export default ProjectList;
