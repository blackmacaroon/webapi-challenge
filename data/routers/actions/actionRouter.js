const Action = require('../../helpers/actionModel');

const router = require('express').Router();

router.get('/', (req, res) => {
      
      Action.get()
      .then(actions => {
            res.status(200).json(actions);
      })
      .catch(err => {
            res.status(500).json({ error: 'could not get actions from database'});
      })
});

module.exports = router;