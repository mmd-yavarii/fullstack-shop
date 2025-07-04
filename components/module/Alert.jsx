import { MdOutlineErrorOutline } from 'react-icons/md';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import styles from './Alert.module.css';

function Alert({ type, message, isAlert, setIsAlert }) {
  return (
    <div className={`${isAlert ? styles.container : styles.closeContainer} ${type == 'success' ? styles.success : styles.error}`}>
      <div>
        {type == 'success' ? <FaRegCircleCheck size="1.3rem" /> : <MdOutlineErrorOutline size="1.3rem" />}
        <p>{message}</p>
      </div>

      <button onClick={() => setIsAlert(false)}>
        <IoClose size="1.3rem" />
      </button>
    </div>
  );
}

export default Alert;
