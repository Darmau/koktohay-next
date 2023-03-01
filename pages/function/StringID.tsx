import crypto from 'crypto'

function generateId(header: string) {
  const md5 = crypto.createHash('md5');
  md5.update(header)
  return md5.digest('hex');
}

export default generateId;