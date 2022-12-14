import "reflect-metadata"
import express, { Request, Response } from "express"
import { container } from "tsyringe"
import { UserController } from "../controllers/user.controller"
import { uploadAvatar } from "../utils/multer"

const userRouter = express()
const user = container.resolve(UserController)

userRouter
  .route("/api/v1/user/:username")
  .get((req: Request, res: Response) => user.getProfile(req, res))

userRouter
  .route("/api/v1/validate")
  .get((req: Request, res: Response) => user.validateUser(req, res))

userRouter
  .route("/api/v1/user")
  .post((req: Request, res: Response) => user.createUser(req, res))

userRouter
  .route("/api/v1/user/token")
  .post((req: Request, res: Response) => user.getToken(req, res))

userRouter
  .route("/api/v1/user")
  .put(uploadAvatar, (req: Request, res: Response) => user.updateUser(req, res))

userRouter
  .route("/api/v1/user/:id")
  .delete((req: Request, res: Response) => user.deleteUser(req, res))

export default userRouter
