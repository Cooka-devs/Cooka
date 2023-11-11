import crypto from "crypto";
export const encodePw = (salt: string, password: string): string => {
  const baseCrypto = crypto
    .createHash(`sha256`)
    .update(salt + password)
    .digest(`base64`);
  return baseCrypto;
};
