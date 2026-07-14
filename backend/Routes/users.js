import express from 'express'
import { User } from '../Models/User.js'
const router = express.Router()



// GET /api/users — get all
router.get('/', async (req, res) => {
 const users = await User.find()

  //   const users = [
//   {
//     "id": 1,
//     "name": "Ali Khan",
//     "email": "ali@example.com",
//     "age": 22
//   },
//   {
//     "id": 2,
//     "name": "Sara Ahmed",
//     "email": "sara@example.com",
//     "age": 24
//   },
//   {
//     "id": 3,
//     "name": "Usman Malik",
//     "email": "usman@example.com",
//     "age": 21
//   }
// ]
  res.json(users)
})


// POST /api/users — create
router.post('/', async (req, res) => {
  const user = await User.create(req.body)
    //console.log(req.body)

  res.status(201).json(req.body)
})


// PUT /api/users/:id — update
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(user)
})

// DELETE /api/users/:id — delete
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})


export default router
