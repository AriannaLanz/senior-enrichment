const express = require('express')
const Campus = require('../db/models/index').Campus;
const Student = require('../db/models/index').Student;

const router = new express.Router();

router.get('/', function(req, res, next){
	Campus.findAll({
		include: [
			{ model: Student },
			],
	})
		.then(campuses => res.json(campuses))
		.catch(next)
})

router.get('/:id', function(req, res, next){
	Campus.findById(req.params.id, {
		include: [
			{ model: Student},
		],
	})
		.then(campus => {
			if (!campus) res.sendStatus(404)
			else res.json(campus)
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	Campus.create(req.body)
		.then((campus) => res.json(campus))
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	Campus.findById(req.params.id)
	.then((campus) => campus.update(req.body))
	.then((campus) => res.json(campus))
	.catch(next);
})

router.delete('/:id', (req, res, next) => {
    Campus.destroy({
        where: {id: req.params.id},
    })
        .then(() => res.sendStatus(204))
        .catch(next);
})

module.exports = router;
