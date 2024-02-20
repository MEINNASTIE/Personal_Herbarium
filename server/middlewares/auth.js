import jwt from "jsonwebtoken";
import "dotenv/config";

export default function auth(req, res, next) {
  try {
    console.log("Auth here", req.cookies);

    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("🚀 ~ decoded:", decoded);

    console.log("User authenticated:", decoded.id);

    req.user = decoded.id;

    next();
  } catch (error) {
    console.log("🚀 ~ error in auth:", error.message);

    res.status(500).send({ success: false, error: error.message });
  }
}