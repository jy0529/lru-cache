class Node {
    key: number;
    value: number;
    prev: Node;
    next: Node;
    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
};

export class LRUCache {
    capacity: number;
    private hash: Map<number, Node> = new Map<number, Node>();
    head: Node = new Node(-1, -1);
    tail: Node = new Node(-2, -2);
    constructor(capacity: number) {
        this.capacity = capacity;
        this.initDoubleLinkedList();
    }

    private initDoubleLinkedList(): void {
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    private remove(node: Node): void {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private insert(node1: Node, node2: Node): void {
        node1.next.prev = node2;
        node2.next = node1.next;
        node1.next = node2;
        node2.prev = node1;
    }

    get(key: number): number {
        // 1. find value
        const find = this.hash.get(key);
        if (find !== undefined) {
            // 2. remove node
            this.remove(find);
            // 3. insert node in head;
            this.insert(this.head, find);
            return find.value;
        } else {
            return -1;
        }
    }

    put(key: number, value: number): void {
        // 1. find hash ok
        //  1.1 remove hash node, insert node first
        //  1.2 update value
        // 2. find hash bad
        //  2.1 insert node first, set hash node
        //  2.2 validate capacity and remove last node 
        const find = this.hash.get(key);
        if (find !== undefined) {
            this.remove(find);
            this.insert(this.head, find);
            find.value = value;
        } else {
            const node = new Node(key, value);
            this.insert(this.head, node);
            this.hash.set(key, node);
            if (this.hash.size > this.capacity) {
                this.hash.delete(this.tail.prev.key);
                this.remove(this.tail.prev);
            }
        }
    }
}

