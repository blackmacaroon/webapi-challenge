const Actions = require('../../helpers/actionModel');

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



module.exports = router;