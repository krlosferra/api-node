module.exports = app => {
    const writings = require("../controllers/writing.controller");
  
    var router = require("express").Router();
  
    // Create a new Writing
    router.post("/", writings.create);
  
    // Retrieve all Writings
    router.get("/", writings.findAll);

    // Retrieve last Writings
    router.get("/last", writings.findLast);
  
    // Retrieve all choosen Writings
    router.get("/choosen", writings.findAllChoosen);
  
    // Retrieve a single Writing with id
    router.get("/:id", writings.findOne);
  
    // Update a Writing with id
    router.put("/:id", writings.update);
  
    // Delete a Writing with id
    router.delete("/:id", writings.delete);
  
    // Create a new Writing
    router.delete("/", writings.deleteAll);
  
    app.use("/api/writings", router);
  };