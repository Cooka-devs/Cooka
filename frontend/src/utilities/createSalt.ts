import crypto from "crypto";
export const createSalt = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buf) => {
      if (err) {
        reject(err);
      }
      const salt: string = buf.toString("base64");
      resolve(salt);
    });
  });
};
