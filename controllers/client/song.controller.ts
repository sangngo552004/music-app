import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

//[GET] /songs/:slugTopic
export const list = async (req : Request, res : Response) => {
    const slugTopic : string = req.params.slugTopic;
    const topic = await Topic.findOne({
        slug : slugTopic,
        deleted : false,
        status : "active"
    }).select("id");

    const songs = await Song.find({
        topicId : topic.id,
        deleted : false,
        status : "active"
    }).select("title avatar singerId like slug");

    for(const song of songs) {
        const infoSinger = await Singer.findOne({
            _id : song.singerId,
            deleted : false
        }).select("fullName");

        song["infoSinger"] = infoSinger
    }

    res.render("client/pages/songs/list", {
        pageTitle : "Danh sách bài hát",
        songs : songs
    });
};

//[GET] /songs/detail/:slugSong
export const detail = async (req : Request, res : Response) => {
    const slugSong : string = req.params.slugSong;
    const song = await Song.findOne({
        slug : slugSong,
        deleted : false,
        status : "active"
    });
    const singer = await Singer.findOne({
        _id : song.singerId,
        deleted : false
    }).select("fullName");
    
    const topic = await Topic.findOne({
        _id : song.topicId,
        deleted : false
    }).select("title");
    
    res.render("client/pages/songs/detail",{
        pageTitle : "Chi tiết bài hát",
        song : song,
        singer: singer,
        topic : topic
    });


};