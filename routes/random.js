var express = require("express");
var router = express.Router();
const random = require("@shane-butt/randomts");

const verboseCoinFlip = (val, verbose) => {
  if (verbose) {
    return val === "H" ? "Heads" : "Tails";
  }
  return val;
};

/*
Get a random number between [0,1)
*/
router.get("/", (req, res) => {
  let count = req.count;
  let precision = req.precision;
  if (!count || typeof count !== "number" || count < 1) count = 1;
  if (!precision || typeof precision !== "number" || precision < 1)
    precision = 3;
  const value = Array.from({ length: count }, (_) => random.random(precision));
  res.json({ value, count, precision });
});

/*
Get a value in a specific range
*/
router.get("/number-in-range", (req, res) => {
  const lowerBound = req.body.lowerBound;
  const upperBound = req.body.upperBound;
  const value = random.randomNumberInRange(lowerBound, upperBound);
  console.log(
    `Random value in range [${lowerBound},${upperBound}) is ${value}`
  );
  res.json({ value, lowerBound, upperBound });
});
/*
Get values in a specific range
*/
router.get("/numbers-in-range", (req, res) => {
  const lowerBound = req.body.lowerBound;
  const upperBound = req.body.upperBound;
  const count = req.body.count;
  const allowReplacements = req.body.allowReplacements || false;
  const values = random.nRandomNumbersInRange(
    lowerBound,
    upperBound,
    count,
    allowReplacements
  );
  res.json({ values, count, lowerBound, upperBound, allowReplacements });
});

/*
Flip a coin
*/
router.get("/flip-coin", (req, res) => {
  const verbose = req.body.verbose || false;
  let count = req.body.count;
  if (!count || typeof count !== "number") count = 1;
  let results = Array.from({ length: count }, (_) =>
    verboseCoinFlip(random.flipACoin(), verbose)
  );
  res.json({ count, coin: results });
});

/*
Roll a dice
*/
router.get("/roll-die", (req, res) => {
  let sides = req.body.sides;
  let count = req.body.count;
  if (!sides || typeof sides !== "number" || sides < 1) sides = 6;
  if (!count || typeof count !== "number" || count < 1) count = 1;
  const value = [];
  for (let i = 0; i < count; i++) value.push(random.rollNSidedDie(sides));
  res.json({
    sides,
    count,
    value,
    sum: value.reduce((a, v) => (a += v)),
  });
});
module.exports = router;
