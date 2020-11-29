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

router.post('/:eventname/:nickname', wrap(async(req,res, next) =>{
        console.log("available router");
        var _eventname = req.params.eventname;
        var _nickname = req.params.nickname;
        var _available = req.body.available;
        //console.log(_eventname);
        ///console.log(_nickname);
        //console.log(_available);
        const eventname_query = {eventname : _eventname}
        const eventname_exists = await Available.findOne(eventname_query);
        const item= {"nickname" : _nickname, "available" : _available}
        console.log(item);
        console.log(eventname_exists);

        if(eventname_exists){
            console.log("eventname exists!")
            const nickname_exists = await Available.findOne({all_available : {$elemMatch : {nickname : _nickname}}});
            console.log(nickname_exists);
            if(!nickname_exists){
                console.log("no nickname");
                Available.updateOne(eventname_query, {$push : {all_available : item}}, function(err, docs){
                    if(err) console.log(err);
                    console.log("hoho");
                })
            }else{
                //nickname 있으면 새로운 available 로 update

            }
        }else{
            console.log("there is no such eventname");
            
            const _Available = new Available({
                eventname : _eventname,
                all_available : item
            });
            
            await _Available.save();

            // await _Available.findOneAndUpdate(eventname_query,
            //     {$push : {all_available : item}},
            //     {new : true}
            //     ).exec()
            //     .then(function(data){
            //         console.log(JSON.stringify(data))
            //     })
            //     .catch(next);

            

            // _Available.updateOne(eventname_query, {$push : {all_available : item}}, function(err, docs){
            //     if(err) console.log(err);
            //     console.log("availbe updated success");
            //     console.log(docs);
            //     console.log("hoho");
            // })

            // await _Available.save();


        
            

            // _Available.findOne(eventname_query, function(err, user){
            //     if (err) console.log(err);
            //     user.all_available.push(item);
            // })
            // _Available.all_available.push(item);
            // _Available.save(function(err){
            //     if(err) console.log(err);
            //     console.log("SUccess!")
            // })

            // const docs = await _Available.findOne(eventname_query, {$push : {all_available : item}});
            // docs.all_available = item;
            // await docs.save();

            // _Available.updateOne(eventname_query, {$push : {all_available : item}}, function(err, docs){
            //     if(err) console.log(err);
            //     console.log("availbe updated success");
            //     console.log(docs);
            //     console.log("hoho");
            // })
            // await _Available.save();
        }
    }))

    

    // Available.findOne({eventname : _eventname}, (err,exists)=>{
    //     if(err) throw err;
    //     if(exists){
    //         console.log("exists!");
    //         return;
    //     }else{
            
            
            
    //     }
    //     console.log("availble end")     
    // })



//let _Available = new Available({
    //     eventname : _eventname,
    //     nickname : _nickname
    // })
    // _Available.updateOne({eventname : _eventname}, {all_availabe :[{nickname : _nickname, available : _available}] }, function(err, docs){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("UPdated Docs : ", docs);
    //         _Available.save(err => {
    //             if(err) throw err;
    //             return res.json({success: true});
    //         })

    //     }
    // })

export default router;
