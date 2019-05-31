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

router.post('/', validateProj, (req, res) => { 
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

router.get('/:id', validateId, (req, res) => {
      Projects.getProjectActions(req.params.id)
      .then(project => {
            res.status(200).json(project);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get project from database'});
      })
});

router.put('/:id', async (req, res) => {
      try {
            const project = await Projects.update(req.params.id, req.body);
            if (project) {
                  res.status(200).json(project);
            } else {
                  res.status(404).json({ message: 'That project could not be found' });
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error updating that project' });
      }
});

router.delete('/:id', async (req, res) => {
      try {
            const count = await Projects.remove(req.params.id);
            if (count > 0) {
                  res.status(200).json({ message: 'This project no longer exists.'});
            } else {
                  res.status(404).json({ message: 'That project could not be found'});
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error removing project' });
      }
});

//middlewares
function validateProj(req, res, next) {
      if(!req.body) {
            res.status(400).json({ message: 'missing project data' })
      } else if (!req.body.name) {
            res.status(400).json({ message: 'missing required name field'})
      } else {
            next()
      }
};

function validateId(req, res, next){
      const id = Projects.get(req.params.id)
      if(!id) {
            res.status(404).json({ message: 'that ID does not exist' })
      } else {
            next()
      }
}

module.exports = router;