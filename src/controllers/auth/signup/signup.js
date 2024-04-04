function signup(req, res) {
    try {
        res.status(200).json({ message: "Sign up successful" });
    } catch (error) {

    }
}
module.exports = signup