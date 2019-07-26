// apiRoutes/example.js
const router = require('express').Router()
const {CHANGETHISModelToUse} = require('../../db/models')

// matches GET requests to /api/example/
router.get('/', function(req, res, next) {
  /* etc */
})
// matches POST requests to /api/example/
router.post('/', function(req, res, next) {
  /* etc */
})
// matches PUT requests to /api/example/:exampleId
router.put('/:exampleId', function(req, res, next) {
  /* etc */
})
// matches DELETE requests to /api/example/:exampleId
router.delete('/:exampleId', function(req, res, next) {
  /* etc */
})

module.exports = router
