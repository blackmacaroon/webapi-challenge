const Projects = require('../../helpers/projectModel');

const router = require('express').Router();

router.get('/', (req, res) => {
      
      Projects.get()
      .then(projects => {
            res.status(200).json(projects);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get projects from database'});
      })
});

router.post('/', (req, res) => { 
      console.log(req.body)
      Projects.insert(req.body)
      .then(project => {
            res.status(201).json(project);
            // 201 CREATED
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new project to database'});
      })
});



module.exports = router;