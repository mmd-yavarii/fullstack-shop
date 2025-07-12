import Product from '@/models/Product';
import connectDb from '@/utils/connectDb';

import ProductPage from '@/components/template/ProductPage';
import { verify } from 'jsonwebtoken';

export default function ProductDetail({ product, user }) {
  return <ProductPage product={product} user={user} />;
}

// get product's info from db
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    await connectDb();
    const product = await Product.findById(id);

    const cookies = context.req.headers.cookie || '';
    const token = cookies
      .split('; ')
      .find((c) => c.startsWith('token='))
      ?.split('=')[1];

    const decoded = verify(token, process.env.SECRET_KEY);

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        user: JSON.parse(JSON.stringify(decoded)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
