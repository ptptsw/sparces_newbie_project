import express from 'express';
import bodyParser from 'body-parser';
import Available from '../models/available_person.js';

var router = express.Router();
router.use(bodyParser.json());


const wrap = asyncFn => {
    return(async (req, res, next) =>{
        try{
            return await asyncFn(req, res, next)
        }catch (error){
            return next(error)
        }
    })
}

router.get('/:eventname/:nickname', wrap(async(req,res,next)=>{
    console.log("getavailable router");
    var _eventname = req.params.eventname;
    var _nickname = req.params.nickname;
}))

export default router;