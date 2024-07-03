const { default: axios } = require('axios');
// const NodeGeocoder = require('node-geocoder');
// const options = {
//     provider: 'openstreetmap',
// };
// const geocoder = NodeGeocoder(options);

async function getAddress(latitude, longitude) {
    try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`)
        if (res) {
            return res.data.display_name;
        } else {
            return ""
        }
        // const res = await geocoder.reverse({ lat: latitude, lon: longitude });
        // if (res && res.length > 0) {
        //     return res[0].formattedAddress;
        // } else {
        //     return res.data.display_name;
        // }
    } catch (err) {
        console.error("Error in geocoding:", err.message);
        return "";
    }
}

module.exports = getAddress;
