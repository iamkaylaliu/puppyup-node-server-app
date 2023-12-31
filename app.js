import Search from './search/routes.js';
import express from 'express';
import session from "express-session";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import "dotenv/config";
import FollowsRoutes from "./follows/routes.js";
import cors from "cors";
import LikesRoutes from './likes/routes.js';

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,

}));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING 
// || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

app.use(
  session(sessionOptions)
);

app.get('/hello', (req, res) => {
  res.send('Life is good!');
});

app.get('/', (req, res) => {
  res.send('Welcome to Full Stack Development!!!');
});
app.use(express.json());
// Create a new route for fetching an eBay item
Search(app);
UserRoutes(app);
LikesRoutes(app);
FollowsRoutes(app);
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
