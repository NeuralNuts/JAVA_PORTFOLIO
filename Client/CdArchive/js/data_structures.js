class DoublyLinkedListNode {
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

  append(value) {
    let newNode = new DoublyLinkedListNode(value);

    this.tail.next = newNode;

    newNode.previous = this.tail;

    this.tail = newNode;
    this.length++;
    this.printList();
  }

  prepend(value) {
    let newNode = new DoublyLinkedListNode(value);

    newNode.next = this.head;

    this.head.previous = newNode;
    this.head = newNode;
    this.length++;
    this.printList();
  }

  insert(index, value) {
    if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
      console.log(`Invalid index. Current length is ${this.length}.`);
      return this;
    }

    if (index === 0) {
      this.prepend(value);
      return this;
    }

    if (index === this.length) {
      this.append(value);
      return this;
    }

    let newNode = new DoublyLinkedListNode(value);
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

  remove(index) {
    if (!Number.isInteger(index) || index < 0 || index > this.length) {
      console.log(`Invalid index. Current length is ${this.length}.`);
      return this;
    }

    if (index === 0) {
      this.head = this.head.next;
      this.head.previous = null;
      this.length--;
      this.printList();

      return this;
    }

    if (index === this.length - 1) {
      this.tail = this.tail.previous;
      this.tail.next = null;
      this.length--;
      this.printList();
      
      return this;
    }

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

class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new BinaryTreeNode(value);

    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (true) {
        if (value < currentNode.value) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            return this;
          }
          currentNode = currentNode.left;
        } else {
          if (!currentNode.right) {
            currentNode.right = newNode;
            return this;
          }
          currentNode = currentNode.right;
        }
      }
    }
  }

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

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const prime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * prime + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = new BinaryTree();
    }
    this.keyMap[index].insert(value);
  }

  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      return this.keyMap[index];
    }
    return null;
  }
}

function BinaryTreeLoad(){
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const data = [];
  const tree = new BinaryTree();

  rows.forEach(row => {
    const rowData = {};
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      rowData[index + 1] = cell.textContent.trim();
    });
    data.push(rowData);
  });

  tree.insert(data[2]);
  tree.insert(data[3]);
  tree.insert(data[4]);
  tree.insert(data[5]);
  tree.insert(data[6]);

  return tree;
}

function loadInPostOrder() {
  var tree = BinaryTreeLoad()

  results = `Post order --> \n\n${JSON.stringify(tree.postOrder())}`
  document.getElementById("area-id").innerHTML = results
};

function loadInPreOrder() {
  var tree = BinaryTreeLoad()

  results = `Pre order --> \n\n${JSON.stringify(tree.preOrder())}`
  document.getElementById("area-id").innerHTML = results
};

function loadInOrder() {
  var tree = BinaryTreeLoad()

  results = `In order --> \n\n${JSON.stringify(tree.inOrder())}`
  document.getElementById("area-id").innerHTML = results
};

function displayHashTable() {
  var tree = BinaryTreeLoad()
  var text_area = document.getElementById("area-id")
  const hash_table = new HashTable()

  hash_table.set(2, tree)
  hash_table._hash(2)
  text_area.innerText = JSON.stringify(hash_table.get(2))
};