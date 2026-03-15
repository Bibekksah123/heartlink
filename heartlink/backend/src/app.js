import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import userRouter from "./modules/user/user.route.js";
import profileRouter from "./modules/profile/profile.routes.js";
import chatRouter from "./modules/chat/chat.route.js";
import connectionRouter from "./modules/connection/connection.route.js";
import { globalErrorHandler, notFoundHandler } from "./middlewares/error.middleware.js";


const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );



const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Only 5 authentication attempts per 10 minutes
  message: {
    error: "Too many authentication attempts",
    retryAfter: "10 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins against the limit
});


app.get( "/", ( req, res ) => {
  res.send( "Welcome to the HeartLink API!" );
  
} )

app.use( "/api/auth/user", authLimiter, userRouter )
app.use("/api/user/profile",profileRouter)
app.use( "/api/chat", chatRouter )
app.use("/api/connection",connectionRouter)


app.use(notFoundHandler);   
app.use( globalErrorHandler );

export default app;