import { PiHeart, PiHeartDuotone } from 'react-icons/pi';
import styles from './BookmarkBtn.module.css';
import { useState } from 'react';

export default function BookmarkBtn({ id }) {
  const [isBook, setIsBook] = useState(false);

  return (
    <button className={styles.bookmarkBtn} onClick={() => setIsBook((prev) => !prev)}>
      {isBook ? <PiHeartDuotone /> : <PiHeart />}
    </button>
  );
}
