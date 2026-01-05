import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { listOutline, listSharp, folderOutline, folderSharp, repeatOutline, repeatSharp, timeOutline, timeSharp, layersOutline, layersSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'パースペクティブ',
    url: '/perspective',
    iosIcon: layersOutline,
    mdIcon: layersSharp
  },
  {
    title: 'プロジェクト',
    url: '/project',
    iosIcon: folderOutline,
    mdIcon: folderSharp
  },
  {
    title: 'アウトライナー',
    url: '/outliner',
    iosIcon: listOutline,
    mdIcon: listSharp
  },

  {
    title: '時間',
    url: '/time',
    iosIcon: timeOutline,
    mdIcon: timeSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>YATM</IonListHeader>
          <IonNote>Yet Another Time Management app.</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
