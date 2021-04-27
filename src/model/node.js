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
}
module.exports.Node = Node