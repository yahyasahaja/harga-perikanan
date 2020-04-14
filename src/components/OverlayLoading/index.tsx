import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import styles from './style.module.scss';
import { RootState } from '../../store';

const OverlayLoading = () => {
  const { isShown } = useSelector((state: RootState) => {
    return state.overlayLoadingStore;
  });

  if (!isShown) return <div></div>;

  return (
    <div className={styles.container}>
      <div className={styles['overlay-loading']}>
        <div className={styles['overlay-loading-2']}>
          <div className={styles['wrapper']}>
            <Spinner animation="border" variant="primary" />
          </div>
          <div>Processing ..</div>
        </div>
      </div>
    </div>
  );
};

export default OverlayLoading;
