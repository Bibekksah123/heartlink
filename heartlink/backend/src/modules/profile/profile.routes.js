import express from "express"
import { profileController } from "./profile.controlers.js"
import authenticate from "../../middlewares/auth.middleware.js"

const profileRouter = express.Router()

profileRouter.use(authenticate)

profileRouter.post("/create",profileController.createProfile)
profileRouter.get( "/get", profileController.getPrfile )
profileRouter.put( "/update", profileController.updateProfile )

export default profileRouter