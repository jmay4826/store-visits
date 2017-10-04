module.exports = {
  getLocations(req, res) {
    const db = req.app.get('db');
    db.getLocations(1).then(response => res.send(response));
  },
  getLocation(req, res) {
    const db = req.app.get('db');
    db.getLocation(req.params.id).then(response => res.send(response));
  },
  addLocation(req, res) {
    const db = req.app.get('db');
    db.addLocation().then(response => res.send(response));
  },
  getComments(req, res) {
    const db = req.app.get('db');
    db.getComments(req.params.id).then(response => res.send(response));
  },
};
