import AddProductPage from '@/components/template/AddProductPage';
import { useToken } from '@/contexts/TokenProvider';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';

const initialState = {
  title: '',
  description: '',
  category: '',
  qty: 0,
  price: 0,
  discount: 0,
  images: [],
  userId: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'TITLE':
      return { ...state, title: action.payload };

    case 'DESCRIPTION':
      return { ...state, description: action.payload };

    case 'CATEGORY':
      return { ...state, category: action.payload };

    case 'QTY':
      return { ...state, qty: action.payload };

    case 'PRICE':
      return { ...state, price: action.payload };

    case 'DISCOUNT':
      return { ...state, discount: action.payload };

    case 'IMAGES':
      return { ...state, images: [...state.images, action.payload] };
  }
}

export default function addProduct() {
  const [form, dispatchForm] = useReducer(reducer, initialState);
  const router = useRouter();
  const [token] = useToken();

  useEffect(() => {
    if (!token) router.replace('/auth/login');
  }, []);

  // add new product handler
  async function handler() {
    console.log(form);
  }

  return <AddProductPage form={form} dispatchForm={dispatchForm} handler={handler} />;
}
