const SESSION_TIMEOUT = 900 * 1000 // 15 mins of inactivity will expire the session

class ServerState {
    static users = {}
    static userCount = 0
}

// const authenticateGuest = (req, res) => {
//     try {
//         if (ServerState.userCount === 20) {
//             res.status(403).json('server overload')
//         }
//         const username = req.body.username
//         if (!username) {
//             res.status(403).json('no username')
//         }
//         const token = Date.now().toString() + '_' + username
//         ServerState.users[token] = {}
//         resetSession(token)
//         // ServerState.users[token].fs = new FileSystem.FileSystem()
//         // ServerState.userCount++
//         // res.status(200).json({ token })
//     }
//     catch (e) {
//         console.error(e)
//         res.status(500).json(e.message ? e.message : 'unknown error')
//     }
// }

// const unauthenticateGuest = (req, res) => {
//     try {
//         const token = req.headers.token
//         delete ServerState[token];
//         res.status(200).json({ token })
//     }
//     catch (e) {
//         console.error(e)
//         res.status(500).json(e.message ? e.message : 'unknown error')
//     }
// }

const authenticateRequest = function (req, res, next) {
    const reqPath = req.path.toUpperCase()
    let token
    switch (reqPath) {
        case '/LOGIN':
            if (ServerState.userCount === 20) {
                res.status(403).json('server overload')
            }
            const userName = req.headers.username
            if (!userName) {
                res.status(403).json('no username')
            }
            token = Date.now().toString() + '_' + userName
            ServerState.users[token] = {}
            resetSession(token)
            req.token = token
            ServerState.userCount++
            res.status(200).json({ token })
            break
        case '/LOGOUT':
            break
        default:
            token = req.headers.token
            if (!ServerState.users[token]) {
                res.status(403).json('session timeout')
                return
            }
            resetSession(token)
            break
    }
    next()
}


const resetSession = (token) => {
    if (ServerState.users[token].timer)
        clearTimeout(ServerState.users[token].timer)
    ServerState.users[token].timer = setTimeout(() => { logout(token) }, (SESSION_TIMEOUT))
}

const logout = (token) => {
    console.log("logging out...")
    delete ServerState.users[token]
    ServerState.userCount--
}

module.exports = {
    ServerState,
    authenticateRequest,
    // authenticateGuest,
    // unauthenticateGuest
}