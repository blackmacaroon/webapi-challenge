const Projects = require('../../helpers/projectModel');
const Actions = require('../../helpers/actionModel');

const router = require('express').Router();

//working
router.get('/', (req, res) => {
      
      Projects.get()
      .then(projects => {
            res.status(200).json(projects);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get projects from database'});
      })
});

//working
router.post('/', validateProj, (req, res) => { 
      console.log(req.body)
      Projects.insert(req.body)
      .then(project => {
            res.status(201).json({message: "success"});
            // 201 CREATED
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new project to database'});
      })
});

//working
router.get('/:id',  (req, res) => {
      const id = req.params.id;
      
      Projects.get(id)
      .then(action => {
            res.status(200).json(action);
            // 201 CREATED
      })
      .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Couldn't get that project.." });
      })
});

//working
router.put('/:id', (req, res) => {
      const id = req.params.id;
      const { name, description } = req.body;
            if (! name || !description) {
                  res.status(400).json({ message: "I'm sorry the project name and description are both required."});
            } else {
                  Projects.update(id, req.body)
                  .then(project => {
                        if (project) {
                              res.status(200).json({message: "success"})
                        } else {
                              res.status(404).json({ message: 'That project could not be found' })
                        }
                  })
                  .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Error updating that project' });
                  })
            } 
});

//working
router.delete('/:id', async (req, res) => {
      try {
            const count = await Projects.remove(req.params.id);
            if (count > 0) {
                  res.status(200).json({ message: 'This project no longer exists.'})
            } else {
                  res.status(404).json({ message: 'That project could not be found'})
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error removing project' });
      }
});

//working
router.get('/:id/actions', (req, res) => {
      Projects.getProjectActions(req.params.id)
      .then(action => {
            if (action) {
                  res.status(200).json(action)
            } else {
                  res.status(404).json({ message: 'No actions found for that project'})
            }
      })
      .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'cannot get actions for that project'})
      })
});

//working
router.post('/:id/actions', (req, res) => {
      const id = req.params.id;
      const action = req.body;
      //create an action with a project-id matching the id of its project
      action.project_id = id;
      Actions.insert(action)
      .then(change => {
            res.status(201).json({message: "success"})
      })
      .catch(err => {
            res.status(500).json({ message: "could not create a new action for that project"})
      })
});


// middlewares
      //to make sure it's a valid submission
function validateProj(req, res, next) {
      //if there's no body, there's no data
      if(!req.body) {
            res.status(400).json({ message: 'missing project data' })
      //the name AND description are required
      } else if (!req.body.name || !req.body.description) {
            res.status(400).json({ message: 'sorry, name and description are both required'})
      } else {
            next()
      }
};

//doesn't work
// function validateId(req, res, next){
//       const id = Projects.get(req.body.id)
//       console.log('validate id', req.params.id)
//       if(!id) {
//             res.status(404).json({ message: 'that ID does not exist' })
//       } else {
//             next()
//       }
// }

module.exports = router;