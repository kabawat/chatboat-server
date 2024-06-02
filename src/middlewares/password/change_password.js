function check_password_headers(req, res, next) {
    const headers = req.headers
    // Check if the 'IP address' header is present
    if (!headers['x-forwarded-for']) {
        return res.status(400).json({
            status: false,
            message: "IP address not provided in 'x-forwarded-for' header."
        });
    }

    // check if the "token present 
    if (!headers['x-access-token']) {
        return res.status(400).json({
            status: false,
            message: "access tokens not provided in 'x-access-tokens' header."
        });
    }

    // Check if the 'lat' header is present
    if (!headers['lat']) {
        return res.status(400).json({
            status: false,
            message: "Latitude not provided in request headers."
        });
    }

    // Check if the 'lon' header is present
    if (!headers['lon']) {
        return res.status(400).json({
            status: false,
            message: "Longitude not provided in request headers."
        });
    }
    next()
}
module.exports = check_password_headers