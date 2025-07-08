import Empty from '@/components/template/Empty';
import CardSecondary from '@/components/module/CardSecondary';
import BookmarkBtn from '@/components/module/BookmarkBtn';
import { useBookmarkContext } from '@/contexts/BookmarkProvider';

export default function Bookmarks() {
  const [bookmarks, dispatchBookmarks] = useBookmarkContext();

  console.log(bookmarks);

  return (
    <>
      {true ? (
        <CardSecondary image={'/test.png'} title="این یک مصول تستی است " price={200000} discount={1} _id={'6869ab4317e3ebd17d8cecb9'}>
          <BookmarkBtn id={'6869ab4317e3ebd17d8cecb9'} />
        </CardSecondary>
      ) : (
        <Empty />
      )}
    </>
  );
}
