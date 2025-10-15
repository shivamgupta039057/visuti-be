const { Joi } = require('express-validation');

// Validation schema for Home Page details according to StudentModel
exports.studentValidation = Joi.object({
    visutiId: Joi.string().trim().optional(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().optional(),
    gender: Joi.string().trim().optional(),
    email: Joi.string().email().optional(),
    mobileNumber: Joi.number().optional(),
    password: Joi.string().optional(),
    rank: Joi.string().optional(),
    role: Joi.string().valid("student").optional(),
    counselingStatus: Joi.string().optional(),
    otp: Joi.number().optional(),
    otpExpiryDate: Joi.date().optional(),
    isActive: Joi.boolean().optional(),
    isDeleted: Joi.boolean().optional(),
});

// Validation schema for Home Page details according to HomePageDetailsModel
 
exports.bannerValidation = Joi.object({
    title: Joi.string().optional(),
    subtitle: Joi.string().optional(),
    buttonText: Joi.string().optional(),
    buttonLink: Joi.string().optional(),
    image: Joi.string().optional(),
    folderName: Joi.string().optional()
});

exports.neetFeatureValidation = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
});


exports.neetProductValidation = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    buttonText : Joi.string().optional(),
    buttonLink : Joi.string().optional(),
});

exports.abroadValidation = Joi.object({
    country: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    university: Joi.string().optional(),
    folderName: Joi.string().optional()
});

exports.homePageDetailsVal = Joi.object({
    hero: Joi.array().items(
        Joi.object({
            title: Joi.string().optional(),
            subtitle: Joi.string().optional(),
            buttonText: Joi.string().optional(),
            buttonLink: Joi.string().optional(),
            image: Joi.string().optional(),
        })
    ).optional(),
    services: Joi.array().items(
        Joi.object({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            icon: Joi.string().optional(),
        })
    ).optional(),
    news: Joi.array().items(
        Joi.object({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            date: Joi.date().optional(),
            image: Joi.string().optional(),
        })
    ).optional(),
    abroad: Joi.array().items(
        Joi.object({
            country: Joi.string().optional(),
            flag: Joi.string().optional(),
            description: Joi.string().optional(),
        })
    ).optional(),
    testimonials: Joi.array().items(
        Joi.object({
            name: Joi.string().optional(),
            role: Joi.string().optional(),
            message: Joi.string().optional(),
            image: Joi.string().optional(),
        })
    ).required(),
    stats: Joi.object({
        universities: Joi.number().optional(),
        successRate: Joi.number().optional(),
        stories: Joi.number().optional(),
        experience: Joi.number().optional(),
    }).optional(),
    lastUpdated: Joi.date().optional()
});
