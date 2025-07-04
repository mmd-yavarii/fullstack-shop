import User from '@/models/User';
import connectDb_API from '@/utils/connectDbAPI';

import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  const connection = await connectDb_API(res);
  if (req.method !== 'POST' || !connection) return;

  const { phone, password } = req.body;

  if (!phone || !password) return res.status(400).json({ status: 'error', message: 'اطلاعات به درستی وارد نشده است' });

  try {
    const findUser = await User.findOne({ phone: phone });
    if (!findUser || findUser.password !== password) return res.status(404).json({ status: 'error', message: 'کاربری با این مشخصات یافت نشد' });

    const token = sign({ phone: findUser.phone }, process.env.SECRET_KEY);
    res.status(201).json({ status: 'success', message: 'ورود با موفقیت انجام شد', data: token });
  } catch (error) {
    console.log(`\n❌${error}\n`);
    return res.status(500).json({ status: 'error', message: 'خطلا در برقراری ارتباط' });
  }
}
