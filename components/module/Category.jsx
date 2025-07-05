import { categories } from '@/helper/varables';
import styles from './Category.module.css';
import { useRouter } from 'next/router';

function Category() {
  const { query, push } = useRouter();

  const setQueryHandler = (slug = '') => {
    const searchParams = new URLSearchParams(query);

    if (slug === '') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }

    push(`/?${searchParams.toString()}`);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setQueryHandler('')} className={`${styles.category} ${!query.category && styles.selected}`}>
        همه
      </button>

      {categories.map((i) => (
        <button key={i.id} onClick={() => setQueryHandler(i.slug)} className={`${styles.category} ${i.slug === query.category && styles.selected}`}>
          {i.name}
        </button>
      ))}
    </div>
  );
}

export default Category;
