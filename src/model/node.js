class Node {
    children
    name
    id
    
    constructor(name = '', isRoot = false) {
        // this.id = Date.now()
        this.children = []
        this.name = name
        if (isRoot) {
            this.id = 'root'
        }
        else {
            this.id = Date.now().toString()
        }
    }

    addChild(name) {
        const node = new Node(name)
        this.children.push(node)
        return node
        // return this.children.push(new Node(name))
    }

    updateNode(folderRequest) {
        // this.children = [...folderRequest.children]
        this.name = folderRequest.name
        return this
    }

    deleteChild(id) {
        let index = -1
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].id === id) {
                index = i
                break
            }
        }
        if (index !== -1) {
            return this.children.splice(index, 1)[0]
        }
        return null
    }

    rename(name) {
        this.name = name
    }
}
module.exports.Node = Node