import { verify } from 'jsonwebtoken';

import { useAlert } from '@/contexts/AlertProvider';
import Form from '@/template/Form';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Signup() {
  const showAlert = useAlert();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    repassword: '',
  });

  // sign up handler
  async function signupHandler() {
    if (!form.name.length || !form.phone.length || !form.password.length || !form.repassword.length) {
      showAlert('error', 'اطلاعات به درستی وارد نشده');
    }
    if (form.password != form.repassword) {
      showAlert('error', 'کلمه عبور مطابقت ندارد');

      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name: form.name, phone: form.phone, password: form.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      showAlert(result.status, result.message);

      if (result.status === 'success') {
        router.replace('/');
      }
    } finally {
      setLoading(false);
    }
  }

  return <Form state={form} setState={setForm} handler={signupHandler} loading={loading} />;
}

// validation and redirect
export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie || '';
  const token = cookies
    .split('; ')
    .find((c) => c.startsWith('token='))
    ?.split('=')[1];

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    if (decoded) {
      return {
        redirect: {
          destination: '/',
        },
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
}
