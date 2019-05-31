const Actions = require('../../helpers/actionModel');
const Projects = require('../../helpers/projectModel');

const router = require('express').Router();

router.get('/', (req, res) => {
      
      Actions.get()
      .then(actions => {
            res.status(200).json(actions);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get actions from database'});
      })
});

//post route doesnt work!
router.post('/:id/project', (req, res) => {
      const newAction = req.body;
      console.log("action", req.body);
      const id = req.params.id;
      newAction.project_id = id;
      
      console.log('id', id)
      Projects.insert(newAction)
      .then(action => {
            res.status(201).json(action);
            // 201 CREATED
      })
      .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error creating a new project for that action' });
      })
});

//middlewares
// async function validateUserId(req, res, next) {
//       const user = await Actions.getById(req.params.id)
//       if (user) {
//             // console.log('user', user)
//             req.user = user
//             next();
//       } else {
//             // console.log('user', user)
//             res.status(400).json({ message: "invalid user id" })
//       }

// };

module.exports = router;