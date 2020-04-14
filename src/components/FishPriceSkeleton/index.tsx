import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './styles.module.scss';

class FishPriceSkeleton extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Skeleton width="100%" height={250} />
      </div>
    );
  }
}

export default FishPriceSkeleton;
