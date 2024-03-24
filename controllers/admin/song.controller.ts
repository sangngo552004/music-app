import {Request, Response} from "express";
import {systemConfig} from "../../config/system";
import Song from "../../models/song.model";

//[GET] /admin/song
export const index = async (req : Request, res: Response) => {
    const songs = await Song.find({
        deleted : false
    });
    
    res.render(`${systemConfig.prefixAdmin}/pages/songs/index`, {
        pageTitle : "Quản lý bài hát",
        songs : songs
    });
}