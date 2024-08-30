class Particle {
   constructor(initials, color, adjacencyList, id) {
      this.id = id;
      this.adjacencyList = adjacencyList;
      this.springList = new Set();
      this.position = { x: 0, y: 0 };
      this.velocity = { x: 0, y: 0 };
      this.initials = initials;
      this.color = color;
      this.dampening = 0.95;
      this.radius = 10;
      this.isCurrent = false;
   }
   applyForce(force) {
      // force=mass*accelaration
      // if mass=1 => force=accelaration

      this.velocity.x += force.x;
      this.velocity.y += force.y;
   }
   update() {
      this.velocity.x *= this.dampening;
      this.velocity.y *= this.dampening;

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
   }
   checkBounds(canvasWidth, canvasHeight) {
      if (this.position.x < 0) {
         this.position.x = 0;
         this.velocity.x *= -this.dampening;
      }
      if (this.position.x > canvasWidth) {
         this.position.x = canvasWidth;
         this.velocity.x *= -this.dampening;
      }
      if (this.position.y < 0) {
         this.position.y = 0;
         this.velocity.y *= -this.dampening;
      }
      if (this.position.y > canvasHeight) {
         this.position.y = canvasHeight;
         this.velocity.y *= -this.dampening;
      }
   }
   draw(ctx) {
      this.checkBounds(ctx.canvas.width, ctx.canvas.height);
      //@ draw circle
      ctx.beginPath();
      if (this.isCurrent) {
         this.radius = 16;
      } else {
         this.radius = 6;
      }
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#0a0906';
      ctx.strokeStyle = this.color;
      if (this.isCurrent) {
         ctx.fillStyle = this.color;
         ctx.strokeStyle = '#f4e9dd';
      }
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      //@ draw initials
      if (this.isCurrent) {
         ctx.font = `${this.radius}px Inter`;
         ctx.fillStyle = '#f4e9dd';
         const textSize = ctx.measureText(this.initials);
         ctx.fillText(this.initials, this.position.x - textSize.width / 2, this.position.y + textSize.actualBoundingBoxAscent / 2);
      }
   }
}
