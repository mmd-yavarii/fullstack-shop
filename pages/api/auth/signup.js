import User from '@/models/User';
import connectDb_API from '@/utils/connectDbAPI';

import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  const connection = await connectDb_API(res);
  if (req.method !== 'POST' || !connection) return;

  const { name, phone, password } = req.body;

  if (!name || !phone || !password) return res.status(400).json({ status: 'error', message: 'اطلاعات به درستی وارد نشده است' });

  try {
    const findUser = await User.findOne({ phone: phone });
    if (findUser) return res.status(400).json({ status: 'error', message: 'کاربری با این شماره تماس از قبل وجود دارد' });

    const response = await User.create({ name, phone, password });

    const payload = { id: response._id, phone: response.phone, role: response.role, name: response.name };
    const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });

    res.status(201).json({ status: 'success', message: 'کاربر با موفقیت ایجاد شد', data: token });
  } catch (error) {
    console.log(`\n❌${error}\n`);
    return res.status(500).json({ status: 'error', message: 'خطلا در برقراری ارتباط' });
  }
}
