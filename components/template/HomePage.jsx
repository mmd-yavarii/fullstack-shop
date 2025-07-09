import Card from '../module/Card';
import Category from '../module/Category';
import SearchAndSort from '../module/SearchAndSort';
import Empty from './Empty';

import styles from './HomePage.module.css';

function HomePage({ products }) {
  return (
    <div className={styles.container}>
      <div className={styles.searchAndSortSession}>
        <div className={styles.inpMobileContainer}>
          <SearchAndSort />
        </div>
        <Category />
      </div>

      {products.length ? <div className={styles.productContainer}>{products && products.map((i) => <Card key={i._id} info={i} />)}</div> : <Empty />}
    </div>
  );
}

export default HomePage;
