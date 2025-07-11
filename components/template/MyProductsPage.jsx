import styles from './MyProductsPage.module.css';
import CardSecondary from '../module/CardSecondary';
import { useAlert } from '@/contexts/AlertProvider';
import Empty from './Empty';

function MyProductsPage({ myProducts, myPendingProducts }) {
  const showAlert = useAlert();

  // deactive link click handler
  function disabledClick() {
    showAlert('error', 'محصول در حال حاضر قابل نمایش نیست');
  }

  return (
    <div>
      {myPendingProducts.length > 0 || myProducts.length > 0 ? (
        <>
          <div className={styles.section}>
            {myPendingProducts.length > 0 && (
              <>
                <div>
                  {myPendingProducts.map((item) => (
                    <div key={item._id} onClick={disabledClick} className={styles.disabled}>
                      <CardSecondary image={'/test.png'} {...item} disabled={true}>
                        <p className={styles.pendingMessage}>در انتظار تایید</p>
                      </CardSecondary>
                    </div>
                  ))}
                </div>
              </>
            )}

            {myProducts.length > 0 && (
              <>
                <div>
                  {myProducts.map((item) => (
                    <CardSecondary image={'/test.png'} key={item._id} {...item}>
                      <p className={styles.acceptedMessage}>تایید شده</p>
                    </CardSecondary>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default MyProductsPage;
