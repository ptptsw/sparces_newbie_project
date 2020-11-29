import express from 'express';
import BasicInfo from '../models/basic_info.js';
import bodyParser from 'body-parser';

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
    console.log("geteventinfo router");
    var _eventname = req.params.eventname;
    // BasicInfo.findOne({eventname : _eventname},function(err, docs){
    //             if(err){
    //                 res.send(err);
    //             }else{
    //                 console.log(docs);
    //                 res.send(docs);
    //             }
    //         })
    const docs = await BasicInfo.findOne({eventname : _eventname});
    console.log(docs);
    await res.send(docs);
}));

export default router;