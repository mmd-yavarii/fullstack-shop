import { PiHeart, PiHeartDuotone } from 'react-icons/pi';
import styles from './BookmarkBtn.module.css';
import { useEffect, useState } from 'react';
import { useBookmarkContext } from '@/contexts/BookmarkProvider';

export default function BookmarkBtn({ id }) {
  const [bookmarks, dispatchBookmarks] = useBookmarkContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isBook = bookmarks.includes(id);

  function bookHandler() {
    dispatchBookmarks({ type: isBook ? 'REMOVE' : 'ADD', payload: id });
  }

  return (
    <button className={styles.bookmarkBtn} onClick={bookHandler}>
      {isBook ? <PiHeartDuotone /> : <PiHeart />}
    </button>
  );
}
