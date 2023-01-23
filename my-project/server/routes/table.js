const router = require("express").Router();
let Table = require("../models/table.model");

router.route("/").get((req, res) => {
  Table.find()
    .then(tables => res.json(tables))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const weekday = req.body.weekday;
  const planned = req.body.planned;
  const actual = req.body.actual;
  const timestamps = req.body.timestamps;

  const newTable = new Table({
    weekday,
    planned,
    actual,
    timestamps
  });

  newTable
    .save()
    .then(() => res.json("Table added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Table.findById(req.params.id)
    .then(table => res.json(table))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Table.findByIdAndDelete(req.params.id)
    .then(() => res.json("Table deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Table.findById(req.params.id)
    .then(table => {
      table.weekday = req.body.weekday;
      table.planned = req.body.planned;
      table.actual = req.body.actual;
      table.timestamps = req.body.timestamps;
      table
      .save()
      .then(() => res.json("Table updated!"))
      .catch(err => res.status(400).json("Error: " + err));
      })
      .catch(err => res.status(400).json("Error: " + err));
      });


module.exports = router;
