import {Request, Response} from "express";
import {systemConfig} from "../../config/system";

//[GET] /admin/dashboard 
export const index = async (req : Request, res: Response) => {
    res.render(`${systemConfig.prefixAdmin}/pages/dashboard/index`, {
        pageTitle : "Trang tổng quang"
    });
}