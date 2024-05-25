const messages = [
    "Hi! How's it going?",
    "Hello! What's up?",
    "Hey! How have you been?",
    "Hi there! How's life treating you?",
    "Hello! How are things?",
    "Hey! How's your day going?",
    "Hi! How's everything?",
    "Hello! How's your week so far?",
    "Hey! How's your day been?",
    "Hi! What have you been up to?",
    "Hello! How's your morning?",
    "Hey! How are you doing today?",
    "Hi! How are things with you?",
    "Hello! How's your evening going?",
    "Hey! How's your day shaping up?",
    "Hi! What's new with you?",
    "Hello! How have things been?",
    "Hey! How's your afternoon?",
    "Hi! How's your week going?",
    "Hello! How are you feeling today?"
];


function defaultMessageHandle(req, res) {
    try {
        const getRandomIndex = () => Math.floor(Math.random() * messages.length);
        let index1 = getRandomIndex();
        let index2 = getRandomIndex();

        // Ensure the two indexes are different
        while (index1 === index2) {
            index2 = getRandomIndex();
        }

        res.status(200).json({
            status: true,
            message: [messages[index1], messages[index2]]

        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
module.exports = defaultMessageHandle