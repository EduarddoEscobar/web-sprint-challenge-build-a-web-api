// add middlewares here related to actions
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if(action){
                req.action = action;
                next();
            }else{
                res.status(404).json({ message: 'Action with specified ID was not found' });
            }
        }).catch(() => {
            res.status(500).json({ message: 'There was an error retrieving the action from the database'});
        })
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if(project_id, description, notes){
        Projects.get(project_id)
        .then(project => {
            if(project){
                next();
            }else{
                res.status(404).json({ message: 'Project with specified ID was not found' });
            }
        })
    }else{
        res.status(400).json({ message: 'Please fill out all required fields'});
    }
}

module.exports = {
    validateActionId,
    validateAction,
}