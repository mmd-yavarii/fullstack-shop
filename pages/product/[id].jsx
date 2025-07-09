import ProductPage from '@/components/template/ProductPage';
import Product from '@/models/Product';
import connectDb from '@/utils/connectDb';

export default function ProductDetail({ info }) {
  return <ProductPage info={info} />;
}

export async function getStaticPaths() {
  try {
    await connectDb();
    const ids = await Product.find({}, { _id: 1 });
    const paths = ids.map((i) => ({ params: { id: i._id.toString() } }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    await connectDb();

    const info = await Product.findById(id);

    return {
      props: {
        info: JSON.parse(JSON.stringify(info)),
      },
      revalidate: 300,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
