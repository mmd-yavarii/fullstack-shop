import styles from './CartControlers.module.css';
import { useCart } from '@/contexts/CartProvider';

function CartControlers({ info }) {
  const [cart, dispatchCart] = useCart();

  const itemInCart = cart.find((item) => item._id === info._id);
  const cartqty = itemInCart ? itemInCart.cartQty : 0;

  function add() {
    if (cartqty < info.qty) {
      dispatchCart({ type: 'ADD', payload: info });
    }
  }

  function remove() {
    if (cartqty > 0) {
      dispatchCart({ type: 'REMOVE', payload: info });
    }
  }

  if (cartqty > 0) {
    return (
      <div className={styles.container}>
        <button onClick={add}>+</button>
        <p>{cartqty}</p>
        <button onClick={remove}>-</button>
      </div>
    );
  }

  return (
    <button className={styles.addToCartBtn} onClick={add}>
      افزودن به سبد خرید
    </button>
  );
}

export default CartControlers;
