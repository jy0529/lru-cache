import { DoubleLinkedList, IDoubleLinkedList } from "./lib/DoubleLinkedList";

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
    linedList: IDoubleLinkedList<T> = new DoubleLinkedList<T>();
    constructor(capacity: number) {
        this.capacity = capacity;
    }

    private remove(node: Node<T>): void {
        this.linedList.remove(node);
    }

    private insert(node: Node<T>): void {
        this.linedList.insert(node);
    }

    get(key: T): T | number {
        // 1. find value
        const find = this.hash.get(key);
        if (find !== undefined) {
            // 2. remove node
            this.remove(find);
            // 3. insert node in head;
            this.insert(find);
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
            this.insert(find);
            find.value = value;
        } else {
            const node = new Node(key, value);
            this.insert(node);
            this.hash.set(key, node);
            if (this.hash.size > this.capacity) {
                const tail: Node<T> = this.linedList.getTail();
                this.hash.delete((tail.key) as T);
                this.remove(tail);
            }
        }
    }
}

