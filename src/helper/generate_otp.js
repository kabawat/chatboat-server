function generate_otp() {
    const otpLength = 5;
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
        otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    }
    return otp
}
module.exports = { generate_otp }