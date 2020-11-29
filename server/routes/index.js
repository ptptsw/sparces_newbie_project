import express from 'express';
import BasicInfo from '../models/basic_info.js';
import bodyParser from 'body-parser';

var router = express.Router();
router.use(bodyParser.json());

router.post('/', function(req, res){
    console.log("post router");
    BasicInfo.findOne({eventname : req.body.eventname}, (err, exists) =>{
        if (err) throw err;
        if (exists){
            return res.status(409).json({
                error : "EVENTNAME EXISTS",
                code : 3
            });
        }
        //console.log(req.body.eventname);
        let basicInfo = new BasicInfo({
            eventname : req.body.eventname
        })

        basicInfo.save(err => {
            if(err) throw err;
            return res.json({success: true});
        })

    })
});

export default router;