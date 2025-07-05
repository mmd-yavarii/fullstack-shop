import styles from './SearchAndSort.module.css';

import { LuSearch } from 'react-icons/lu';
import { MdOutlineCategory } from 'react-icons/md';

import { useState } from 'react';

import SortFilterModal from './SortFilterModal';

function SearchAndSort() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.searchInp}>
        <LuSearch opacity="0.5" />
        <input type="text" placeholder="جست و جو" />
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
