var express = require("express");
var router = express.Router();
const random = require("@shane-butt/randomts");

/*
Shuffle an array
*/
router.get("/shuffle", (req, res) => {
  const array = req.body.array;
  const shuffledArray = random.shuffleArray(array);
  res.json({ array, shuffledArray });
});
/*
Pick random values from array
*/
router.get("/pick", (req, res) => {
  const array = req.body.array;
  let count = req.body.count;
  if (!count || typeof count !== "number" || count < 1) count = 1;
  const allowReplacements = req.body.allowReplacements || false;
  const values = random.pickNRandomFromArray(array, count, allowReplacements);
  res.json({
    array,
    count,
    allowReplacements,
    values,
  });
});

module.exports = router;
