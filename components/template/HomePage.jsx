import Card from '../module/Card';
import Category from '../module/Category';
import SearchAndSort from '../module/SearchAndSort';

import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.inpMobileContainer}>
        <SearchAndSort />
      </div>
      <Category />

      <div className={styles.productContainer}>
        <Card title="هدفون بی‌سیم مدل XY-100" price={850000} discount={0} images={['/test.png']} />
        <Card title="هدفون بی‌سیم مدل XY-100" price={850000} discount={15} images={['/test.png']} />
        <Card title="هدفون بی‌سیم مدل XY-100" price={850000} discount={0} images={['/test.png']} />
        <Card title="هدفون بی‌سیم مدل XY-100" price={850000} discount={15} images={['/test.png']} />
        <Card title="هدفون بی‌سیم مدل XY-100" price={850000} discount={15} images={['/test.png']} />
        <Card title="هدفون بی‌سیم مدل XY-100" price={850000} discount={15} images={['/test.png']} />
      </div>
    </div>
  );
}

export default HomePage;
