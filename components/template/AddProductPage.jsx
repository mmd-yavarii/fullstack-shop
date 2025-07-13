import styles from './AddProductPage.module.css';

import { categories } from '@/helper/varables';

function AddProductPage({ form, dispatchForm, handler }) {
  // inputs change handler
  function changeHandler(type, payload) {
    dispatchForm({ type, payload });
  }

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="title">نام محصول</label>
        <input type="text" id="title" value={form.title} onChange={(e) => changeHandler('TITLE', e.target.value)} />
      </div>

      <div>
        <label htmlFor="description">توضیحات</label>
        <input type="text" id="description" value={form.description} onChange={(e) => changeHandler('DESCRIPTION', e.target.value)} />
      </div>

      <div>
        <label htmlFor="price">قیمت</label>
        <input type="number" id="price" onChange={(e) => changeHandler('PRICE', +e.target.value)} />
      </div>

      <div>
        <label htmlFor="qty">تعداد</label>
        <input type="number" id="qty" onChange={(e) => changeHandler('QTY', +e.target.value)} />
      </div>

      <div>
        <label htmlFor="discount">تخفیف (درصد)</label>
        <input type="number" id="discount" onChange={(e) => changeHandler('DISCOUNT', +e.target.value)} />
      </div>

      <div>
        <label htmlFor="description">کتگوری</label>
        <select value={form.category} onChange={(e) => changeHandler('CATEGORY', e.target.value)}>
          <option value="">کتگوری</option>
          {categories.map((i) => (
            <option key={i.id} value={i.slug}>
              {i.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="img">عکس های محصول</label>
        <input
          id="img"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            files.forEach((file) => changeHandler('IMAGES', file));
          }}
        />
      </div>

      <div className={styles.imgsContainer}>
        {form.images.map((img, index) => (
          <img key={index} src={URL.createObjectURL(img)} alt="تصویر انتخاب‌شده" />
        ))}
      </div>

      <div>
        <span style={{ color: 'transparent' }}>g</span>
        <button className={styles.handlerBtn} onClick={handler}>
          افزودن
        </button>
      </div>
    </div>
  );
}

export default AddProductPage;
