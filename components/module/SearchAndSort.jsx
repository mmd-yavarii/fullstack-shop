import styles from './SearchAndSort.module.css';

import { LuSearch } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';

import { useEffect, useState } from 'react';

import SortFilterModal from './SortFilterModal';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IoSearchOutline } from 'react-icons/io5';
import { BeatLoader } from 'react-spinners';

// close search modal after click someweare else search modal or search inp
function SearchAndSort() {
  const router = useRouter('');
  const [showModal, setShowModal] = useState(false);
  const [searchInp, setSearchInp] = useState(router.query.search || '');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // reset search
  useEffect(() => {
    if (!searchInp.length && router.query.search) {
      const searchParams = new URLSearchParams(router.query);
      searchParams.delete('search');
      router.replace(`/${searchParams}`);
    }
  }, [searchInp]);

  // fetch searched products
  useEffect(() => {
    if (!searchInp.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/search', {
          method: 'POST',
          body: JSON.stringify({ search: searchInp }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        setSearchResult(result.data || []);
      } catch (error) {
        console.error('خطا در جست‌وجو:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchInp]);

  // close search modal after click ou of modal or search
  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest('.search')) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      {/* search input and modal  */}
      <div className={`${styles.searchInp} search`}>
        <LuSearch opacity="0.5" />
        <input type="text" placeholder="جست و جو" value={searchInp} onChange={(e) => setSearchInp(e.target.value)} />

        {!!searchInp.length && (
          <div className={`${styles.searchModal} glass search ${showSearch ? styles.show : ''}`}>
            <>
              <Link href={`?search=${searchInp}`} className={styles.usersearch}>
                <IoSearchOutline style={{ marginLeft: '10px' }} />
                {searchInp.length > 7 ? ` جست و جوی : ${searchInp.slice(0, 7)} ...` : ` جست و جوی : ${searchInp}`}
              </Link>

              {isLoading ? (
                <div className={styles.loader}>
                  <BeatLoader size="0.5rem" />
                </div>
              ) : (
                searchResult.map((item) => (
                  <Link key={item._id} href={`?search=${encodeURIComponent(item.title)}`}>
                    {item.title}
                  </Link>
                ))
              )}
            </>
          </div>
        )}
      </div>

      <button className={styles.sortBtn} onClick={() => setShowModal(true)}>
        <MdOutlineCategory />
      </button>

      {/* filter modal */}
      {showModal && <SortFilterModal setShowModal={setShowModal} />}
    </div>
  );
}

export default SearchAndSort;
