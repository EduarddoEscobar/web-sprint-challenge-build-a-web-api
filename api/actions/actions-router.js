// Write your "actions" router here!
const {Router} = require('express');
const router = Router();
const Actions = require('./actions-model');
const middleware = require('./actions-middleware');

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        }).catch(() => {
            res.status(500).json({message: "There was an error retrieving the actions from the database"});
        })
})

router.get('/:id', middleware.validateActionId,(req,res) => {
    res.status(200).json(req.action);
})

router.post('/', middleware.validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        }).catch(() => {
            res.status(500).json({message: "There was an error saving the action to the database"});
        })
})

router.put('/:id', [middleware.validateActionId, middleware.validateAction], (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        }).catch(() => {
            res.status(500).json({message: "The action was unable to be modified"});
        })
})

router.delete('/:id', middleware.validateActionId, (req, res) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json();
        }).catch(() => {
            res.status(500).json({message: "The action could not be deleted"});
        })
    
})

module.exports = router;
