import {Express} from "express";
import {systemConfig} from "../../config/system";
import {dashboardRoutes} from "../admin/dashboard.route";
import {topicRoutes} from "../admin/topic.route";

const adminRoutes = (app : Express ) : void => {
    const prefixAdmin : string = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, dashboardRoutes);

    app.use(`/${prefixAdmin}/topics`, topicRoutes);
}

export default adminRoutes;