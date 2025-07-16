import { categories } from '@/helper/varables';
import styles from './AddProductPage.module.css';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function AddProductPage({ handler, isLoading }) {
  const [imgCounter, setImgCounter] = useState(1);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    images: [],
    qty: 1,
    price: 0,
    discount: 0,
  });

  function changeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'images') {
      const file = event.target.files[0];
      if (file) {
        setForm((prev) => ({ ...prev, images: [...prev.images, file] }));
      }
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <label htmlFor="title" className={styles.required}>
            نام محصول
          </label>
          <input type="text" id="title" name="title" onChange={changeHandler} value={form.title} />
        </div>

        <div>
          <label htmlFor="description" className={styles.required}>
            توضیحات محصول
          </label>
          <input type="text" id="description" name="description" onChange={changeHandler} value={form.description} />
        </div>

        <div>
          <label htmlFor="qty">تعداد موجودی</label>
          <input type="number" id="qty" name="qty" min="0" onChange={changeHandler} value={form.qty} />
        </div>

        <div>
          <label htmlFor="price" className={styles.required}>
            قیمت محصول (تومان)
          </label>
          <input type="number" id="price" name="price" min="0" onChange={changeHandler} value={form.price} />
        </div>

        <div>
          <label htmlFor="discount">درصد تخفیف (اختیاری)</label>
          <input type="number" id="discount" name="discount" min="0" max="100" onChange={changeHandler} value={form.discount} />
        </div>

        <div>
          <label htmlFor="category" className={styles.required}>
            دسته‌بندی محصول
          </label>
          <select id="category" name="category" onChange={changeHandler} value={form.category}>
            <option value="">انتخاب دسته‌بندی محصول</option>
            {categories.map((i) => (
              <option key={i.id} value={i.slug}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.images}>
        <label htmlFor="images" className={styles.required}>
          تصاویر محصول
        </label>

        {Array.from({ length: imgCounter }).map((_, index) => (
          <input key={index} type="file" id="images" name="images" accept="image/*" onChange={changeHandler} />
        ))}

        {form.images.length < 5 && <button onClick={() => setImgCounter(form.images.length + 1)}>افزودن عکس جدید</button>}
      </div>

      <button className={styles.add} onClick={() => handler(form)}>
        {isLoading ? <BeatLoader size="0.6rem" color="#fff" /> : 'افزودن محصول'}
      </button>
    </>
  );
}
