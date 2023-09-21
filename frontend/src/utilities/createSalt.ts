import crypto from "crypto";
export const createSalt = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buf) => {
      if (err) {
        console.log("createSalt Error:", err);
        reject(err);
      }
      const salt: string = buf.toString("base64");
      console.log("생성된salt:", salt);
      resolve(salt);
    });
  });
};
