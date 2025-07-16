import connectDb from '@/utils/connectDb';
import { verify } from 'jsonwebtoken';

// main page component
export default function AddProduct({ userId }) {
  return (
    <>
      <h1>hello</h1>
    </>
  );
}

// redirect and get user id
export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

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
