import connectDb_API from '@/utils/connectDbAPI';

export default async function handler(req, res) {
  await connectDb_API(res);
  if (req.method !== 'POST' || !connection) return;

  const { title, description, category, qty, price, discount, images } = req.body;

  if (!title || !description || !category || !qty || !price || !discount || !images.length)
    return res.status(400).json({ status: 'error', message: 'اطلاعات به درستی وارد نشده است' });
}
