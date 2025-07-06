import HomePage from '@/components/template/HomePage';
import Product from '@/models/Product';
import connectDb from '@/utils/connectDb';

export default function Home({ products }) {
  return (
    <>
      <HomePage products={products} />
    </>
  );
}

export async function getServerSideProps(context) {
  await connectDb();

  let products = [];

  const query = context.query;
  const sortValue = query['sort'];

  const filters = {};
  query['category'] && (filters.category = query['category']);
  query['max-price'] && (filters.price = { $lte: query['max-price'], $gte: query['min-price'] });
  query['search'] && (filters.title = { $regex: query['search'], $options: 'i' });

  let sortCondition = {};
  sortValue == 'alphabet' && (sortCondition = {});
  sortValue == 'cheap' && (sortCondition = { price: 1 });
  sortValue == 'expensive' && (sortCondition = { price: -1 });

  products = await Product.find(filters).sort(sortCondition);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
