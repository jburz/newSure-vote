const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema(
  {  
    name: { type: String, required: true },
    party: { type: String, required: true },
    location: { type: String, required: true },
    district: { type: String, required: false },
  },
);

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;