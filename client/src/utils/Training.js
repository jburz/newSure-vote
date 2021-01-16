import ApiCalls from "./ApiCalls";



export function trainingStart(incomingp) {
    var api = new ApiCalls();
    api.Post(api.personGroupTrainEndPoint("5595"))
        .then()
}