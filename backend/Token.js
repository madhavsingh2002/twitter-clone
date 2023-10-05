import jwt from "jsonwebtoken";
import { handleError } from "./error.js";
import { JWT_SECRET } from "./config.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(handleError(401, "You are not authenticated"));

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is invalid"));
    req.user = user;
    next();
  });
};