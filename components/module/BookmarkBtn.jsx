import { PiHeart, PiHeartDuotone } from 'react-icons/pi';
import styles from './BookmarkBtn.module.css';
import { useEffect, useState } from 'react';
import { useBookmarkContext } from '@/contexts/BookmarkProvider';
import { useAlert } from '@/contexts/AlertProvider';

export default function BookmarkBtn({ info }) {
  const [bookmarks, dispatchBookmarks] = useBookmarkContext();
  const [mounted, setMounted] = useState(false);
  const showAlert = useAlert();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isBook = Array.isArray(bookmarks) && info?._id ? bookmarks.some((item) => item?._id === info._id) : false;

  function bookHandler() {
    if (isBook) {
      const confirmation = confirm('آیا مطمئن هستید که می‌خواهید این آیتم را از بوکمارک حذف کنید؟');
      confirmation && dispatchBookmarks({ type: 'REMOVE', payload: info });
      showAlert('error', 'حذف از بوکمارک انجام شد');
    } else {
      dispatchBookmarks({ type: 'ADD', payload: info });
      showAlert('success', 'بوکمارک شد');
    }
  }

  return (
    <button className={styles.bookmarkBtn} onClick={bookHandler}>
      {isBook ? <PiHeartDuotone /> : <PiHeart />}
    </button>
  );
}
