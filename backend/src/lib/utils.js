import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET} = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured")
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d", // server-side token expiry (token becomes invalid).
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS client-side cookie lifetime (browser deletes cookie).
    httpOnly: true, // prevent XSS attactks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

    return token;
};
