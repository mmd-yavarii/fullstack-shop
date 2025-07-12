import Image from 'next/image';

import CartControlers from '../module/CartControlers';
import styles from './ProductPage.module.css';

import { FiTrash2 } from 'react-icons/fi';
import { TbEdit } from 'react-icons/tb';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BookmarkBtn from '../module/BookmarkBtn';

function ProductPage({ product, user }) {
  const router = useRouter();

  // test image
  const imgs = [
    '/test.png',
    'https://hips.hearstapps.com/hmg-prod/images/iphone-16-review-lead-6724ffef2985f.jpg?crop=0.6668170878459687xw:1xh;center,top&resize=640:*',
    'https://cdn.outsideonline.com/wp-content/uploads/2023/09/appe-15-camera_s.jpg',
  ];

  const [imgSelected, setImgSelected] = useState(imgs[0]);

  // delete a product handler
  async function deleteProduct() {
    // send token to validation token
  }

  // edit a product's info handler
  async function editProduct() {
    // send token to validation token
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgSession}>
        <div className={styles.imgContainer}>
          <div className={styles.buttons}>
            <button className="glass" onClick={() => router.back()}>
              <IoArrowBack />
            </button>

            {(user.id == product.userId || user.role == 'admin') && (
              <div>
                <button className="glass" onClick={deleteProduct}>
                  <FiTrash2 />
                </button>

                <button className="glass" onClick={editProduct}>
                  <TbEdit />
                </button>
              </div>
            )}
          </div>

          {/* <Image src={imgSelected} alt={product.title} fill /> */}
          <img src={imgSelected} alt={product.title} width={'100%'} />
        </div>

        <div className={styles.otherImages}>
          {imgs.map((i) => (
            <img onClick={() => setImgSelected(i)} className={imgSelected == i ? styles.selected : styles.fade} src={i} alt="" />
          ))}
        </div>
      </div>

      <div className={styles.information}>
        <p className={styles.productsTitle}>{product.title}</p>

        <p>{product.description}</p>

        {product.qty == 1 && <p style={{ color: '#f95959' }}>تنها یک عدد در انبار باقی مانده</p>}

        <div className={styles.price}>
          <span> {product.price * (1 - product.discount / 100).toLocaleString()} تومان</span>
          {product.discount > 0 && <span className={styles.discount}>{product.price.toLocaleString()} تومان</span>}
        </div>

        <div className={styles.therControlers}>
          <CartControlers info={product} />
          <BookmarkBtn info={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
