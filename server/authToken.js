const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        res.send("missing token")
    }

    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user.username;
        next();
    } catch (err) {
        res.send("Token not correct")
    }
}

module.exports = authToken;