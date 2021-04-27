class RequestHandler {
    fs
    constructor() {
        const FileSystem = require('../model/file-system')
        this.fs = new FileSystem.FileSystem()
    }

    test = (req, res) => {
        // res.send(fs.getChild('root').name)
        res.send(this.fs.root.name)
        // res.send('Success')
    }

    getChildren = (req, res) => {
        const id = req.params.id
        let children = []
        if (id) {
            // valid url with non-root folder selected
            try {
                children = this.fs.getChildren(id)
            }
            catch(e) {
                if (e.id === 1) {
                    res.status(404).json({})
                }
            }
        }
        else {
            // show root
            children = [this.fs.root]
        }
        const nodes = children.map(child => {
            return {
                name: child.name,
                id: child.id
            }
        })
        res.status(200).json(nodes)
    }

    putChild = (req, res) => {
        const id = req.params.id
        const name = req.body.name
        let child
        if (id) {
            try {
                child = this.fs.addChild(id, name)
            }
            catch(e) {
                if (e.id === 1) {
                    // no item found.
                    res.status(404).json({})
                }
            }
        }
        else {
            // upload to root
            child = this.fs.addChild('root', name)
        }
        res.status(200).json(child)
    }
}

module.exports.RequestHandler = RequestHandler