import React from 'react';
import styles from './styles.module.scss';
import Filter from './Filter';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import FishPriceCard from 'components/FishPriceCard';
import FishPriceSkeleton from 'components/FishPriceSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchNextFishPrices } from 'store/FishPrice';

const Home = () => {
  const { fishPrices, hasNext } = useSelector(
    (store: RootState) => store.fishPriceStore
  );
  const dispatch = useDispatch();

  const fetchFishPricesCallback = React.useCallback(() => {
    dispatch(fetchNextFishPrices());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="" />
        </div>
        <Filter />

        <InfiniteScroll
          className={styles['card-wrapper']}
          dataLength={fishPrices.length} //This is important field to render the next data
          next={fetchFishPricesCallback}
          hasMore={hasNext}
          loader={
            <div className={styles['loading-wrapper']}>
              <FishPriceSkeleton />
              <FishPriceSkeleton />
              <FishPriceSkeleton />
            </div>
          }
          endMessage={
            <div className={styles['fetched-all']}>
              <div>Seluruh harga sudah ditampilkan</div>
            </div>
          }
        >
          {fishPrices.map((fishPrice, i) => (
            <FishPriceCard {...fishPrice} key={i} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
