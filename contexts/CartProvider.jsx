import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const productIndex = state.findIndex((i) => i._id === action.payload._id);

      if (productIndex !== -1) {
        const existingProduct = state[productIndex];
        const updatedProduct = {
          ...existingProduct,
          cartQty: existingProduct.cartQty + 1,
        };

        return [...state.slice(0, productIndex), updatedProduct, ...state.slice(productIndex + 1)];
      } else {
        return [...state, { ...action.payload, cartQty: 1 }];
      }
    }

    case 'REMOVE': {
      const productIndex = state.findIndex((i) => i._id === action.payload._id);
      if (productIndex === -1) return state;

      const product = state[productIndex];

      if (product.cartQty > 1) {
        const updatedProduct = { ...product, cartQty: product.cartQty - 1 };
        return [...state.slice(0, productIndex), updatedProduct, ...state.slice(productIndex + 1)];
      } else {
        return state.filter((item) => item._id !== action.payload._id);
      }
    }

    default:
      throw new Error('Action is not defined');
  }
}

// initial lazy stste
function initCart() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

// main context
export default function CartProvider({ children }) {
  const [cart, dispatchCart] = useReducer(reducer, [], initCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return <CartContext.Provider value={[cart, dispatchCart]}>{children}</CartContext.Provider>;
}

// custom hook for usage
export function useCart() {
  return useContext(CartContext);
}
