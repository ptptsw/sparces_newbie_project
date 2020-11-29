import express from 'express';
import BasicInfo from '../models/basic_info.js';
import bodyParser from 'body-parser';

var router = express.Router();
router.use(bodyParser.json());

router.post('/', function(req, res){
    console.log("nickname router");
    console.log(req.body);
    console.log(req.body.nickname);
    var eventname = req.body.eventname;
    var nickname =req.body.nickname;
    //1.eventname과 일치하는 doc 찾기
    //2. 찾은 doc에 nickname 없으면 eventMembers에 nickname : _nickname 추가
    //3. 있으면 정보 불러오기
    BasicInfo.findOne({'eventname' : eventname},function(err, docs){
        if(err){
            res.send(err);
        }else{
            if (!docs.eventMembers.includes(nickname)){
                console.log(nickname);
                docs.eventMembers.push({'nickname':nickname});
                docs.save(err => {
                    if(err) throw err;
                    console.log(docs);
                    return res.json({success: true});
                })

            }else{
                res.status(200).send(docs);
            } 
            //console.log(docs.eventMembers);
        }
    })

})

export default router;