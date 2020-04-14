import React from 'react';
import styles from './styles.module.scss';
import { FishPrice } from 'api/fishPricelistAPI';

const FishPriceCard: React.FunctionComponent<FishPrice> = (
  props: FishPrice
) => {
  return (
    <div className={styles.container}>
      <div className={styles.komoditas}>
        <div className={styles.key}>Komoditas</div>
        <div className={styles.value}>{props.komoditas}</div>
      </div>
      <div className={styles.province}>
        <div className={styles.key}>Provinsi</div>
        <div className={styles.value}>{props.area_provinsi}</div>
      </div>
      <div className={styles.city}>
        <div className={styles.key}>Kota</div>
        <div className={styles.value}>{props.area_kota || '-'}</div>
      </div>

      <div className={styles['numbers-wrapper']}>
        <div className={styles.size}>
          <div className={styles.key}>Ukuran</div>
          <div className={styles.value}>{props.size}</div>
        </div>
        <div className={styles.price}>
          <div className={styles.key}>Harga</div>
          <div className={styles.value}>{props.price}</div>
        </div>
      </div>
    </div>
  );
};

export default FishPriceCard;
