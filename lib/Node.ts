export type Nil = '__nil__';

export class Node<T> {
    key: T | Nil;
    value: T | Nil;
    prev: Node<T>;
    next: Node<T>;
    constructor(key?: T, value?: T) {
        this.key = key ?? '__nil__';
        this.value = value ?? '__nil__';
    }
};
