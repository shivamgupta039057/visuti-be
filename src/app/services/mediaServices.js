const axios = require("axios");
const Lead = require("../../pgModels/lead");
const WhatsappChat = require("../../pgModels/whatsapp/WhatsappChat");
const WhatsappMessage = require("../../pgModels/whatsapp/WhatsappMessage");
const MediaLibrary = require("../../pgModels/MediaLibrary");




exports.uploadMedia = async (body) => {
  try {
    console.log("ddddddddddddddbodybodybodybodybodybodybodybody" , body);
    ddddd
    // Create a new banner according to the BannerModel schema
    const file = req.file;

    const media = await MediaLibrary.create({
      original_name: file.originalname,
      file_name: file.filename,
      media_type: getMediaType(file.mimetype),
      mime_type: file.mimetype,
      file_size: file.size,
      file_url: `/uploads/${file.filename}`,
      uploaded_by: req.user?.id || null,
    });

    return {
      statusCode: statusCode.OK,
      success: true,
      message: resMessage.Add_Banner_Data || "Banner added successfully",
      data: newBanner,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};





