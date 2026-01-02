import React from 'react';
import { IonList, IonItem, IonLabel, IonIcon, IonBadge, IonButton } from '@ionic/react';
import { folderOutline, trash, create } from 'ionicons/icons';
import { Project } from '../../models/Project';

interface ProjectListProps {
  projects: Project[];
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onRenameProject, onDeleteProject }) => {
  return (
    <IonList>
      {projects.map(project => (
        <IonItem key={project.id}>
          <IonIcon slot="start" icon={folderOutline} style={{ color: project.color }} />
          <IonLabel>{project.name}</IonLabel>
          {project.taskCount !== undefined && (
            <IonBadge color="light" style={{ marginRight: '8px' }}>{project.taskCount}</IonBadge>
          )}
          <IonButton fill="clear" slot="end" onClick={(e) => {
            e.stopPropagation();
            onRenameProject(project);
          }}>
            <IonIcon slot="icon-only" icon={create} color="primary" />
          </IonButton>
          <IonButton fill="clear" slot="end" onClick={(e) => {
            e.stopPropagation();
            onDeleteProject(project);
          }}>
            <IonIcon slot="icon-only" icon={trash} color="danger" />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ProjectList;
