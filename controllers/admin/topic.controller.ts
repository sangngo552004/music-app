import {Request, Response} from "express";
import {systemConfig} from "../../config/system";
import Topic from "../../models/topic.model";

//[GET] /admin/topics
export const index = async (req : Request, res: Response) => {
    const topics = await Topic.find({
        deleted : false
    });

    res.render(`${systemConfig.prefixAdmin}/pages/topics/index`, {
        pageTitle : "Quản lý chủ đề bài hát",
        topics : topics
    });
}