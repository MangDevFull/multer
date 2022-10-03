import redis from "redis"
const redisClient = redis.createClient();
import jwt from "jsonwebtoken";
const authenticateToken = async (request, response, next) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // token provided?
    if (token == null) {
        return response.status(401).send({
            message: "No token provided",
        });
    }

    // token in deny list?
    await redisClient.connect();
    const inDenyList = await redisClient.get(`bl_${token}`);
    await redisClient.disconnect()
    if (inDenyList) {
        return response.status(401).send({
            message: "JWT Rejected",
        });
    }

    // token valid?
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return response.status(401).send({
                status: "error",
                message: error.message,
            });
        }

        request.name = user.name;
        request.tokenExp = user.exp;
        request.token = token;

        next();
    });
};
export default authenticateToken