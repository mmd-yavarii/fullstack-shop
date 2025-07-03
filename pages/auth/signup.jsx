import { useToken } from '@/contexts/TokenProvider';
import Form from '@/template/Form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [token, setToken] = useToken();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    repassword: '',
  });

  useEffect(() => {
    if (token.length) {
      router.replace('/');
    }
  }, [token]);

  // sign up handler
  async function signupHandler() {
    if (!form.name.length || !form.phone.length || !form.password.length || !form.repassword.length || form.password != form.repassword) {
      alert('کلمه عبور مطابقت ندارد');
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

      if (result.status === 'success') {
        setToken(result.data);
      }
    } finally {
      setLoading(false);
    }
  }

  return <Form state={form} setState={setForm} handler={signupHandler} loading={loading} />;
}
