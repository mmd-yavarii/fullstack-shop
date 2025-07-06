import Card from '../module/Card';
import Category from '../module/Category';
import SearchAndSort from '../module/SearchAndSort';

import styles from './HomePage.module.css';

function HomePage({ products }) {
  return (
    <div className={styles.container}>
      <div className={styles.inpMobileContainer}>
        <SearchAndSort />
      </div>
      <Category />

      <div className={styles.productContainer}>{products && products.map((i) => <Card key={i._id} {...i} />)}</div>
    </div>
  );
}

export default HomePage;
