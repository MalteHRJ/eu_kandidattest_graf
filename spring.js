class Spring {
   constructor(weight, a, b) {
      this.weight = weight;
      this.a = a;
      this.b = b;
      this.restLength = (450 - 15 * this.weight)+100;
   }
   update() {
      const k = this.weight / 10000;
      //¤ define components of force vector
      let forceVector = { x: this.a.position.x - this.b.position.x, y: this.a.position.y - this.b.position.y };
      //¤ find magnitude of force vector
      const magnitude = Math.sqrt(Math.pow(forceVector.x, 2) + Math.pow(forceVector.y, 2));
      //¤ find displacement from restPosition
      const displacement = magnitude - this.restLength;
      //¤ normalize force vector
      forceVector = { x: forceVector.x / magnitude, y: forceVector.y / magnitude };
      //¤ calculate force from hookes law
      const force = k * displacement;
      //¤ apply force proportional to
      forceVector = { x: forceVector.x * force, y: forceVector.y * force };
      this.b.applyForce(forceVector);
      forceVector = { x: -forceVector.x, y: -forceVector.y };
      this.a.applyForce(forceVector);
      return magnitude;
   }
   draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.a.position.x, this.a.position.y);
      ctx.lineTo(this.b.position.x, this.b.position.y);

      ctx.strokeStyle = '#f4e9dd55';
      if (this.a.color == this.b.color) {
         ctx.strokeStyle = this.b.color;
      }
      ctx.lineWidth = this.weight / 30;
      ctx.stroke();
      ctx.closePath();
     
   }
}
