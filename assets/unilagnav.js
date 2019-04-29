function IkukuGraph(name = null){
	this.name = name;
	this.nodes = [];
	this.edges = [];

	this.addNode = function(name){
		this.nodes.push(name);

		let selfEdge = {};
		selfEdge.to = name;
		selfEdge.weight = 0;
	}

	
	this.findNode = function(s){
		var index = this.nodes.indexOf(s);

		console.log(`Source: ${s}, Index: ${index}`);			
	}

	this.addEdge = function(source, target, weight){
		let edge = {};
		let edgeAlt = {};

		edge.from = source;
		edge.to = target;
		edge.weight = weight;

		let result = this.edges.filter(obj => obj.from === edge.from && obj.to === edge.to);
		if (result.length > 0) {
			console.log(`Edge already exists from ${edge.from} to ${edge.to}`);
		} else {
			this.edges.push(edge);

			edgeAlt.from = target;
			edgeAlt.to = source;
			edgeAlt.weight = weight;
			this.edges.push(edgeAlt);				
		}
	}

	this.printEdges = function(){
		console.log(`Edges =  ${this.edges.length}`);
		for (var i = 0; i < this.edges.length; i+=2){
			console.log(this.edges[i]);
		}
	}

	this.noOfEdges = function() {
		console.log(`${this.edges.length/2} edges available`);
	}

	this.findEdges = function(source){
		let result = this.edges.filter(obj => obj.from === source);

		return result;
	}

	this.dijsktra = function(startNode){

		if (startNode == null) {
			console.log("Please specify a start point!");
		}

		this.distances = [];
		this.visited = [];
		this.paths = []; 
		this.queue = new PriorityQueue();

		this.isVisited = function(node){
			if (this.visited.indexOf(node) >= 0) {
				return true;
			}
			return false;
		}

		this.queue.enqueue(startNode, 0);
		this.visited.push(startNode);

		for (var i = 0; i < this.nodes.length; i++){
			let d = {};
			let p = {};
			p.node = this.nodes[i];
			d.node = this.nodes[i];
			if (this.nodes[i] === startNode) {
				d.distance = null;
				p.path = startNode;
			}
			else {
				d.distance = 0;
				p.path = null;
			}

			this.distances.push(d);
			this.paths.push(p);
		}

		//console.log(`Queue: ${this.queue.print()}`);

		var minElem = this.queue.dequeue();

		while(minElem != "Underflow"){
			let edges = this.findEdges(minElem.element);
			
			for (var j = 0; j < edges.length; j++){
				//console.log(edges[j]);
				let node = edges[j].to;
				let index = this.nodes.indexOf(minElem.element);

				//console.log(`Node ${minElem.element} is found in Index ${index}`);
				let currentDistance = this.distances.filter(obj => obj.node === node)[0].distance;
				let parentDistance = this.distances.filter(obj => obj.node === minElem.element)[0].distance;
				let edgeWeight = edges[j].weight;
				let newDistance = parentDistance + edgeWeight;

				if (!this.isVisited(node)) {
					this.visited.push(node);
					this.queue.enqueue(node, newDistance);
				}

				if (currentDistance == 0) {
					this.distances.filter(obj => obj.node === node)[0].distance = newDistance;
					if (minElem.element === startNode) {
						this.paths[this.nodes.indexOf(node)].path = `${minElem.element}`;
					}
					else {
						this.paths[this.nodes.indexOf(node)].path = `${this.paths[index].path}, ${minElem.element}`;
					}

				}
				else if (currentDistance > newDistance) {
					this.distances.filter(obj => obj.node === node)[0].distance = newDistance;
					let currentPath = this.paths[index];

					if (minElem.element === "a") {
						console.log(`currentPath for a is: ${currentPath}`);
					}

					if (currentPath === minElem.element) {
						console.log("Same");
						this.paths[this.nodes.indexOf(node)].path = `${this.paths[index].path}`;
					}
					else {
						this.paths[this.nodes.indexOf(node)].path = `${this.paths[index].path}, ${minElem.element}`;
					}
				}
			}
			minElem = this.queue.dequeue();
			//console.log(`Queue: ${this.queue.print()}`);
		}

		for (var k = 0; k < this.nodes.length; k++){
			//if (this.) {}
		}

		console.log(`Dijsktra Algorithm for graph ${this.name}`);
		console.log(`Shortest Distances:`);
		console.log(this.distances);
		console.log("");
		console.log(`Shortest Paths:`);
		console.log(this.paths);

		// for (var j = 0; j < this.out.length; j++){

		// }
	}

}



function PriorityQueue(){
	function QElement(element, priority){
		this.element = element;
		this.priority = priority;
	}

	this.items = [];


	this.enqueue = function(element, priority){
		var qElement = new QElement(element, priority);
		var contain = false;

		//Iterate through entire array to add element at correct location
		for (var i = 0; i < this.items.length; i++){
			if (this.items[i].priority > qElement.priority){
				this.items.splice(i, 0, qElement);
				contain = true;
				break;
			}
		}

		//If element has the highest priority, push to end of queue
		if (!contain) {
			this.items.push(qElement);
		}
	}

	this.dequeue = function(){
		if (this.isEmpty()){
			return "Underflow";
		}
		return this.items.shift();
	}

	this.front = function(){
		if (this.isEmpty()){
			return "No elements";
		}
		return this.items[0];
	}

	this.rear = function(){
		if (this.isEmpty()){
			return "No elements";
		}
		return this.items[this.items.length - 1];
	}

	this.isEmpty = function(){
		return this.items.length == 0;
	}

	this.print = function(){
		var str = "";
		for (var i = 0; i < this.items.length; i++){
			str += this.items[i].element + " ";
		}
		return str;
	}
}

// var nav = new IkukuGraph(); //Create new nav

// nav.addNode('a'); //1st Gate
// nav.addNode('b'); //Church/Mosque
// nav.addNode('c'); //Education
// nav.addNode('d'); //Newest Hall
// nav.addNode('e'); //New Hall
// nav.addNode('f'); //ISL
// nav.addNode('g'); //Health Center
// nav.addNode('h'); //Moremi Car Park
// nav.addNode('i'); //Senate Building
// nav.addNode('j'); //Jaja
// nav.addNode('k'); //Ozolua
// nav.addNode('l'); //Sciences
// nav.addNode('m'); //Library
// nav.addNode('n'); //Highrise

// nav.addEdge('a', 'b', 2);
// nav.addEdge('a', 'c', 1);

// nav.addEdge('b', 'e', 1);
// nav.addEdge('b', 'f', 4);

// nav.addEdge('c', 'd', 1);

// nav.addEdge('d', 'f', 2);

// nav.addEdge('e', 'f', 4);
// nav.addEdge('e', 'g', 3);
// nav.addEdge('e', 'h', 2);
// nav.addEdge('e', 'i', 3);

// nav.addEdge('f', 'g', 1);
// nav.addEdge('f', 'j', 2);
// nav.addEdge('f', 'k', 3);

// nav.addEdge('g', 'j', 1);

// nav.addEdge('h', 'i', 2);
// nav.addEdge('h', 'j', 1);

// nav.addEdge('i', 'j', 3);
// nav.addEdge('i', 'm', 1);

// nav.addEdge('j', 'k', 2);
// nav.addEdge('j', 'l', 1);
// nav.addEdge('j', 'm', 2);

// nav.addEdge('k', 'n', 2);

// nav.addEdge('l', 'm', 2);

//nav.dijsktra('a');

// var example = new IkukuGraph();

// example.addNode('a');
// example.addNode('b');
// example.addNode('c');
// example.addNode('d');
// example.addNode('e');
// example.addNode('z');

// example.addEdge('a', 'b', 4);
// example.addEdge('a', 'c', 2);
// example.addEdge('b', 'c', 1);
// example.addEdge('b', 'd', 5);
// example.addEdge('c', 'e', 10);
// example.addEdge('c', 'd', 8);
// example.addEdge('e', 'z', 3);
// example.addEdge('d', 'z', 6);
// example.addEdge('d', 'e', 2);


// example.dijsktra('a');


// var ex1 = new IkukuGraph();

// ex1.addNode('a');
// ex1.addNode('b');
// ex1.addNode('c');
// ex1.addNode('d');
// ex1.addNode('e');
// ex1.addNode('z');

// ex1.addEdge('a', 'b', 2);
// ex1.addEdge('a', 'c', 3);
// ex1.addEdge('b', 'e', 2);
// ex1.addEdge('b', 'd', 5);
// ex1.addEdge('c', 'e', 5);
// ex1.addEdge('e', 'z', 4);
// ex1.addEdge('d', 'z', 2);
// ex1.addEdge('d', 'e', 1);

// ex1.dijsktra('a');