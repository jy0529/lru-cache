type Nil = '__nil__';
class Node<T> {
    key: T | Nil;
    value: T | Nil;
    prev: Node<T>;
    next: Node<T>;
    constructor(key?: T, value?: T) {
        this.key = key ?? '__nil__';
        this.value = value ?? '__nil__';
    }
};

export class LRUCache<T> {
    capacity: number;
    private hash: Map<T, Node<T>> = new Map<T, Node<T>>();
    head: Node<T> = new Node();
    tail: Node<T> = new Node();
    constructor(capacity: number) {
        this.capacity = capacity;
        this.initDoubleLinkedList();
    }

    private initDoubleLinkedList(): void {
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    private remove(node: Node<T>): void {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private insert(node1: Node<T>, node2: Node<T>): void {
        node1.next.prev = node2;
        node2.next = node1.next;
        node1.next = node2;
        node2.prev = node1;
    }

    get(key: T): T | number {
        // 1. find value
        const find = this.hash.get(key);
        if (find !== undefined) {
            // 2. remove node
            this.remove(find);
            // 3. insert node in head;
            this.insert(this.head, find);
            if ((find.value) as Nil === '__nil__' || (find.key) as Nil === '__nil__') {
                return -1;
            }
            return (find.value) as T;
        } else {
            return -1;
        }
    }

    put(key: T, value: T): void {
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
                this.hash.delete((this.tail.prev.key) as T);
                this.remove(this.tail.prev);
            }
        }
    }
}

