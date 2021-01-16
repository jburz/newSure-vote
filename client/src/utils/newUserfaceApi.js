// this is built right now on click create a new PID (personID) in this case the Groupe ID has been hard Coded
import ApiCalls from "./ApiCalls";
const axios = require('axios')

export async function newUserApi(Gid, newPnam, cb) {
    // GID is "5595"
    let body = {
        name: "class demo",
        picture: "",
        userData: "1234",
    };
    var api = new ApiCalls();
    var results = await api.Post(api.personsEndPoint("5595"), body).then((res) => res.json())
    // const res = await axios.update('')
    console.log(results, "aj results")
    // results are the Person ID that we need to send to our DB
    return results
};

