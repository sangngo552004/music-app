import {Request, Response} from "express";
import {systemConfig} from "../../config/system";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

//[GET] /admin/songs
export const index = async (req : Request, res: Response) => {
    const songs = await Song.find({
        deleted : false
    });
    
    res.render(`${systemConfig.prefixAdmin}/pages/songs/index`, {
        pageTitle : "Quản lý bài hát",
        songs : songs
    });
};

//[GET] /admin/songs/create
export const create = async (req : Request, res : Response) => {
    const singers = await Singer.find({
        deleted : false
    });
    const topics = await Topic.find({
        deleted : false
    });

    res.render(`${systemConfig.prefixAdmin}/pages/songs/create`, {
        pageTitle : "Thêm bài hát",
        singers : singers,
        topics : topics
    });
}

//[POST] /admin/songs/createPost
export const createPost = async (req : Request, res : Response) => {
    const song = new Song(req.body);
    await song.save();
    
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  
}