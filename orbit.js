console.log("orbit.js connected");

const G = 0.00000001;
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
	this.mass = 4/3 * PI * (this.radius ** 3);

	this.show = function() {

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
		if (this.position.x > width) {
			this.position.x = this.position.x % width;
		}
		if (this.position.y > height) {
			this.position.y = this.position.y % height;
		}
		if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.y < 0) {
			this.position.y = height;
		}

		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
	}
}

function mousePressed() {
	newBody = new Body(mouseX, mouseY, Math.random() * 50 + 5);
	//newBody.velocity.set(Math.random() * 0.5, Math.random() * 0.5);
	bodies.push(newBody);
}

function getForce(b1, b2) {
	r = p5.Vector.sub(b1.position, b2.position).mag();
	d = p5.Vector.sub(b1.position, b2.position).normalize();
	f = -((G * b1.mass * b2.mass) / (r ** 2));
	return p5.Vector.mult(d, f);
}

function checkCollisions(bodies) {
	for (let i = 0; i < bodies.length; i++) {
		for (let j = 0; j < bodies.length; j++) {
			if (i != j) {
				if (Math.abs(p5.Vector.sub(bodies[i].position, bodies[j].position).mag()) <= (bodies[i].radius + bodies[j].radius)) {
					console.log("contact");
					let a1 = bodies[i].acceleration;
					let a2 = bodies[j].acceleration;
					bodies[i].acceleration.add(a2);
					bodies[j].acceleration.add(a1);
				}
			}
		}
	}


}
