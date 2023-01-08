class Node {
    constructor(value) {
        this.data = value ? value : 0;
        this.left = null;
        this.right = null;
    };
};
class BinaryTree {
    constructor() {
        this.root = null;
    };
    makeRandom(treeDepth, val, current = this.root) {
        if (treeDepth > 0 && val > 0) {
            current = new Node(this.randomValue(val));
            const left = this.randomValue(val);
            const right = this.randomValue(val);
            if (left > 0) current.left = this.makeRandom(treeDepth - 1, left, current.left);
            if (right > 0) current.right = this.makeRandom(treeDepth - 1, right, current.right);
        };
        return this.root = current;
    };
    fillRandom(amount, val) {
        if (amount > 0 && val > 0) {
            let num = this.randomValue(val);
            // num = 0;
            if (num > 0) this.insert(num);
            this.fillRandom(amount - 1, val);
        };
        this.depthUpdate();
    };
    depthUpdate(current = this.root) {
        if (current === null) return 0;
        return this.treeDepth = Math.max(this.depthUpdate(current.left) + 1, this.depthUpdate(current.right) + 1);
    };
    depth() {
        if (!this.root || !this.treeDepth) return this.depthUpdate();
        else return this.treeDepth;
    };
    randomValue(max) {
        return Math.floor(Math.random() * max);
    };
    insert(data) {
        var newNode = new Node(data);
        if (this.root === null) this.root = newNode;
        else insertNode(this.root, newNode);
        function insertNode(node, newNode) {
            if (newNode.data < node.data) {
                if (node.left === null) node.left = newNode;
                else insertNode(node.left, newNode);
            } else {
                if (node.right === null) node.right = newNode;
                else insertNode(node.right, newNode);
            };
        };
    };
    width(current = this.root, lvl = 0, levels = []) { //recursive width at least 80% faster than stack method
        if (current === null) return 0;
        levels[lvl] === undefined ? levels.push(1) : levels[lvl]++;
        this.width(current.left, lvl + 1, levels);
        this.width(current.right, lvl + 1, levels);
        if (lvl === 0) return Math.max(...levels);
    };
    widthStack() {
        if (this.root === null) return 0;
        const levels = [];
        const stack = [[this.root, 0]];
        while (stack.length > 0) {
            const current = stack.pop();
            const left = current[0].left;
            const right = current[0].right;
            levels[current[1]] === undefined ? levels.push(1) : levels[current[1]]++;
            if (right) stack.push([right, current[1] + 1]);
            if (left) stack.push([left, current[1] + 1]);
        };
        return Math.max(...levels);
    };
    draw(curr = this.root, lvl = 1, x = width / 2, y = height / (2 ** lvl + this.depth() * 0.69), d = this.depth()) {
        const dx = width / (2 ** lvl * 2);
        const k = 0.2 + lvl * 0.33;
        const dy = height * k / 2 ** lvl;
        const size = height * k * 0.95 ** d / (2 ** lvl);
        if (!curr) {
            fill(220), rectMode(CENTER);
            rect(x, y - size * 0.05, size * 1.75, size);
            fill(200, 0, 0), textAlign(CENTER, CENTER), textSize(size);
            text('null', x, y);// ellipse(x, y, dy * 0.8);
            return;
        };
        line(x, y, x + dx, y + dy);
        line(x, y, x - dx, y + dy);
        fill(220), rectMode(CENTER);
        let len = curr.data.toString().length;
        rect(x, y - size * 0.1, size * len * 0.75, size * 1.11);
        textSize(size * 1.3), textAlign(CENTER, CENTER), fill(0, 150, 0);
        text(curr.data, x, y);
        this.draw(curr.left, lvl + 1, x - dx, y + dy, d);
        this.draw(curr.right, lvl + 1, x + dx, y + dy, d);
    };
};

const tree = new BinaryTree();

const treeHeight = document.getElementById("treeHeight");
const randomValue = document.getElementById("randomVal");
treeHeight.defaultValue = 7;
randomValue.defaultValue = 100;
tree.makeRandom(treeHeight.value, randomValue.value);
console.log(tree);

function submit() {
    console.log(tree.makeRandom(treeHeight.value, randomValue.value));
    console.log('depth ', tree.depth());
    console.log('width ', tree.width());
};

document.getElementById("submit").onclick = submit;

document.getElementById("sortedTreeButton").onclick = () => {
    tree.root = null;
    while (tree.depth() < treeHeight.value) tree.fillRandom(1, randomValue.value);
};

document.getElementById("addNode").onclick = () => {
    tree.fillRandom(1, randomValue.value);
    console.log('one node added');
};

function setup() {
    const canvas = createCanvas(windowWidth-35, windowHeight);
    canvas.parent('sketch');
    canvas.style('width', '100%');
    canvas.style('height', '100%');
};
function draw() {
    background(200);
    tree.draw();
};

