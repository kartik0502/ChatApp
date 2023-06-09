const User = require('../models/authModel');
const messageModel = require('../models/messageModel');
const formidable = require('formidable');
const fs = require('fs');

module.exports.getFriends = async (req, res) => {
    const myId = req.myId;
    try {
        const friendGet = await User.find({});
        const filter = friendGet.filter((d) => d._id.toString() !== myId);
        res.status(200).json({ success: true, friends: filter });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

module.exports.messageUploadDB = async (req, res) => {
    const {sender, receiver, message} = req.body;

    try {
        const insertMessage = await messageModel.create({
            senderId : sender,
            receiverId : receiver,
            message : {
                text : message,
                image : '',
            }
        });
        res.status(200).json({success : true, message : insertMessage});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error : {
                errorMessage : 'Server error'
            }
        });
    }
}

module.exports.messageGet = async (req, res) => {
    const myId = req.myId;
    const fdId = req.params.id;

    try {
        let getAllMessage = await messageModel.find({
        })

        getAllMessage = getAllMessage.filter((m) => {
            return(
                m.senderId === myId.toString() && m.receiverId=== fdId.toString() || m.senderId.toString() === fdId && m.receiverId.toString() === myId
            )
        })
        res.status(200).json({success : true, message : getAllMessage});

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error : {
                errorMessage : 'Server error'
            }
        });
    }
}

module.exports.sendImage = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        const { sender, receiver, imageName } = fields;
        const { image } = files;

        const newPath = `${__dirname}/../../frontend/public/image/${imageName}`;
        files.image.originalFilename = imageName;

        try {
            fs.copyFile(files.image.filepath, newPath, async (err) => {
                if(err){
                    res.status(500).json({
                        error : {
                            errorMessage : 'Image upload failed!'
                        }
                    });
                }
                else{
                    const insertMessage = await messageModel.create({
                        senderId : sender,
                        receiverId : receiver,
                        message : {
                            text : '',
                            image : files.image.originalFilename,
                        }
                    });
                    res.status(200).json({success : true, message : insertMessage});
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                error : {
                    errorMessage : 'Server error!'
                }
            });
        }
    })
}
