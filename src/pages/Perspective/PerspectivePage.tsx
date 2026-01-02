import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonIcon, IonNote } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useApp } from '../../context/AppContext';
import { useHistory } from 'react-router-dom';

const PerspectivePage: React.FC = () => {
  const { perspectives, activePerspectiveId, setActivePerspectiveId } = useApp();
  const history = useHistory();

  const handleSelect = (id: string | null) => {
    setActivePerspectiveId(id);
    history.push('/project'); // Navigate to project list after selection
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>パースペクティブ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {/* 'All' option */}
          <IonItem button onClick={() => handleSelect(null)}>
            <IonLabel>すべて</IonLabel>
            {activePerspectiveId === null && <IonIcon slot="end" icon={checkmark} color="primary" />}
          </IonItem>

          {perspectives.map(p => (
            <IonItem key={p.id} button onClick={() => handleSelect(p.id)}>
              <IonLabel>{p.name}</IonLabel>
              {activePerspectiveId === p.id && <IonIcon slot="end" icon={checkmark} color="primary" />}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PerspectivePage;
