import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
} from '@ionic/react';
import { SectionGroup } from '../../models/SectionGroup';

interface SectionGroupEditModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSave: (group: SectionGroup) => void;
  initialGroup?: SectionGroup;
}

const SectionGroupEditModal: React.FC<SectionGroupEditModalProps> = ({
  isOpen,
  onDismiss,
  onSave,
  initialGroup,
}) => {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      if (initialGroup) {
        setTitle(initialGroup.title);
      } else {
        setTitle('');
      }
    }
  }, [isOpen, initialGroup]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }

    onSave({
      id: initialGroup?.id || '', // ID will be handled by parent if empty/new
      title: title.trim(),
    });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{initialGroup ? 'グループを編集' : 'グループを追加'}</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>キャンセル</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton strong onClick={handleSave}>
              保存
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">タイトル</IonLabel>
            <IonInput
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
              placeholder="例: 平日"
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default SectionGroupEditModal;
