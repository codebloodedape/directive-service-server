const FileSystem = require('../model/file-system').FileSystem
const ServerState = require('./auth').ServerState

const init = (req, res) => {
    try {
        ServerState.users[req.token].fs = new FileSystem()
    }
    catch (e) {
        console.log(e)
        res.status(500).json('server error')
    }
}

const putFolder = (req, res) => {
    try {
        const token = req.headers.token
        const fs = ServerState.users[token].fs
        const name = req.body.folderRequest.name
        const parentId = req.body.folderRequest.parentId
        let child
        if (parentId) {
            try {
                child = fs.addChild(parentId, name)
            }
            catch (e) {
                if (e.id === 1) {
                    res.status(400).json('parentId cannot be empty')
                }
            }
        }
        else {
            res.status(400).json('parentId cannot be empty')
        }
        res.status(200).json(child)
    }
    catch (e) {
        console.log(e)
        res.status(500).json('server error')
    }
}

const getFolder = (req, res) => {
    try {
        const token = req.headers.token
        const fs = ServerState.users[token].fs
        const id = req.params.id
        const node = fs.getFolder(id)
        const folder = {
            id: node.id,
            name: node.name,
            children: [...node.children].map(child => {
                return {
                    id: child.id, 
                    name:child.name
                }
            })
        }
        res.status(200).json(folder)
    }
    catch (e) {
        console.log(e)
        res.status(500).json('server error')
    }
}

const updateFolder = (req, res) => {
    try {
        const token = req.headers.token
        const fs = ServerState.users[token].fs
        const folderRequest = req.body.folderRequest
        // const node = fs.updateFolder(req.body.params.id, folderRequest)
        let node
        if (folderRequest) {
            try {
                node = fs.updateFolder(req.params.id, folderRequest)
            }
            catch (e) {
                if (e.id === 1) {
                    res.status(400).json('Request body cannot be empty')
                }
            }
        }
        else {
            res.status(400).json('Request body cannot be empty')
        }
        res.status(200).json(node)
    }
    catch (e) {
        console.log(e)
        res.status(500).json('server error')
    }
}

const deleteFolder = (req, res) => {
    try {
        const token = req.headers.token
        const fs = ServerState.users[token].fs
        const id = req.params.id
        // TODO remove below param and use id above to get parent
        const parentId = req.body.folderRequest.parentId
        let child
        if (parentId) {
            try {
                child = fs.deleteChild(parentId, id)
            }
            catch (e) {
                if (e.id === 1) {
                    res.status(400).json('parentId cannot be empty')
                }
            }
        }
        else {
            res.status(400).json('parentId cannot be empty')
        }
        res.status(200).json(child)
    }
    catch (e) {
        console.log(e)
        res.status(500).json('server error')
    }
}

module.exports = {
    init,
    // unauthenticateGuest
    putFolder,
    getFolder,
    updateFolder,
    deleteFolder
}