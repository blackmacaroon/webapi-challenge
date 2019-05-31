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
      //get takes in id as an argument
      Actions.get(req.params.id)
      //if the action has an id, is exists, so return the object matching the id
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
            // update takes in arguments id and changes
            const change = await Actions.update(req.params.id, req.body);
            //if there was a change to the body, return success
            if (change) {
                  res.status(200).json({message: "success"});
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
            //remove deletes the action with the id
            const count = await Actions.remove(req.params.id);
            //if the id is a number greater than 0 (so if there is an id at all) remove and return status success
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