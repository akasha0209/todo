const db = require('../models');
const Tutorial = db.tutorials;

//Create and save a new Tutorial
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content cannot be empty' });
    return;
  }

  //create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  //save tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'some error occurred while creating the tutorial',
      });
    });
};

//Retrieve all tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { $regs: new RegExp(title), $options: '1' } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retriving tutorials.',
      });
    });
};

//Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data) res.status(404).send({ message: 'not found with ID ' + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error Retriving Tutorial with id=' + id });
    });
};

//update a tutorial by the id in the req
exports.update = (req, res) => {
  // if (!res.body) {
  //     return res.status(400).send({
  //         message: "Data to update can not be empty!"
  //     });
  // }
  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: 'Tutorial was update successfully.' });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Tutorial with id=' + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: 'Tutorial was deleted successfully',
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Tutorial with id=' + id,
      });
    });
};

//Delete all tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deleteCount} Tutorial were deleted successfully`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'some error occured while removing all tutorials.',
      });
    });
};

//find all published tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrievind Tutorials.',
      });
    });
};
