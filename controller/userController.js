import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import job from "../models/job.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { formatImgae } from "../middleware/multer.js";

export const getCurrentUser = async (req, res) => {
  const currentUser = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = currentUser.toJson();
  res.status(StatusCodes.OK).json({
    currentUser: userWithoutPassword
  })
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await job.countDocuments();
  res.status(StatusCodes.OK).json({
    users,
    jobs
  });
};

export const updateUser = async (req, res) => {
  if (req.file) {
    const file = formatImgae(req.file);
    const cloudData = await cloudinary.v2.uploader.upload(file);
    req.body.avatar = cloudData.secure_url;
    req.body.avatarPublicId = cloudData.public_id;
  }
  const oldUser = await User.findByIdAndUpdate(req.user.userId, req.body);
  if (req.file && oldUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({
    message: 'User updated',
  });
};
