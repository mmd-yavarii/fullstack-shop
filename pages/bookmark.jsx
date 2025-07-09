import Empty from '@/components/template/Empty';
import CardSecondary from '@/components/module/CardSecondary';
import BookmarkBtn from '@/components/module/BookmarkBtn';
import { useBookmarkContext } from '@/contexts/BookmarkProvider';
import { useState } from 'react';

export default function Bookmarks() {
  const [bookmarks, dispatchBookmarks] = useBookmarkContext();

  return (
    <>
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
