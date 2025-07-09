import { useState } from 'react';
import styles from './CartControlers.module.css';
import { useCart } from '@/contexts/CartProvider';

function CartControlers({ info }) {
  const [cart, setCart] = useCart();
  const [cartqty, serCartQty] = useState(0);

  function add() {
    if (cartqty < info.qty) {
      serCartQty((prev) => prev + 1);
      setCart({ type: 'ADD', payload: info });
    }
  }

  function remove() {
    if (cartqty > 0) {
      serCartQty((prev) => prev - 1);
      setCart({ type: 'REMOVE', payload: info });
    }
  }

  if (!!cartqty) {
    return (
      <div className={styles.container}>
        <button onClick={add}>+</button>
        <p>{cartqty}</p>
        <button onClick={remove}>-</button>
      </div>
    );
  } else {
    return (
      <button className={styles.addToCartBtn} onClick={add}>
        افزودن به سبد خرید
      </button>
    );
  }
}

export default CartControlers;
