import CardSecondary from '@/components/module/CardSecondary';
import CartControlers from '@/components/module/CartControlers';
import Empty from '@/components/template/Empty';
import { useCart } from '@/contexts/CartProvider';

export default function Cart() {
  const [cart, setCart] = useCart();

  return (
    <>
      {cart.length ? (
        cart.map((i) => (
          <CardSecondary image={'/test.png'} {...i}>
            <CartControlers info={i} />
          </CardSecondary>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
}
