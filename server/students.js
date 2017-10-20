const express = require('express')
const models = require('../db/models/index')
const Student = models.Student;
const router = new express.Router();

router.get('/', function(req, res, next){
	Student.findAll({})
		.then(student => res.json(student))
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	Student.findById(req.params.id)
		.then(student => {
			if (!student) res.sendStatus(404)
			else res.json(student)
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	Student.create(req.body)
		.then((student) => res.json(student))
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	Student.findById(req.params.id)
	.then((student) => student.update(req.body))
	.then((student) => res.json(student))
	.catch(next);
})

router.delete('/:id', (req, res, next) => {
    Student.destroy({
        where: {id: req.params.id},
    })
        .then(() => res.sendStatus(204))
        .catch(next);
})

module.exports = router;
