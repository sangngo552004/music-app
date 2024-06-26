import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

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
    
    const favoriteSong = await FavoriteSong.findOne({
        userId : "",
        songId : song.id
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail",{
        pageTitle : "Chi tiết bài hát",
        song : song,
        singer: singer,
        topic : topic
    });


};

//[PATCH] /songs/like/:type/:songId
export const like = async (req : Request, res : Response) => {
    const type : string = req.params.type;
    const songId : string = req.params.songId;
    const song = await Song.findOne({
        _id : songId,
        deleted : false,
        status : "active"
    });
    let updateLike : number = song.like ;
    if (type == "yes") {
        updateLike = updateLike + 1;
    }else {
        updateLike = updateLike - 1;
    }

    await Song.updateOne({
        _id : songId
    },{
        like : updateLike
    });

    res.json({
        code : 200,
        message:"Thành công!",
        like : updateLike
    });
};

//[PATCH] /songs/favorite/:type/:songId
export const favorite = async (req : Request, res : Response) => {
    const type : string = req.params.type;
    const songId : string = req.params.songId;

    if (type == "yes") {
        const existRecord = await FavoriteSong.findOne({
            userId : "",
            songId : songId,
            deleted : false
        });

        if(!existRecord) {
            const record = new FavoriteSong({
                userId : "",
                songId : songId,
            });
            await record.save();
        }
    }
    else {
        await FavoriteSong.deleteOne({
            userId : "",
            songId : songId
        });
    }
    res.json({
        code:200,
        message: "Thành công!"
    })
    
};

//[PATCH] /songs/listen/:idSong
export const listen = async (req : Request, res : Response) => {
    
        const idSong : string = req.params.idSong;
        
        const song = await Song.findOne({
            _id : idSong
        });

        const listen : number = song.listen + 1;

        await Song.updateOne({
            _id : idSong
        }, {
            listen : listen
        });

        res.json({
            code : 200,
            message : "Thành công!",
            listen : listen
        })
    
}