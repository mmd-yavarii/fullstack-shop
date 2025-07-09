import CardSecondary from '@/components/module/CardSecondary';
import CartControlers from '@/components/module/CartControlers';
import Empty from '@/components/template/Empty';
import { useCart } from '@/contexts/CartProvider';

import { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useCart();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      {cart.length ? (
        cart.map((i) => (
          <CardSecondary image={'/test.png'} {...i} key={i._id}>
            <CartControlers info={i} />
          </CardSecondary>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
}
