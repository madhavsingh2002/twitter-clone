import { handleError } from "../error.js";
import Tweet from "../models/TweetModel.js";
import User from "../models/UserModel.js";
export const getUser= async (req, res, next) =>{
    try{
        const user =  await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}
export const update = async(req,res,next)=>{
    if(req.params.id===req.user.id){// Here'e i am verifying req id to user id
        try{
            const updatedUser= await User.findByIdAndUpdate(req.params.id,
                {
                $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedUser);// sending updated user
        }
        catch(err){
            next(err);// error handling
        }

    }
    else{// this for when id is not matching
        return next(createError(403,'you can update only your account'))
    }
}
export const deleteUser= async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
             await User.findByIdAndDelete(req.params.id);
             await Tweet.removeAllListeners({userId:req.params.id})
             res.status(200).json('User deleted')
        }
        catch(err){
            next(err);
        }

    }
    else{
        return next(handleError(403,'you can only delete your own account'))
    }
}
export const follow = async (req, res, next) => {
    try {
      //user
      const user = await User.findById(req.params.id);
      //current user
      const currentUser = await User.findById(req.body.id);
  
      if (!user.followers.includes(req.body.id)) {
        await user.updateOne({
          $push: { followers: req.body.id },
        });
  
        await currentUser.updateOne({ $push: { following: req.params.id } });
      } else {
        res.status(403).json("you already follow this user");
      }
      res.status(200).json("following the user");
    } catch (err) {
      next(err);
    }
  };
  export const unFollow = async (req, res, next) => {
    try {
      //user
      const user = await User.findById(req.params.id);
      //current user
      const currentUser = await User.findById(req.body.id);
  
      if (currentUser.following.includes(req.params.id)) {
        await user.updateOne({
          $pull: { followers: req.body.id },
        });
  
        await currentUser.updateOne({ $pull: { following: req.params.id } });
      } else {
        res.status(403).json("you are not following this user");
      }
      res.status(200).json("unfollowing the user");
    } catch (err) {
      next(err);
    }
  };