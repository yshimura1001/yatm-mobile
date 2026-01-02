import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Menu from './components/Menu';
import OutlinerPage from './pages/Outliner/OutlinerPage';
import ProjectPage from './pages/Project/ProjectPage';
import PerspectivePage from './pages/Perspective/PerspectivePage';

import RoutinePage from './pages/Routine/RoutinePage';
import TimePage from './pages/Time/TimePage';

/* Ionicコンポーネントが正しく動作するために必要なコアCSS */
import '@ionic/react/css/core.css';

/* Ionicで構築されたアプリのための基本CSS */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* コメントアウト可能なオプションのCSSユーティリティ */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic ダークモード
 * -----------------------------------------------------
 * 詳細は以下を参照してください:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* テーマ変数 */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <AppProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/project" />
              </Route>
              <Route path="/project" exact={true}>
                <ProjectPage />
              </Route>
              <Route path="/outliner" exact={true}>
                <OutlinerPage />
              </Route>
              <Route path="/perspective" exact={true}>
                <PerspectivePage />
              </Route>
              <Route path="/routine" exact={true}>
                <RoutinePage />
              </Route>
              <Route path="/time" exact={true}>
                <TimePage />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AppProvider>
  );
};

export default App;
