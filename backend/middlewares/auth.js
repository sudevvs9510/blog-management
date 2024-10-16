import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; 
    if (!token) {
      return res.status(403).json({ error: "Token is required" });
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.userId = decoded.userId; 
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default verifyToken;
