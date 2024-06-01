const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'openstreetmap',
};
const geocoder = NodeGeocoder(options);
async function getAddress(Latitude, Longitude) {
    try {
        const res = await geocoder.reverse({ lat: Latitude, lon: Longitude });
        return res[0].formattedAddress
    } catch (err) {
        console.log(err);
        return ""
    }
}

module.exports = getAddress
