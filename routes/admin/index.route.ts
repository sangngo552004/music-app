import {Express} from "express";
import {systemConfig} from "../../config/system";
import {dashboardRoutes} from "../admin/dashboard.route";
import {topicRoutes} from "../admin/topic.route";
import {songRoutes} from "../admin/song.route";
import {uploadRoutes} from "../admin/upload.route";

const adminRoutes = (app : Express ) : void => {
    const prefixAdmin : string = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, dashboardRoutes);

    app.use(`/${prefixAdmin}/topics`, topicRoutes);

    app.use(`/${prefixAdmin}/songs`, songRoutes);

    app.use(`/${prefixAdmin}/upload`, uploadRoutes);
}

export default adminRoutes;