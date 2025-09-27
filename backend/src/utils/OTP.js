import bcrypt from "bcrypt";

export let otp = async () => {
  let code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  let hashCode = await bcrypt.hash(JSON.stringify(code), 10);
  return { code, hashCode };
};

export let expiry = (minutes = 5) => {
  return Date.now() + 1000 * 60 * minutes;
};
