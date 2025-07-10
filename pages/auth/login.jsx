import { verify } from 'jsonwebtoken';

import { useAlert } from '@/contexts/AlertProvider';
import Form from '@/template/Form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useToken } from '@/contexts/TokenProvider';

export default function Signup() {
  const showAlert = useAlert();
  const router = useRouter();
  const [token, setToken] = useToken();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    password: '',
  });

  // login handler
  async function loginHandler() {
    if (!form.phone.length || !form.password.length) {
      showAlert('error', 'اطلاعات وارد شده کامل نیست');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone: form.phone, password: form.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      showAlert(result.status, result.message);

      if (result.status === 'success') {
        setToken(result.data);
        router.replace('/');
      }
    } finally {
      setLoading(false);
    }
  }

  return <Form state={form} setState={setForm} handler={loginHandler} loading={loading} />;
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
