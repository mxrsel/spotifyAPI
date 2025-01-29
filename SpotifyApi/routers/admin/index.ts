import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import {albumAdminRouter} from "./albumRouter";
import {artistAdminRouter} from "./artistRouter";
import {compositionAdminRouter} from "./compositionRouter";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));
adminRouter.use('/albums', albumAdminRouter);
adminRouter.use('/artists', artistAdminRouter);
adminRouter.use('/compositions', compositionAdminRouter);

export default adminRouter