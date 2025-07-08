import Image from 'next/image';

import styles from './Card.module.css';
import { useState } from 'react';
import Link from 'next/link';
import BookmarkBtn from './BookmarkBtn';

function Card({ discount, price, images, title, _id }) {
  const [isBookmark, setIsBookmark] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <Link href={`/product/${_id}`}>
          <Image src={'/test.png'} alt={title} fill style={{ objectFit: 'contain', objectPosition: 'center' }} />
        </Link>

        <div className={styles.bookmarkBtn}>
          <BookmarkBtn />
        </div>
      </div>

      <Link href={`/product/${_id}`}>
        <p className={styles.title}>{title}</p>
      </Link>

      <div className={styles.price}>
        <p>{(price - (price * discount) / 100).toLocaleString()} تومان</p>
        {discount != 0 && <p className={styles.discounted}>{price} ت</p>}
      </div>
    </div>
  );
}

export default Card;
