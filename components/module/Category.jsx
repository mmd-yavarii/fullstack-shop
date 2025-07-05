import { categories } from '@/helper/varables';

import Link from 'next/link';

import styles from './Category.module.css';
import { useRouter } from 'next/router';

function Category() {
  const {
    asPath: path,
    query: { category },
  } = useRouter();

  return (
    <div className={styles.container}>
      <Link className={`${styles.category} ${path == '/' && styles.selected}`} href={`/`}>
        همه
      </Link>

      {categories.map((i) => (
        <Link key={i.id} className={`${styles.category} ${i.slug == category && styles.selected}`} href={`/?category=${i.slug}`}>
          {i.name}
        </Link>
      ))}
    </div>
  );
}

export default Category;
