const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ElectionSchema = new Schema({
    
    date: { type: Date, required: true},
    level: { type: String, required: true },
    type: { type: String, required: false },
    office: { type: String, required: true },
    location: { type: String, required: true },
    candidates: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' } ]

  },
);

const Election = mongoose.model("Election", ElectionSchema);

module.exports = Election;