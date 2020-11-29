import express from 'express';
import BasicInfo from '../models/basic_info.js';
import bodyParser from 'body-parser';

var router = express.Router();
router.use(bodyParser.json());

router.post('/', function(req, res){
    console.log('datetime router');
    console.log(req.body.DateRange);
    var eventname=req.body.eventname;
    var startTime = req.body.startTime;
    var EndTime = req.body.EndTime;
    var DateRange= req.body.DateRange;
    BasicInfo.findOneAndUpdate({'eventname' : eventname},
        {$set : {'eventStartTime' : startTime, 'eventEndTime': EndTime, 'eventDateRange' : DateRange} }).exec(function(err, event){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }else{
                res.status(200).send(event);
            }
        });
});

export default router;