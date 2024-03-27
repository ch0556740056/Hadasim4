const express=require('express');
const router=express.Router();

const{
    getAllUsers,
    createNewUser,
    getUser,
    updateUser,
    deleteUser
}=require('../controllers/users');

router.get('/',getAllUsers)
router.post('/',createNewUser)
router.get('/:tz',getUser)
router.patch('/:tz',updateUser)
router.delete('/:tz',deleteUser)

module.exports=router; 