const Actions = require('../../helpers/actionModel');
const Projects = require('../../helpers/projectModel');

const router = require('express').Router();

//working
router.get('/', (req, res) => {
      
      Actions.get()
      .then(actions => {
            res.status(200).json(actions);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get actions from database'});
      })
});

//POST

//working
router.get('/:id',  (req, res) => {
      Actions.get(req.params.id)
      .then(action => {
            if(id){
                  res.status(200).json(action);
            } else {
                  res.status(404).json({ message: "So that's not a thing." })
            }
      })
      .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Couldn't get that" });
      })
});

// working
router.put('/:id', async (req, res) => {
      try {
            const change = await Actions.update(req.params.id, req.body);
            if (change) {
                  res.status(200).json(change);
            } else {
                  res.status(404).json({ message: 'That action could not be found' });
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error updating the action' });
      }
});

//working
router.delete('/:id', async (req, res) => {
      try {
            const count = await Actions.remove(req.params.id);
            if (count > 0) {
                  res.status(200).json({ message: 'This action no longer exists.'});
            } else {
                  res.status(404).json({ message: 'That action could not be found'});
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error removing action' });
      }
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