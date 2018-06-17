console.log("orbit.js connected");

const G = .0001;
let bodies = [];

function setup() {
	createCanvas(800, 800);
}

function draw() {

	background(0);

	if (bodies.length > 0) {
		for (let i = 0; i < bodies.length; i++) {
			bodies[i].calculateForces(bodies);
			bodies[i].move();
			bodies[i].show();
		}
	}
}

function Body(x, y, radius) {
	this.position = createVector(x, y);
	this.acceleration = createVector(0, 0);
	this.velocity = createVector(0, 0);
	this.radius = radius;
	this.mass = PI * this.radius ** 2;

	this.show = function() {
		console.log(this.position.x, this.position.y);
		fill(255);
		ellipse(this.position.x, this.position.y, this.radius);
		fill(0);
	}

	this.calculateForces = function(bodies) {
		for (let i = 0; i < bodies.length; i++) {
			if (bodies[i] !== this) {
				let force = getForce(this, bodies[i]);
				let acc = p5.Vector.div(force, this.mass);
				this.acceleration.add(acc);
			}
		}
	}

	this.move = function() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
	}
}

function mousePressed() {
	bodies.push(new Body(mouseX, mouseY, Math.random() * 50 + 5));
}

function getForce(b1, b2) {
	r = p5.Vector.sub(b1.position, b2.position).mag();
	if (Math.abs(r) <= b1.radius + b2.radius) {
		return createVector(0, 0);
	} else {
		d = p5.Vector.sub(b1.position, b2.position).normalize();
		f = -1 * ((G * b1.mass * b2.mass) / (r ** 2));
		return p5.Vector.mult(d, f);
	}
}
