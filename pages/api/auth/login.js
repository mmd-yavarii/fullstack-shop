import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
import connectDb_API from '@/utils/connectDbAPI';
import { serialize } from 'cookie';

import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  // check connections
  const connection = await connectDb_API(res);
  if (req.method !== 'POST' || !connection) return;

  // validation inputs
  const { phone, password } = req.body;

  if (!phone || !password) return res.status(400).json({ status: 'error', message: 'اطلاعات به درستی وارد نشده است' });

  try {
    const findUser = await User.findOne({ phone: phone });

    // validation data
    if (!findUser) {
      return res.status(404).json({ status: 'error', message: 'کاربری با این شماره یافت نشد' });
    }

    const isMatch = await verifyPassword(password, findUser.password);
    if (!isMatch) {
      return res.status(404).json({ status: 'error', message: 'کاربری با این مشخصات یافت نشد' });
    }

    // set token on client's cookie as http only
    const payload = { id: findUser._id, phone: findUser.phone, role: findUser.role, name: findUser.name };
    const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    res.status(201).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'ورود با موفقیت انجام شد' });
  } catch (error) {
    console.log(`\n❌${error}\n`);
    return res.status(500).json({ status: 'error', message: 'خطا در برقراری ارتباط' });
  }
}
