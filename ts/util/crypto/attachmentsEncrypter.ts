const { encrypt, decrypt, calculateMAC, verifyMAC } = window.libsignal.crypto;
// tslint:disable: binary-expression-operand-order
// tslint:disable: restrict-plus-operands

async function verifyDigest(data: ArrayBuffer, theirDigest: ArrayBuffer) {
  return crypto.subtle.digest({ name: 'SHA-256' }, data).then(ourDigest => {
    const a = new Uint8Array(ourDigest);
    const b = new Uint8Array(theirDigest);
    let result = 0;
    for (let i = 0; i < theirDigest.byteLength; i += 1) {
      // tslint:disable-next-line: no-bitwise
      result |= a[i] ^ b[i];
    }
    if (result !== 0) {
      throw new Error('Bad digest');
    }
  });
}
async function calculateDigest(data: ArrayBuffer) {
  return crypto.subtle.digest({ name: 'SHA-256' }, data);
}

export async function decryptAttachment(
  encryptedBin: ArrayBuffer,
  keys: ArrayBuffer,
  theirDigest: ArrayBuffer
) {
  if (keys.byteLength !== 64) {
    throw new Error('Got invalid length attachment keys');
  }
  if (encryptedBin.byteLength < 16 + 32) {
    throw new Error('Got invalid length attachment');
  }

  const aesKey = keys.slice(0, 32);
  const macKey = keys.slice(32, 64);

  const iv = encryptedBin.slice(0, 16);
  const ciphertext = encryptedBin.slice(16, encryptedBin.byteLength - 32);
  const ivAndCiphertext = encryptedBin.slice(0, encryptedBin.byteLength - 32);
  const mac = encryptedBin.slice(encryptedBin.byteLength - 32, encryptedBin.byteLength);

  return verifyMAC(ivAndCiphertext, macKey, mac, 32)
    .then(async () => {
      if (!theirDigest) {
        throw new Error('Failure: Ask sender to update Signal and resend.');
      }
      return verifyDigest(encryptedBin, theirDigest);
    })
    .then(() => decrypt(aesKey, ciphertext, iv));
}

export async function encryptAttachment(
  plaintext: ArrayBuffer,
  keys: ArrayBuffer,
  iv: ArrayBuffer
) {
  if (!(plaintext instanceof ArrayBuffer) && !ArrayBuffer.isView(plaintext)) {
    throw new TypeError(
      `\`plaintext\` must be an \`ArrayBuffer\` or \`ArrayBufferView\`; got: ${typeof plaintext}`
    );
  }

  if (keys.byteLength !== 64) {
    throw new Error('Got invalid length attachment keys');
  }
  if (iv.byteLength !== 16) {
    throw new Error('Got invalid length attachment iv');
  }
  const aesKey = keys.slice(0, 32);
  const macKey = keys.slice(32, 64);

  return encrypt(aesKey, plaintext, iv).then((ciphertext: any) => {
    const ivAndCiphertext = new Uint8Array(16 + ciphertext.byteLength);
    ivAndCiphertext.set(new Uint8Array(iv));
    ivAndCiphertext.set(new Uint8Array(ciphertext), 16);

    return calculateMAC(macKey, ivAndCiphertext.buffer).then(async (mac: any) => {
      const encryptedBin = new Uint8Array(16 + ciphertext.byteLength + 32);
      encryptedBin.set(ivAndCiphertext);
      encryptedBin.set(new Uint8Array(mac), 16 + ciphertext.byteLength);
      return calculateDigest(encryptedBin.buffer).then(digest => ({
        ciphertext: encryptedBin.buffer,
        digest,
      }));
    });
  });
}
