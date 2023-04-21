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