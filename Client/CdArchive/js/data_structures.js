class Node {
  constructor(key, name) {
    this.key = key;
    this.name = name;
    this.leftChild = null;
    this.rightChild = null;
  }
  toString() {
    //return `${this.name}has the key${this.key}`;
    //return this.name + " has the key " + this.key + "\nLeft Child: " + this.leftChild + "\nRight Child: " + this.rightChild + "\n";
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  addNode(key, name) {
    const newNode = new Node(key, name);
    if (this.root === null) {
      this.root = newNode;
    } else {
      let focusNode = this.root;
      let parent;
      while (true) {
        parent = focusNode;
        if (key < focusNode.key) {
          focusNode = focusNode.leftChild;
          if (focusNode === null) {
            parent.leftChild = newNode;
            return;
          }
        } else {
          focusNode = focusNode.rightChild;
          if (focusNode === null) {
            parent.rightChild = newNode;
            return;
          }
        }
      }
    }
  }
  inOrderTraverseTree(focusNode) {
    if (focusNode !== null) {
      this.inOrderTraverseTree(focusNode.leftChild);
      console.log(focusNode.toString());
      this.inOrderTraverseTree(focusNode.rightChild);
    }
  }
  preorderTraverseTree(focusNode) {
    if (focusNode !== null) {
      console.log(focusNode.toString());
      this.preorderTraverseTree(focusNode.leftChild);
      this.preorderTraverseTree(focusNode.rightChild);
    }
  }
  postOrderTraverseTree(focusNode) {
    if (focusNode !== null) {
      this.postOrderTraverseTree(focusNode.leftChild);
      this.postOrderTraverseTree(focusNode.rightChild);
      console.log(focusNode.toString());
    }
  }
  findNode(key) {
    let focusNode = this.root;
    while (focusNode.key !== key) {
      if (key < focusNode.key) {
        focusNode = focusNode.leftChild;
      } else {
        focusNode = focusNode.rightChild;
      }
      if (focusNode === null) {
        return null;
      }
    }
    return focusNode;
  }
}

function loadDataTree() {

  get_data = `SELECT * FROM archive`;

  db.all(get_data, [], (err, rows) => {

    if (err) return console.error(err.message);

    for (let row of rows) {

      const theTree = new BinaryTree();
      theTree.addNode(40, row.title);
      theTree.addNode(30, row.title);
      theTree.addNode(20, row.title);
      theTree.addNode(70, row.title);
      theTree.addNode(90, row.title);


      // Different ways to traverse binary trees
      //theTree.inOrderTraverseTree(theTree.root);
      //theTree.preorderTraverseTree(theTree.root);
      //theTree.postOrderTraverseTree(theTree.root);

      // Find the node with key 75
      // console.log("\nTest Node with the key 75");
      //console.log(theTree);
      m = JSON.stringify(theTree)
      console.log(m)
    }
  })
};

class Node_2 {
  constructor(value) {
      this.value = value;
      this.next = null;
      this.previous = null;
  }
}

class DoublyLinkedList {
  constructor(value) {
      this.head = {
          value: value,
          next: null,
          previous: null
      };
      this.length = 1;
      this.tail = this.head;
  }

  printList() {
      let array = [];
      let currentList = this.head;
      while (currentList !== null) {
          array.push(currentList.value);
          currentList = currentList.next;
      }

      array.join('<-->');
      return this;
  }

  // Insert node at end of the list
  append(value) {
      let newNode = new Node_2(value);

      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;

      this.length++;
      this.printList();
  }

  // Insert node at the start of the list
  prepend(value) {
      let newNode = new Node_2(value);

      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;

      this.length++;
      this.printList();
  }

  // Insert node at a given index
  insert(index, value) {
      if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
          console.log(`Invalid index. Current length is ${this.length}.`);
          return this;
      }

      // If index is 0, prepend
      if (index === 0) {
          this.prepend(value);
          return this;
      }

      // If index is equal to this.length, append
      if (index === this.length) {
          this.append(value);
          return this;
      }

      // Reach the node at that index
      let newNode = new Node_2(value);
      let previousNode = this.head;

      for (let k = 0; k < index - 1; k++) {
          previousNode = previousNode.next;
      }

      let nextNode = previousNode.next;

      newNode.next = nextNode;
      previousNode.next = newNode;
      newNode.previous = previousNode;
      nextNode.previous = newNode;

      this.length++;
      this.printList();
  }

  // Remove a node
  remove(index) {
      if (!Number.isInteger(index) || index < 0 || index > this.length) {
          console.log(`Invalid index. Current length is ${this.length}.`);
          return this;
      }

      // Remove head
      if (index === 0) {
          this.head = this.head.next;
          this.head.previous = null;

          this.length--;
          this.printList();
          return this;
      }

      // Remove tail
      if (index === this.length - 1) {
          this.tail = this.tail.previous;
          this.tail.next = null;

          this.length--;
          this.printList();
          return this;
      }

      // Remove node at an index
      let previousNode = this.head;

      for (let k = 0; k < index - 1; k++) {
          previousNode = previousNode.next;
      }
      let deleteNode = previousNode.next;
      let nextNode = deleteNode.next;

      previousNode.next = nextNode;
      nextNode.previous = previousNode;

      this.length--;
      this.printList();
      return this;
  }
}