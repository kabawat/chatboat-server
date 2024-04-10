const userModal = require("#root/src/db/models/user")
async function get_profile(req, res) {
    try {
        let dataList = { ...req.body.user }
        if (dataList && typeof dataList === 'object') {
            // Check if password property exists before deleting
            if (dataList?._doc.hasOwnProperty('password')) {
                delete dataList?._doc.password
            }
        }

        res.status(200).json({
            data: dataList?._doc
        })
    } catch (error) {
        res.status(409).json({
            error: error.message
        })
    }
}

module.exports = get_profile