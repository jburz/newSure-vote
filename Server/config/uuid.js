const { v4: newUuid, validate: uuidValidate } = require("uuid");

function generateUuid() {
    const uuid = newUuid();
    return uuid;
}

console.log(generateUuid());


module.exports = generateUuid;