import connectDb_API from '@/utils/connectDbAPI';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  // check connections
  const connection = await connectDb_API(res);
  if (req.method !== 'GET' || !connection) return;

  const cookie = serialize('token', '', { maxAge: 0, httpOnly: true, path: '/' });
  res.status(200).setHeader('Set-Cookie', cookie).json({ status: 'success', message: 'خروج با موفقیت انجام شد' });
}
