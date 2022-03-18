// Import Dependencies
const express = require('express')
const Superhero = require('../models/superhero')
const fetch = require('node-fetch')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })

// Routes

// index ALL
router.get('/', (req, res) => {
	// Example.find({})
	// 	.then(examples => {
	// 		const username = req.session.username
	// 		const loggedIn = req.session.loggedIn
			
	// 		res.render('examples/index', { examples, username, loggedIn })
	// 	})
	fetch('https://akabab.github.io/superhero-api/api/all.json')
		.then((responseData) => {
			console.log(responseData)
			// return responseData
			return responseData.json()
			// res.send(responseData)
		})
		.then((jsonData) => {
			console.log(jsonData)
			// res.send(jsonData)
			res.render('superhero/index', { superheroes: jsonData })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route -> index that shows the superhero selected
router.get('/:id', (req, res) => {
	console.log('PARAMS', req.params.id)
	fetch(`https://akabab.github.io/superhero-api/api/id/${req.params.id}.json`)
		.then(jsonData => {
			const superhero = jsonData.json()
		.then(superhero => {
				console.log('LOOK AT THIS', superhero)
				res.render('superhero/show', { superhero: superhero })
			})
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('examples/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false
	// create form with type submit that has a value of favorite
	// in that form use hidden inputs with values of the api info that I want to save
	// that form info is available in req.body
	req.body.owner = req.session.userId
	console.log('req.body', req.body)
	Superhero.create(req.body)
		.then(superhero => {
			res.render('superhero/favorite')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const superId = req.params.id
	Superhero.findById(superId)
		.then(superhero => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			res.render('superhero/edit', { superhero, username, loggedIn})
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	Superhero.findByIdAndUpdate(superId)
		.then(superhero => {
			console.log('the updated superhero', superhero)
			res.redirect('superhero/index')
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})



// delete route
// router.delete('/:id', (req, res) => {
// 	fetch(`https://akabab.github.io/superhero-api/api/id/${req.params.id}.json`)
// 		.then(superhero => {
// 			res.redirect('/superheroapp')
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// Export the Router
module.exports = router
