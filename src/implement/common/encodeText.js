import crypto from 'crypto';

const encodeText = text => crypto.createHash('md5').update(text).digest('hex');

export default encodeText;
