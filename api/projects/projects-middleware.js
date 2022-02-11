// add middlewares here related to projects
const Projects = require('./projects-model');

function isValidProjectId(req, res, next) {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if(project){
                req.project = project;
                next();
            }else{
                res.status(404).json({ message: 'Project with specific ID was not found' });
            }
        })
}

function isValidProject(req, res, next) {
    const { name, description } = req.body;
    if(name && description){
        next();
    }else{
        res.status(400).json({ message: 'Please fill out the name and description fields'});
    }
}

module.exports = {
    isValidProjectId,
    isValidProject,
};