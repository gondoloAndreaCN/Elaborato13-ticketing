const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // set random encryption key
const iv = crypto.randomBytes(16); // set random initialisation vector

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    // return {
    // iv: iv.toString('hex'),
    // content: encrypted.toString('hex')
    // };
    return iv.toString('hex') + ':' + encrypted.toString('hex');

};

const decrypt = (text) => {

    let parts = text.split(':');
    let iv = Buffer.from(parts.shift(), 'hex');
    let encrypted = Buffer.from(parts.join(':'), 'hex');

    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    const decrpyted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};