class Node {

    constructor(id, initials, partyCode) {
       this.id = id;
       this.initials = initials;
       this.partyCode = partyCode;
       this.adjacencyList = {};
    }
    addEdge(targetId, weigth) {
       this.adjacencyList[targetId] = weigth;
    }
 }
 class Graph {

    constructor() {
       this.adjacencyList = {};
    }
    addNode(node) {
       operationscounter++;
       this.adjacencyList[node.id] = node;
    }
 }