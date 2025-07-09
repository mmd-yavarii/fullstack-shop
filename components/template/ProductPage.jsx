import CartControlers from '../module/CartControlers';
import styles from './ProductPage.module.css';

function ProductPage({ info }) {
  return (
    <div>
      <CartControlers info={info} />
    </div>
  );
}

export default ProductPage;
