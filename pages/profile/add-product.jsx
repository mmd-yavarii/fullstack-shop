import AddProductPage from '@/components/template/AddProductPage';
import { useAlert } from '@/contexts/AlertProvider';
import connectDb from '@/utils/connectDb';
import { verify } from 'jsonwebtoken';
import { useState } from 'react';

// main page component
export default function AddProduct({ userId }) {
  const showAlert = useAlert();

  function submitFormHandler(form) {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category.trim() ||
      form.images.length <= 0 ||
      form.qty <= 0 ||
      form.price <= 0 ||
      form.discount < 0 ||
      form.discount > 100
    ) {
      showAlert('error', 'لطفاً تمام فیلدهای الزامی را پر کنید');
      return;
    }

    console.log(form);
  }

  return <AddProductPage handler={submitFormHandler} />;
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
