module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js")


    var router = require("express").Router();

    //create a new tutorial
    router.post("/", tutorials.create);

    //Retriving all tutorials
    router.get("/", tutorials.findAll);

    //Retriving all published tutorials
    router.get("/published", tutorials.findAllPublished);

    //Retriving a single tutorial with id
    router.get("/:id", tutorials.findOne);

    //Update a tutorial with id
    router.put("/:id", tutorials.update);

    //delete a tutorial with id
    router.delete("/:id", tutorials.delete);

    //create a new tutorial
    router.delete("/", tutorials.deleteAll);

    app.use("/api/tutorials", router);
}; 