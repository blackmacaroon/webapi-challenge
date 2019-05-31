const Project = require('../../helpers/projectModel');

const router = require('express').Router();

router.get('/', (req, res) => {
      
      Project.get()
      .then(projects => {
            res.status(200).json(projects);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get projects from database'});
      })
});

module.exports = router;