const router = require('express').Router()
module.exports = router
/*
Your routes go here!
NOTE: Any routes that you put here are ALREADY mounted on `/api`
You can put all routes in this file HOWEVER,
this file should almost be like a table of contents for the routers you create!
For example:

For your `/api/routes/puppies` routes:
router.use('/puppies', require('./routes/puppies'))
*/

router.use('/users', require('./routes/users'))
router.use('/example', require('./routes/example'))

/*
If someone makes a request that starts with `/api`,
but you DON'T have a corresponding router, this piece of
middleware will generate a 404, and send it to your
error-handling endware!
*/

router.use((req, res, next) => {
  const error = new Error('Not found.')
  error.status = 404
  next(error)
})
