const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = async (req, res, next) => {
  console.log(req);
  try {
   
    const token = req.headers.authorization.split(" ")[1] || req.headers.authorization || req.cookies.token ;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    }
    return res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = { isAuth };
