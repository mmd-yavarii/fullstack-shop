import { useRouter } from 'next/router';
import styles from './SortFilterModal.module.css';
import { useState } from 'react';

const sortOptions = [
  { label: 'الفبا', href: 'alphabet' },
  { label: 'ارزان ترین', href: 'cheap' },
  { label: 'گران ترین', href: 'expensive' },
];

function SortFilterModal({ setShowModal }) {
  const router = useRouter();

  const [sortValue, setSortValue] = useState(router.query.sort || '');
  const [priceFilter, setPriceFilter] = useState({
    min: router.query['min-price'] || 0,
    max: router.query['max-price'] || 0,
  });

  // set filters on url as query string
  function setQuery() {
    if (sortValue.length || priceFilter.max > 0) {
      const searchParams = new URLSearchParams(router.query);
      if (sortValue.length) searchParams.set('sort', sortValue);
      if (priceFilter.max > 0) {
        searchParams.set('min-price', priceFilter.min);
        searchParams.set('max-price', priceFilter.max);
      }
      router.push(`/?${searchParams.toString()}`);
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  }

  // change input handler
  function changeHandler(event) {
    const { name, value } = event.target;
    setPriceFilter((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className={styles.backModal} onClick={() => setShowModal(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div>
          <p>مرتب سازی</p>
          <button onClick={() => setSortValue('')} className={`${styles.sortBtn} ${sortValue == '' && styles.selected}`}>
            همه
          </button>
          {sortOptions.map((i) => (
            <button key={i.label} onClick={() => setSortValue(i.href)} className={`${styles.sortBtn} ${sortValue == i.href && styles.selected}`}>
              {i.label}
            </button>
          ))}
        </div>

        <div>
          <p>فیلتر بر اساس قیمت</p>
          <label htmlFor="min">حداقل قیمت</label>
          <input type="number" id="min" placeholder="min" name="min" onChange={changeHandler} value={priceFilter.min} />
          <label htmlFor="max" style={{ marginTop: '20px' }}>
            حداکثر قیمت
          </label>
          <input type="number" id="max" placeholder="max" name="max" onChange={changeHandler} value={priceFilter.max} />
        </div>

        <button onClick={setQuery} className={styles.modalBtn}>
          {sortValue.length || priceFilter.max > 0 ? 'اعمال' : 'بستن'}
        </button>
      </div>
    </div>
  );
}

export default SortFilterModal;
