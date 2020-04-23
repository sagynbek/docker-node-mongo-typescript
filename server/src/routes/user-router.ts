import { Router } from 'express'
import User from '../models/User.model';
import ResourceAlreadyExistsError from '../exceptions/ResourceAlreadyExistsError';

const userRouter = Router();



userRouter.get('/', async (req, res, next) => {
  User.find()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      next(err);
    })
})

userRouter.post('/', async (req, res, next) => {
  const { username } = req.body;

  User.find({
    username
  }, (err, users) => {
    if (err) { next(err); }

    if (users.length > 0) {
      return next(new ResourceAlreadyExistsError);
    }

    const user = new User({
      username,
    })

    user.save()
      .then(() => {
        return res.status(201).json({
          status: "Created"
        })
      })
      .catch((err) => {
        return next(err);
      })
  })

})


export default userRouter;