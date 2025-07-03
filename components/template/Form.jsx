import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

import styles from './Form.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Form({ state, setState, handler, loading }) {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  function changeHandler(name, value) {
    setState((form) => ({ ...form, [name]: value }));
  }

  return (
    <>
      <Head>
        <title>{router.asPath == '/auth/signup' ? 'ایجاد حساب کاربری' : 'ورود به حساب کاربری'}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.form}>
          <p className={styles.title}>{router.asPath == '/auth/signup' ? 'ایجاد حساب کاربری' : 'ورود به حساب کاربری'}</p>

          {router.asPath == '/auth/signup' && (
            <div>
              <input type="text" placeholder="نام" value={state.name} name="name" onChange={(e) => changeHandler(e.target.name, e.target.value)} />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="شماره تلفن"
              value={state.phone}
              name="phone"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
            />
          </div>

          <div>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="رمز عبور"
              value={state.password}
              name="password"
              onChange={(e) => changeHandler(e.target.name, e.target.value)}
            />
            <button onClick={() => setShowPass((prev) => !prev)}>{showPass ? <FaRegEyeSlash opacity="0.5" /> : <FaRegEye opacity="0.5" />}</button>
          </div>

          {router.asPath == '/auth/signup' && (
            <div>
              <input
                type={showPass2 ? 'text' : 'password'}
                placeholder="تکرار رمز عبور"
                value={state.repassword}
                name="repassword"
                onChange={(e) => changeHandler(e.target.name, e.target.value)}
              />
              <button onClick={() => setShowPass2((prev) => !prev)}>
                {showPass2 ? <FaRegEyeSlash opacity="0.5" /> : <FaRegEye opacity="0.5" />}
              </button>
            </div>
          )}

          <button className={styles.submitBtn} onClick={handler}>
            {loading ? <BeatLoader size="8" color="#fff" /> : <span>{router.asPath == '/auth/signup' ? 'ثبت نام' : 'ورود'}</span>}
          </button>

          {router.asPath == '/auth/signup' ? (
            <Link replace={true} href="/auth/login">
              حساب کاربری دارم
            </Link>
          ) : (
            <Link replace={true} href="/auth/signup">
              ایجاد حساب کاربری
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Form;
