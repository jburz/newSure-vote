import ApiCalls from "./ApiCalls";



const startTraining = e => {
    console.log("hit startTraining");
    var api = new ApiCalls();
    api.Post(api.personGroupTrainEndPoint("5595"))
        .then(rest => {
            checkTraining();
        });
    console.log("end of startTraining");
}


const checkTraining = () => {
    console.log("hit checkTraining");
    var api = new ApiCalls();
    api.Get(api.personGroupTrainingCheckEndPoint("5595"))
        .then(response => response.json())
        .then(data => {
            if (data.status === "succeeded") {
                // Don
                clearInterval(this.timer);
                this.timer = null;
                // this.setState({ showLoadingOverlay: false });
            }
        });
    console.log("end of checkTraining");
}

export { startTraining }