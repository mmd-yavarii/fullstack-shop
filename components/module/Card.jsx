import Image from 'next/image';

import styles from './Card.module.css';
import { useState } from 'react';
import Link from 'next/link';
import BookmarkBtn from './BookmarkBtn';

function Card({ info }) {
  const { discount, price, images, title, _id } = info;

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <Link href={`/product/${_id}`}>
          <img
            src={
              'https://hips.hearstapps.com/hmg-prod/images/iphone-16-review-lead-6724ffef2985f.jpg?crop=0.6668170878459687xw:1xh;center,top&resize=640:*'
            }
            alt={title}
            width="100%"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </Link>

        {discount && <p className={styles.discount}>-{discount} %</p>}

        <div className={styles.bookmarkBtn}>
          <BookmarkBtn info={info} />
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
