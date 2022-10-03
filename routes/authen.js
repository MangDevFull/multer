import express from 'express';
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware.js"
import redis from "redis"
const redisClient = redis.createClient();
var router = express.Router();
router.post('/login', (req, res) => {
    const { name } = req.body
    const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: "3600000s" });
    return res.json({ name, token })
})
router.post("/logout", authenticateToken, async (request, response) => {
    await redisClient.connect();
    const { name, token, tokenExp } = request;
    const token_key = `bl_${token}`;
    await redisClient.set(token_key, token);
    redisClient.expireAt(token_key, tokenExp);

    return response.status(200).send("Token invalidated");
});

export default router;