import jwt from "jsonwebtoken";

export const createActiveToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.EXPIRES_IN
  })
}

export const resetToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "6h",
  });
};