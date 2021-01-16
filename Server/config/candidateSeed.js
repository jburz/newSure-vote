const mongoose = require("mongoose");
const CandidateSchema = require('../models/Candidate');

const Schema = mongoose.Schema;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/sureVote_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const candidateSeed = [
    {  
        name: "Donald J. Trump",
        party: "Republican Party",
        location: "United States",
        district: null
    },
    {  
        name: "Joseph R. Biden",
        party: "Democratic Party",
        location: "United States",
        district: null
    },
    {  
        name: "Blake Moore",
        party: "Republican Party",
        location: "Utah",
        district: "2nd District"
    },
    {  
        name: "Darren Parry",
        party: "Democratic Party",
        location: "Utah",
        district: "2nd District"
    },
    {  
        name: "Spencer Cox",
        party: "Republican Party",
        location: "Utah",
        district: null
    },
    {  
        name: "Chris Peterson",
        party: "Democratic Party",
        location: "Utah",
        district: null
    },
    {  
        name: "John Johnson",
        party: "Republican Party",
        location: "Utah",
        district: "19th Senate District"
    },
    {  
        name: "Katy Owens",
        party: "Democratic Party",
        location: "United States",
        district: "19th Senate District"
    },
    {  
        name: "Ryan Wilcox",
        party: "Republican Party",
        location: "Utah",
        district: "7th House District"
    },
    {  
        name: "Grant Protzman",
        party: "Republican Party",
        location: "United States",
        district: "7th House District"
    },
]

CandidateSchema.deleteMany()
  .then(() => CandidateSchema.collection.insertMany(candidateSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });