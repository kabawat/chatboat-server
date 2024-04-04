// extract Username from Email 
function extractUsername(email) {
    var atIndex = email.indexOf('@');
    if (atIndex !== -1) {
        var username = email.substring(0, atIndex);
        return username;
    } else {
        return email;
    }
}
module.exports = { extractUsername }