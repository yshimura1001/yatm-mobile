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
import { Holiday } from '../../models/Holiday';

interface HolidayEditModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSave: (holiday: Omit<Holiday, 'id'> & { id?: string }) => void;
  initialHoliday?: Holiday;
}

const HolidayEditModal: React.FC<HolidayEditModalProps> = ({
  isOpen,
  onDismiss,
  onSave,
  initialHoliday,
}) => {
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      if (initialHoliday) {
        setMonth(initialHoliday.month);
        setDay(initialHoliday.day);
        setNote(initialHoliday.note);
      } else {
        setMonth(1);
        setDay(1);
        setNote('');
      }
    }
  }, [isOpen, initialHoliday]);

  const handleSave = () => {
    onSave({
      id: initialHoliday?.id,
      month,
      day,
      note,
    });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{initialHoliday ? '休日を編集' : '休日を追加'}</IonTitle>
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
            <IonLabel position="stacked">月</IonLabel>
            <IonInput
              type="number"
              value={month}
              onIonChange={(e) => setMonth(parseInt(e.detail.value!, 10))}
              min={1}
              max={12}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">日</IonLabel>
            <IonInput
              type="number"
              value={day}
              onIonChange={(e) => setDay(parseInt(e.detail.value!, 10))}
              min={1}
              max={31}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">備考</IonLabel>
            <IonInput
              value={note}
              onIonChange={(e) => setNote(e.detail.value!)}
              placeholder="例: 元日"
            />
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default HolidayEditModal;
