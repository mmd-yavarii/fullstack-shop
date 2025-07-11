import Image from 'next/image';
import styles from './CardSecondary.module.css';
import Link from 'next/link';

export default function CardSecondary({ image, title, price, _id, discount, children, disabled = false }) {
  const finalPrice = price * (1 - discount / 100);

  return (
    <div className={styles.card}>
      <Link href={disabled ? '' : `/product/${_id}`} className={styles.info}>
        <div className={styles.imgContainer}>
          <Image src={image} alt={title} fill />
        </div>

        <div>
          <p className={styles.title}>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</p>
          <div className={styles.price}>
            {discount > 0 && <span className={styles.discount}>{price.toLocaleString()} تومان</span>}
            <span> {finalPrice.toLocaleString()} تومان</span>
          </div>
        </div>
      </Link>

      {children}
    </div>
  );
}
