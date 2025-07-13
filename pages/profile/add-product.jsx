import AddProductPage from '@/components/template/AddProductPage';
import { addProducReducer, addProductInitialState } from '@/helper/addProductReducer';
import connectDb from '@/utils/connectDb';
import { verify } from 'jsonwebtoken';

import { useReducer } from 'react';

// main page component
export default function AddProduct({ userId }) {
  const [form, dispatchForm] = useReducer(addProducReducer, addProductInitialState);
  addProductInitialState.userId = userId;

  // add new product handler
  async function handler() {
    console.log(form);
  }

  return <AddProductPage form={form} dispatchForm={dispatchForm} handler={handler} />;
}

// redirect and get user id
export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie || '';
  const token = cookies
    .split('; ')
    .find((c) => c.startsWith('token='))
    ?.split('=')[1];

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    await connectDb();
    const decoded = verify(token, process.env.SECRET_KEY);

    const userId = decoded.id;

    return {
      props: {
        userId,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
