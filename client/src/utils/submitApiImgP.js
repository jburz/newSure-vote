import ApiCalls from "./ApiCalls";

export async function submitToAgatha(personGroupId, personId, image, cb) {
    var reader = new FileReader();
    reader.onload = () => {
        var api = new ApiCalls();
        api.PostImage(api.personPictureEndPoint(personGroupId, personId), reader.result)
            .then(cb)


    };
    reader.readAsArrayBuffer(image);
};

// try { submitToAgatha("5595", personId, reader.result) }
// catch (e) {
//     if (e.personId === []) {
//         console.error(e.personId + ': ' + e.message)
//     } else if (e instanceof RangeError) {
//         console.error(e.name + ': ' + e.message)
//     }
//     // ... etc
// }

