import {Express} from "express";
import {systemConfig} from "../../config/system";
import {dashboardRoutes} from "../admin/dashboard.route";

const adminRoutes = (app : Express ) : void => {
    const prefixAdmin : string = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, dashboardRoutes);
}

export default adminRoutes;