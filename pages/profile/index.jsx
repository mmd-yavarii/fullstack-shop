import { useAlert } from '@/contexts/AlertProvider';
import { useEffect, useState } from 'react';

export default function Profile({}) {
  // log out handler
  function logoutHandler() {
    console.log('logout');
  }

  return (
    <>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}
