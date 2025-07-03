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
    if (!form.phone.length || !form.password.length) return;
    console.log(form);
  }

  return <Form state={form} setState={setForm} handler={loginHandler} loading={loading} />;
}
