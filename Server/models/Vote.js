const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    
        user: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
        election: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Election' } ],
        candidate: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' } ]
      },
);

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;