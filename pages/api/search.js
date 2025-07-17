import Product from '@/models/Product';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'failed', message: 'متد مجاز نیست' });
  }

  const searchValue = req.body.search;

  try {
    const products = await Product.find(
      {
        title: { $regex: searchValue, $options: 'i' },
      },
      { _id: 1, title: 1 }
    ).select('title slug');

    return res.status(200).json({ status: 'success', message: 'محصولات با موفقیت گرفته شد', data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'failed', message: 'خطا در برقراری ارتباط با سرور' });
  }
}
