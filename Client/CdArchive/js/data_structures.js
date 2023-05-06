// Define the Node class
class Node_3 {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Define the Binary Tree class
class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the tree
  insert(value) {
    const newNode = new Node_3(value);

    if (!this.root) {
      // If the tree is empty, set the root to the new node
      this.root = newNode;
    } else {
      // Traverse the tree to find the correct position for the new node
      let currentNode = this.root;
      while (true) {
        if (value < currentNode.value) {
          // If the value is less than the current node, go left
          if (!currentNode.left) {
            // If there's no left child, insert the new node as the left child
            currentNode.left = newNode;
            return this;
          }
          // Otherwise, set the current node to the left child and continue traversing
          currentNode = currentNode.left;
        } else {
          // If the value is greater than or equal to the current node, go right
          if (!currentNode.right) {
            // If there's no right child, insert the new node as the right child
            currentNode.right = newNode;
            return this;
          }
          // Otherwise, set the current node to the right child and continue traversing
          currentNode = currentNode.right;
        }
      }
    }
  }

  // Traverse the tree in pre-order and return an array of node values
  preOrder() {
    const values = [];

    function traverse(node) {
      if (!node) return;
      values.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);

    return values;
  }

  // Traverse the tree in post-order and return an array of node values
  postOrder() {
    const values = [];

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      values.push(node.value);
    }

    traverse(this.root);

    return values;
  }

  // Traverse the tree in in-order and return an array of node values
  inOrder() {
    const values = [];

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      values.push(node.value);
      traverse(node.right);
    }

    traverse(this.root);

    return values;
  }
}

function loadInPostOrder() {
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const data = [];

  rows.forEach(row => {
    const rowData = {};
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      rowData[`column${index + 1}`] = cell.textContent.trim();
    });
    data.push(rowData);
  });
  console.log(data);

  const tree = new BinaryTree();
  tree.insert(data[2]);
  tree.insert(data[3]);
  tree.insert(data[4]);
  tree.insert(data[5]);
  tree.insert(data[6]);
  console.log(tree)
  console.log(tree.preOrder()); // [5, 3, 1, 7, 9]
  console.log(tree.postOrder()); // [1, 3, 9, 7, 5]
  console.log(tree.inOrder()); // [1, 3, 5, 7, 9]

  results = `Post order -- ${JSON.stringify(tree.postOrder())}`
  document.getElementById("area-id").innerHTML = results
};

function loadInPreOrder() {
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const data = [];

  rows.forEach(row => {
    const rowData = {};
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      rowData[`column${index + 1}`] = cell.textContent.trim();
    });
    data.push(rowData);
  });
  console.log(data);

  const tree = new BinaryTree();
  tree.insert(data[2]);
  tree.insert(data[3]);
  tree.insert(data[4]);
  tree.insert(data[5]);
  tree.insert(data[6]);
  console.log(tree)
  console.log(tree.preOrder()); // [5, 3, 1, 7, 9]
  console.log(tree.postOrder()); // [1, 3, 9, 7, 5]
  console.log(tree.inOrder()); // [1, 3, 5, 7, 9]

  results = `Pre order -- ${JSON.stringify(tree.preOrder())}`
  document.getElementById("area-id").innerHTML = results
};

function loadInOrder() {
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const data = [];

  rows.forEach(row => {
    const rowData = {};
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      rowData[`column${index + 1}`] = cell.textContent.trim();
    });
    data.push(rowData);
  });
  console.log(data);

  const tree = new BinaryTree();
  tree.insert(data[2]);
  tree.insert(data[3]);
  tree.insert(data[4]);
  tree.insert(data[5]);
  tree.insert(data[6]);
  console.log(tree)
  console.log(tree.preOrder()); // [5, 3, 1, 7, 9]
  console.log(tree.postOrder()); // [1, 3, 9, 7, 5]
  console.log(tree.inOrder()); // [1, 3, 5, 7, 9]

  results = `In order -- ${JSON.stringify(tree.inOrder())}`
  document.getElementById("area-id").innerHTML = results
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