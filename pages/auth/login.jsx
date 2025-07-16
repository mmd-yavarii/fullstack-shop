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
        router.replace('/profile');
      }
    } finally {
      setLoading(false);
    }
  }

  return <Form state={form} setState={setForm} handler={loginHandler} loading={loading} />;
}

// validation and redirect
export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    if (decoded) {
      return {
        redirect: {
          destination: '/profile',
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
