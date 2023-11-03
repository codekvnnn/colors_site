const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full browser width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Shape constructor
function Shape(x, y, radius, color, velocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = velocity;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  this.update = function() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Re-draw
    this.draw();
  };
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update shapes
  shapes.forEach(shape => {
    shape.update();
  });
}

// Handle mouse
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Create shapes
const shapes = [];
for (let i = 0; i < 50; i++) {
  const radius = Math.random() * 5;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  const velocity = {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2
  };
  shapes.push(new Shape(x, y, radius, color, velocity));
}

// Start animation
animate();

// Create a shape on click
canvas.addEventListener('click', (event) => {
  const radius = Math.random() * 5;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  const velocity = {
    x: (Math.random() - 0.5) * 4,
    y: (Math.random() - 0.5) * 4
  };
  shapes.push(new Shape(event.clientX, event.clientY, radius, color, velocity));
});

// Follow mouse movement
canvas.addEventListener('mousemove', (event) => {
  const radius = Math.random() * 5;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  const velocity = {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2
  };
  shapes.push(new Shape(event.clientX, event.clientY, radius, color, velocity));
});
