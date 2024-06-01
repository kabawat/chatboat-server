const parseUserAgent = require("#root/src/services/parseUserAgent");
const getAddress = require("#root/src/services/findLocation");

async function get_request_infomation(req) {
    try {

        const headers = req.headers;
        const user_agent = headers['user-agent']
        const { lat, lon } = headers
        const deviceInfo = parseUserAgent(user_agent);
        let location = await getAddress(lat, lon);
        if (!location) {
            return null
        }
        return ({
            ip_address: headers['x-forwarded-for'],
            timestamp: headers['timestamp'],
            location: location,
            browser: deviceInfo,
        })

    } catch (error) {
        return null
    }
}

module.exports = get_request_infomation