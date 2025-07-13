import User from '@/models/User';
import { hashedPassword } from '@/utils/auth';
import connectDb_API from '@/utils/connectDbAPI';
import { serialize } from 'cookie';

import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  // check connections
  const connection = await connectDb_API(res);
  if (req.method !== 'POST' || !connection) return;

  // validation inputs
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) return res.status(400).json({ status: 'error', message: 'اطلاعات به درستی وارد نشده است' });

  try {
    // check existance data
    const findUser = await User.findOne({ phone: phone });
    if (findUser) return res.status(400).json({ status: 'error', message: 'کاربری با این شماره تماس از قبل وجود دارد' });

    // sign in
    const hashedPass = await hashedPassword(password);
    const response = await User.create({ name, phone, password: hashedPass });

    // log in
    const payload = { id: response._id, phone: response.phone, role: response.role, name: response.name };
    const token = sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    res.status(201).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'کاربر با موفقیت ایجاد شد' });
  } catch (error) {
    console.log(`\n❌${error}\n`);
    return res.status(500).json({ status: 'error', message: 'خطا در برقراری ارتباط' });
  }
}
