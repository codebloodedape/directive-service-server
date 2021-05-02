// import Node from './node'

class FileSystem {
    // Node = require('../model/file-system').Node
    root
    constructor(root = null) {
        if (root)
            this.root = root
        else {
            const Node = require('../model/node')
            this.root = new Node.Node('root', true)
        }
    }

    searchRecursively = (id, node) => {
        if (node.id === id) {
            return node
        }
        if (node.children.length > 0) {
            for (const child of node.children) {
                const res = this.searchRecursively(id, child)
                if (res === null)
                    continue
                else {
                    return res
                }
            }
        }
        return null
    }

    getFolder(id) {
        return this.searchRecursively(id, this.root)
    }

    updateFolder(id, folderRequest) {
        const node = this.searchRecursively(id, this.root)
        if (node) {
            return node.updateNode(folderRequest)
        }
        throw {
            id: 1
        }
    }

    getChildren(id) {
        const node = this.searchRecursively(id, this.root)
        if (node) {
            return node.children
        }
        throw {
            id: 1
        }
    }

    addChild(parentId, name) {
        const parentNode = this.searchRecursively(parentId, this.root)
        if (parentNode) {
            return parentNode.addChild(name)
        }
        throw {
            id: 1
        }
    }

    deleteChild(parentId, id) {
        const parentNode = this.searchRecursively(parentId, this.root)
        if (parentNode) {
            return parentNode.deleteChild(id)
        }
        throw {
            id: 1
        }
    }

    rename(id, name) {
        const node = this.searchRecursively(parentId, this.root)
        if (node) {
            node.rename(name)
            return true
        }
        throw {
            id: 1
        }
    }

}

module.exports = { FileSystem }