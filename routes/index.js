import express from 'express'
import Queue from "bull"
var router = express.Router();
/* GET home page. */
router.get('/queue', function (req, res, next) {
  // in 1 second run 1 job
  const queue = new Queue('my-first-queue',{ limiter: {
    max: 1,
    duration: 1000,
  },});
  const main = async () => {
     queue.add({ name: "John", age: 30 });
     queue.add({ name: "John", age: 31 });
     queue.add({ name: "John", age: 32 });
     queue.add({ name: "John", age: 33 });
     queue.add({ name: "John", age: 34 });
     queue.add({ name: "John", age: 35 });
     queue.add({ name: "John", age: 36 });
     queue.add({ name: "John", age: 37 });
     queue.add({ name: "John", age: 38 });
     queue.add({ name: "John", age: 39 });
     queue.add({ name: "John", age: 40 });
     queue.add({ name: "John", age: 41 });
  };

  queue.process((job, done) => {
    console.log("test")
    console.log(job.data);
    done();
  });

  main().catch(console.error);
  return res.json({oke:true})
});

export default router;
