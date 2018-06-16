console.log("orbit.js connected");

var G = 1;
var earthMass = 100;
var moonMass = 0.2;
var moonXVel = 9.5;
var moonYVel = 0;

var separation = new p5.Vector(0, 0);
var force = new p5.Vector(0, 0);
var force2 = new p5.Vector(0, 0);

// List of bodies in the system
let bodies = []

function Body(x, y, radius, mass) {
    this.pos = new p5.Vector(x, y);
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);
    this.radius = radius;
    this.mass = mass;

    this.show = function () {
        // Draw an ellipse at x, y
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    };

    this.move = function (force) {
        this.acc = p5.Vector.div(force, this.mass);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
}

function calcForce (earth, moon) {
    var m1 = earth.mass;
    var m2 = moon.mass;
    var r = separation.mag();
    var fMag = -(G * m1 * m2) / (r ** 2);
    var f = separation.copy()
    f = f.mult(fMag);
    return(f);
}

function setup() {
    createCanvas(1000, 800);
    canvasWidth = width;
    canvasHeight = height;
    earth = new Body(width / 2, height / 2, 50, earthMass);
    moon = new Body(width / 2, 100, 10, moonMass);
    moon.vel.set(moonXVel, moonYVel);
   // frameRate(2);
}

function draw() {
    background(0);
    stroke(255);
    fill(255);
    earth.show();
    moon.show();
    separation = p5.Vector.sub(moon.pos, earth.pos);
    if (separation.mag() <= moon.radius + earth.radius) {
        console.log("Oops!")
        noLoop();
    } else {
        force.set(calcForce(earth, moon));
        force2 = force.copy().mult(-1);  // Opposite force acts on the earth
        moon.move(force);
        earth.move(force2);
        stroke(255, 0, 0);
        line(moon.pos.x, moon.pos.y, moon.pos.x + (force.x * 100), moon.pos.y + (force.y * 100));
        stroke(0, 0, 255);
        line(moon.pos.x, moon.pos.y, moon.pos.x + (moon.vel.x * 5), moon.pos.y + (moon.vel.y * 5));
    }
}
