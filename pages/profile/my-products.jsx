import mongoose from 'mongoose';
import { verify } from 'jsonwebtoken';

import connectDb from '@/utils/connectDb';
import Product from '@/models/Product';
import PendingProduct from '@/models/PendingProduct';
import MyProductsPage from '@/components/template/MyProductsPage';

export default function MyProducts({ myProducts, myPendingProducts }) {
  return <MyProductsPage myProducts={myProducts} myPendingProducts={myPendingProducts} />;
}

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

    const userId = new mongoose.Types.ObjectId(decoded.id);
    const myProducts = await Product.find({ userId });
    const myPendingProduct = await PendingProduct.find({ userId });

    return {
      props: {
        myProducts: JSON.parse(JSON.stringify(myProducts)),
        myPendingProducts: JSON.parse(JSON.stringify(myPendingProduct)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
