// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 0, width, height);

// ball object
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    if(this.dead) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  };

  move() {
    if(this.dead) return;
    this.x += this.vx;
    this.y += this.vy;
  
    if(this.x + this.r > width) {
      this.vx *= -1;
      this.x = width - this.r;
    }
    if(this.x - this.r <= 0) {
      this.vx *= -1;
      this.x = this.r;
    }
    if(this.y + this.r > height) {
      this.vy *= -1;
      this.y = height - this.r;
    }
    if(this.y - this.r <= 0) {
      this.vy *= -1;
      this.y = this.r;
    }        
  };

  checkCollision(ball) {
    if(this.dead) return;
    let dx = this.x - ball.x;
    let dy = this.y - ball.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
  
    if(distance <= (this.r + ball.r)) {
      // console.log(distance);
      return true;
    }
    return false;
  };

  handleCollision(index) {
    if(this.dead) return;
    for(let i = 0; i < index; i++) {
      let ball = balls[i];
      if(this.checkCollision(ball) && !ball.dead) {
        let r1 = Math.pow(this.r, 3);
        let r2 = Math.pow(ball.r, 3)
        let vx1 = (this.vx*(r1 - r2) + (2*r2*ball.vx))/(r1+r2);
        let vy1 = (this.vy*(r1 - r2) + (2*r2*ball.vy))/(r1+r2);
        let vx2 = (ball.vx*(r2 - r1) + (2*r1*this.vx))/(r1+r2);
        let vy2 = (ball.vy*(r2 - r1) + (2*r1*this.vy))/(r1+r2);
        this.vx = vx1;
        this.vy = vy1;
        ball.vx = vx2;
        ball.vy = vy2;
      }
    }
  }
}

// RegBall

class RegBall extends Ball {
  constructor(x, y, vx, vy, color, r) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.r = r;
    this.dead = false;
    this.index = -1;
  }
};

// Evil Ball
class EvilBall extends Ball {
  constructor(x, y, vx, vy, r) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.counter = 0;
  }
  draw() {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'green';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };
  handleCollision(index) {
    for(let i = 0; i < balls.length; i++) {
      let ball = balls[i];
      if(this.checkCollision(ball) && !ball.dead) {
        this.counter++;
        ball.dead = true;
        // balls = balls.splice(ball.index, ball.index);
        // (balls);
        const counterBoadrd = document.querySelector('p');
        counterBoadrd.innerHTML = `${Evil.counter}`;
      }
    }
  }
  setControls() {
    let _this = this;
    window.onkeydown = (e) => {
      if(e.key === 'ArrowLeft') this.x-=20;
      if(e.key === 'ArrowUp') this.y-=20;
      if(e.key === 'ArrowRight') this.x+=20;
      if(e.key === 'ArrowDown') this.y+=20;
    }
  }
}



// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// Generate balls
let balls = [];
const ballNumber = random(10, 10);
const GenerateBall = () => {
    let r = random(30, 50);
    var ball = new RegBall(
      random(r, width-r), random(r, height-r), random(-5, 5), random(-5, 5),
      "rgba(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + "," + random(10, 20) +")", r
    );
  
    // make sure no collision at the beginning
    while(true) {
      let isCollide = false;
      for(let i = 0; i < balls.length; i = i + 1) {
        let previousBall = balls[i];
        if(ball.checkCollision(previousBall)) {
          // console.log(balls);
          // console.log(ball);
          ball = new Ball(
            random(r, width-r), random(r, height-r), random(-5, 5), random(-5, 5),
            "rgba(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + "," + random(0.4, 0.8) +")", r
          );
          isCollide = true;
          break;
        }
      }
      if(isCollide) continue;
      break;
    }
    balls.push(ball);
    balls[balls.length-1].index = balls.length-1;
    // ball.draw();
    // console.log(ball.color);
    // console.log(balls[i]);
}

// main
let Evil = new EvilBall(width/2, height/2, 0, 0, 40);
Evil.draw();
console.log(Evil);

let counter = 0;
let deadBall = 0;

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, width, height);
  while(balls.length - Evil.counter <= ballNumber) {
    GenerateBall();
  }
  for(let i = 0; i < balls.length; i++) {
    if(balls[i].dead) continue;
    balls[i].draw();
    balls[i].move();
    balls[i].handleCollision(i);
    Evil.draw();
    Evil.move();
    Evil.handleCollision(i);
    Evil.setControls();
  }
  requestAnimationFrame(loop);
}

loop();
