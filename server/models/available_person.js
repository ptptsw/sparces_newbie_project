import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Available = new Schema({
    eventname : String,
    all_available : [{
        nickname : String,
        available :[Date]
    }]
});

export default mongoose.model('Available', Available);