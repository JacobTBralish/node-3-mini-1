
const sessions = {};
let nextSesstionId = 0

module.exports = function (req, res, next) {
    function createSession(){
        nextSesstionId++;
        const newSession = {};
        sessions[nextSesstionId] = newSession;
        res.setHeader('set-cookie', 'sessionId=' + nextSesstionId + '; path=/;')
    }

    if (req.headers.cookie) {
        const currentSessionId = req.headers.cookie.split('=')[1];
            if (sessions[currentSessionId]) {
                req.session = sessions[currentSessionId];
            } else {
                createSession();
            }


    } else {
        createSession();
    }
    next();

}