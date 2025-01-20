import { Outlet } from 'react-router';
import Aside from '../Aside/Aside';

import styles from './Layout.module.scss';

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Aside />
      <div className={styles.app__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
