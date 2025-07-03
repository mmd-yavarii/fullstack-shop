import { useToken } from '@/contexts/TokenProvider';
import Form from '@/template/Form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [token, setToken] = useToken();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    password: '',
  });

  useEffect(() => {
    if (token.length) {
      router.replace('/');
    }
  }, [token]);

  // login handler
  async function loginHandler() {
    if (!form.phone.length || !form.password.length) {
      alert('اطلاعات وارد شده کامل نیست');
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
      alert(result.message);

      if (result.status === 'success') {
        setToken(result.data);
      }
    } finally {
      setLoading(false);
    }
  }

  return <Form state={form} setState={setForm} handler={loginHandler} loading={loading} />;
}
