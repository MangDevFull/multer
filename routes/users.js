import express from 'express';
var router = express.Router();
import authenticateToken from "../middleware.js"
/* GET users listing. */
router.get('/',authenticateToken, function(req, res, next) {
  res.send('respond with a resource');
});
export default router;
