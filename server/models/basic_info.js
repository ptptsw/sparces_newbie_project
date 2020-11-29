import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const BasicInfo = new Schema({
    eventname : String,
    eventDateRange : [{type : Date}],
    eventMembers : [{
        nickname: String
    }],
    eventStartTime : Number,
    eventEndTime : Number
});

export default mongoose.model('BasicInfoOfEvent', BasicInfo);