const db = require("../models");
const Writing = db.writings;

// Create and Save a new Writing
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Writing
  const writing = new Writing({
    title: req.body.title,
    text: req.body.text,
    note: req.body.note,
    location: req.body.location,
    choosen: req.body.choosen ? req.body.choosen : false,
  });

  // Save Writing in the database
  writing
    .save(writing)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Writing.",
      });
    });
};

// Retrieve all Writings from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Writing.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving writings.",
      });
    });
};

// Find a single Writing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Writing.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Writing with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Writing with id=" + id });
    });
};

// Find last Writing inserted
exports.findLast = (req, res) => {
  Writing.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((data) => {
      if (!data) res.status(404).send({ message: "There is no writing in DB" });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving last Writing with id" });
    });
};

// Update a Writing by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Writing.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Writing with id=${id}. Maybe Writing was not found!`,
        });
      } else res.send({ message: "Writing was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Writing with id=" + id,
      });
    });
};

// Delete a Writing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Writing.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Writing with id=${id}. Maybe Writing was not found!`,
        });
      } else {
        res.send({
          message: "Writing was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Writing with id=" + id,
      });
    });
};

// Delete all Writings from the database.
exports.deleteAll = (req, res) => {
  Writing.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Writings were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all writings.",
      });
    });
};

// Find all published Writings
exports.findAllChoosen = (req, res) => {
  Writing.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving writings.",
      });
    });
};
