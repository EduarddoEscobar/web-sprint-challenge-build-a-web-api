// Write your "projects" router here!
const {Router} = require('express');
const router = Router();
const Projects = require('./projects-model');
const middleware = require('./projects-middleware');

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        }).catch(() => {
            res.status(500).json({message: "There was an error retrieving projects from the database"});
        })
})

router.get('/:id', middleware.isValidProjectId, (req, res) => {
    res.status(200).json(req.project);
})

router.post('/', middleware.isValidProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        }).catch(() => {
            res.status(500).json({message: "The project was not able to be saved to the database"});
        })
})

router.put('/:id', [middleware.isValidProjectId, middleware.isValidProject], (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        }).catch(() => {
            res.status(500).json({message: "The project was unable to be modified"});
        })
})

router.delete('/:id', middleware.isValidProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json();
        }).catch(() => {
            res.status(500).json({message: "The project was unable to be deleted"});
        })
})

router.get('/:id/actions', middleware.isValidProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        }).catch(() => {
            res.status(500).json({message: "There was an error retrieving the actions for the project"});
        })
})

module.exports = router;