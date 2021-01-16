import ApiCalls from "./ApiCalls";
import IdentificationHelper from "./IdentificationHelper";

// we need to get the SERVERPID into the hard coded values


// athenticate faces with incoming value 
export async function letsSeeYourFace(GID, helperD, AthPID, con, idCompleted) {
    return new Promise((resolve, reject) => {

        var reader = new FileReader();
        var renderOnload = reader.onload = async (props) => {
            let idHelper = new IdentificationHelper();
            let facesDetected = await idHelper.Detect(helperD)
            console.log(facesDetected, "dot then")
            if (facesDetected.length === 0) {

                alert(
                    "Your account has yet been verified with Agatha"
                )
            }

            if (facesDetected.length > 0) {


                let facesIdentified = await idHelper.Identify("5595", facesDetected)
                console.log(facesIdentified, "ajidface")
                await facesIdentified.forEach(async function (con) {
                    // console.log(facesDetected, 'FD1')
                    let face = await con.candidates
                    console.log(face, 'FACE')

                    await face.forEach(async function (idCompleted) {
                        // async Authentify(personGroupId, personId, confidence)
                        // let complete = idCompleted.confidence
                        let AGPID = await idCompleted.personId
                        let confidence = await idCompleted.confidence
                        let confidenceX = await confidence * 100
                        console.log(confidenceX, 'we got the confidence ')
                        console.log(AGPID, 'InPID')


                        // if your incoming PID doesnt mach our PID then we need to loop you back to the top
                        if (AGPID !== AthPID || null) {
                            // both errors work need to make them more offical and or a propt
                            console.error('your PID is not correct', AGPID, AthPID)
                            reject(
                                "You can't have two accounts. Please send us an email using the contact button to help resolve this issue."
                            )
                        }
                        // both errors work need to make them more offical and or a propt

                        else if (confidenceX < 75.0) {
                            alert(
                                "We do not believe that this is you, please try again"
                            )
                            console.error('we do not think this is you')

                        }
                        else {
                            var allCalls = idHelper.Authentify("5595", AGPID, idCompleted.confidence)
                            alert(
                                "Thank you for signing in"
                            )
                            resolve(allCalls)

                            return { state: false }
                        }


                        // console.log(allCalls, 'candidates')
                    })

                })
            }
        }



        (async () => {

            await renderOnload()
        })()
    }
    )
};

