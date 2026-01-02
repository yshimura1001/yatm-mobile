import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonAlert, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import { Project } from '../../models/Project';
import ProjectList from '../../components/Project/ProjectList';
import { useApp } from '../../context/AppContext';

const ProjectPage: React.FC = () => {
  const { projects, activePerspectiveId, perspectives, addProject, deleteProject, updateProject } = useApp();
  const [projectToRename, setProjectToRename] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Filter projects based on active perspective
  const filteredProjects = activePerspectiveId
    ? projects.filter(p => p.perspectiveId === activePerspectiveId)
    : projects;

  const currentPerspectiveName = activePerspectiveId
    ? perspectives.find(p => p.id === activePerspectiveId)?.name
    : 'すべて';

  const confirmDeleteProject = (project: Project) => {
    setProjectToDelete(project);
  };

  const executeDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  };

  const handleRenameProject = (project: Project) => {
    setProjectToRename(project);
  };

  const executeRename = (newName: string) => {
    if (projectToRename && newName.trim().length > 0) {
      updateProject({ ...projectToRename, name: newName });
    }
    setProjectToRename(null);
  };

  const executeAddProject = (name: string) => {
    if (name.trim().length > 0) {
      addProject(name);
    }
    setIsAddingProject(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>プロジェクト ({currentPerspectiveName})</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ProjectList
          projects={filteredProjects}
          onDeleteProject={confirmDeleteProject}
          onRenameProject={handleRenameProject}
        />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsAddingProject(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={!!projectToRename}
          onDidDismiss={() => setProjectToRename(null)}
          header="プロジェクト名の変更"
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'プロジェクト名',
              value: projectToRename?.name
            }
          ]}
          buttons={[
            {
              text: 'キャンセル',
              role: 'cancel',
              handler: () => setProjectToRename(null)
            },
            {
              text: '変更',
              handler: (data) => executeRename(data.name)
            }
          ]}
        />

        <IonAlert
          isOpen={isAddingProject}
          onDidDismiss={() => setIsAddingProject(false)}
          header="新規プロジェクト"
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'プロジェクト名'
            }
          ]}
          buttons={[
            {
              text: 'キャンセル',
              role: 'cancel',
              handler: () => setIsAddingProject(false)
            },
            {
              text: '追加',
              handler: (data) => executeAddProject(data.name)
            }
          ]}
        />

        <IonAlert
          isOpen={!!projectToDelete}
          onDidDismiss={() => setProjectToDelete(null)}
          header="プロジェクトの削除"
          message={`"${projectToDelete?.name}" を削除してもよろしいですか？`}
          buttons={[
            {
              text: 'キャンセル',
              role: 'cancel',
              handler: () => setProjectToDelete(null)
            },
            {
              text: '削除',
              role: 'destructive',
              handler: executeDelete
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProjectPage;
