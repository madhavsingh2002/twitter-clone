import express from 'express';
import { deleteUser, follow, getUser, unFollow, update } from '../controllers/userData.js';
import { verifyToken } from '../Token.js';
const router =express.Router()
router.get('/',(req,res)=>{
    res.send('you are in here user router')
})
// Update User
router.put('/:id',verifyToken,update)
// Get User
router.get('/find/:id',getUser)
// delete User
router.delete("/:id", verifyToken, deleteUser);

// Follow
router.put("/follow/:id", verifyToken, follow);

// Unfollow
router.put("/unfollow/:id", verifyToken, unFollow);
export default router