const express = require("express");
const OngController = require("../src/controllers/OngController");
const IncidentController = require("../src/controllers/IncidentController");
const ProfileController = require("../src/controllers/ProfileController");
const SessionController = require("../src/controllers/SessionController");

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.post("/incidents", IncidentController.create)
routes.get("/incidents", IncidentController.index)
routes.delete("/incidents/:id", IncidentController.delete)

routes.get("/profile", ProfileController.index)

module.exports = routes;
