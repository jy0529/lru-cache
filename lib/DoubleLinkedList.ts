import { Node } from "./Node";

export interface IDoubleLinkedList<T> {
    insert(node: Node<T>): void
    remove(node: Node<T>): void
    getHead(): Node<T>
    getTail(): Node<T>
}

export class DoubleLinkedList<T> implements IDoubleLinkedList<T> {
    head: Node<T> = new Node();
    tail: Node<T> = new Node();

    constructor() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    getHead(): Node<T> {
        return this.head.next;
    }
    getTail(): Node<T> {
        return this.tail.prev;
    }
    insert(node: Node<T>): void {
        this.head.next.prev = node;
        node.next = this.head.next;
        this.head.next = node;
        node.prev = this.head;
    }
    remove(node: Node<T>): void {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}
