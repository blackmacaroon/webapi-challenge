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



module.exports = router;