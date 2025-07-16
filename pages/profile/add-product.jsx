import AddProductPage from '@/components/template/AddProductPage';
import { useAlert } from '@/contexts/AlertProvider';
import connectDb from '@/utils/connectDb';
import { verify } from 'jsonwebtoken';
import { useState } from 'react';

// main page component
export default function AddProduct() {
  const showAlert = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  // save new products handler
  async function submitFormHandler(form) {
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

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((file) => formData.append('images', file));
      } else {
        formData.append(key, value);
      }
    });

    setIsLoading(true);
    const response = await fetch('/api/add-new-product', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      showAlert('success', 'محصول جدید اضافه شد');
    } else {
      showAlert('error', 'مشکلی در افزودن محصول رخ داده است');
    }
    setIsLoading(true);
  }

  return <AddProductPage handler={submitFormHandler} isLoading={isLoading} />;
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
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
}
