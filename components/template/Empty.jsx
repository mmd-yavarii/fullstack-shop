import Image from 'next/image';

import styles from './Empty.module.css';

function Empty() {
  return (
    <div className={styles.container}>
      <Image src={'/empty.png'} alt="empty" width={200} height={210} />

      <h4>چیزی پیدا نشد</h4>
      <p>به نظر می‌رسد در حال حاضر چیزی برای نمایش پیدا نکردیم!</p>
    </div>
  );
}

export default Empty;
