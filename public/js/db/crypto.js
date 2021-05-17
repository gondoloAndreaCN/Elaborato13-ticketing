const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // set random encryption key
const iv = crypto.randomBytes(16); // set random initialisation vector

const encrypt = (text) => {

    const cipher = crypto.createCipher(algorithm, secretKey);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    // return {
    // iv: iv.toString('hex'),
    // content: encrypted.toString('hex')
    // };
    return encrypted.toString('hex')

};

const decrypt = (encrypted) => {

    const decipher = crypto.createDecipher(algorithm, secretKey);

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};