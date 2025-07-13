import Empty from '@/components/template/Empty';
import CardSecondary from '@/components/module/CardSecondary';
import BookmarkBtn from '@/components/module/BookmarkBtn';
import { useBookmarkContext } from '@/contexts/BookmarkProvider';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Bookmarks() {
  const [bookmarks, dispatchBookmarks] = useBookmarkContext();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>ذخیره شده ها</title>
      </Head>

      {bookmarks.length ? (
        bookmarks.map((i) => (
          <CardSecondary key={i._id} image={'/test.png'} {...i}>
            <BookmarkBtn info={i} />
          </CardSecondary>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
}
