import { Node } from "./Node";
import { DoubleLinkedList } from "./DoubleLinkedList";

test('double linkedList', () => {
    let linkedList = new DoubleLinkedList<number>();

    let node1 = new Node<number>();
    linkedList.insert(node1);
    expect(linkedList.getHead()).toBe(node1);

    let node2 = new Node<number>();
    linkedList.insert(node2);
    expect(linkedList.getHead()).toBe(node2);
    expect(linkedList.getTail()).toBe(node1);
    
    linkedList.remove(node2);
    expect(linkedList.getHead()).toBe(node1);
    expect(linkedList.getTail()).toBe(node1);

});