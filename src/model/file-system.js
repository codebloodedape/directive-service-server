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

    addChild(parentId, name) {
        const parentNode = this.searchRecursively(parentId, this.root)
        return parentNode.addChild(name)
    }

    getChildren(id) {
        return this.getNode(id).children
    }

    getNode(id) {
        const node = this.searchRecursively(id, this.root)
        if (node) {
            return node
        }
        throw {
            id: 1
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
}

module.exports.FileSystem = FileSystem