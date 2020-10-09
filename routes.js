const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  code: String,
  nombre: String,
  flag: String,
});

const Team = mongoose.model("Team", teamSchema);

module.exports = (app) => {
  app.post("/v2/teams", async (req, res) => {
    const team = new Team({
      code: req.body.code,
      nombre: req.body.nombre,
      flag: req.body.flag,
    });

    const teamExists = await Team.findOne({ code: team.code });

    if (!teamExists) {
      try {
        const newTeam = await team.save();
        res.json(newTeam);
      } catch (err) {
        res.status(500).json({ error: err });
      } finally {
        mongoose.connection.close();
      }
    } else {
      res.end("Ya existe el equipo");
    }
  });

  app.get("/v2/teams", async (res) => {
    try {
      const teams = await Team.find();
      res.status(200).json(teams);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.get("/v2/teams/:id", async (req, res) => {
    try {
      const teamId = req.params.id;
      const team = await Team.findOne({ _id: teamId });
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
};
