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


router.post('/', (req, res) => { 
      console.log(req.body)
      Actions.insert(req.body)
      .then(action => {
            res.status(201).json(action);
            // 201 CREATED
      })
      .catch(err => {
            res.status(500).json({ error: 'could not post new action to database'});
      })
});

router.put('/:id', async (req, res) => {
      try {
            const user = await Actions.update(req.params.id, req.body);
            if (user) {
                  res.status(200).json(user);
            } else {
                  res.status(404).json({ message: 'That action could not be found' });
            }
      } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error updating the action' });
      }
});

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