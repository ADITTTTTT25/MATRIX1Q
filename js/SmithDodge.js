class SmithDodge {
  constructor(x, y, width, height) {
    this.w = width;
    this.h = height;

    var options = {
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);

    this.image = loadAnimation(
      "Images/S1.png",
      "Images/S1.png",
      "Images/S1.png",
      "Images/S2.png",
      "Images/S2.png",
      "Images/S2.png",
      "Images/S3.png",
      "Images/S3.png",
      "Images/S3.png",
      "Images/S4.png",
      "Images/S4.png",
      "Images/S4.png",
      "Images/S5.png",
      "Images/S5.png",
      "Images/S5.png",
      "Images/S6.png",
      "Images/S6.png",
      "Images/S7.png",
      "Images/S7.png",
      "Images/S7.png",
      "Images/S7.png",
      "Images/S7.png",
      "Images/S6.png",
      "Images/S6.png",
      "Images/S5.png",
      "Images/S5.png",
      "Images/S4.png",
      "Images/S4.png",
      "Images/S3.png",
      "Images/S3.png",
      "Images/S2.png",
      "Images/S2.png",
      "Images/S1.png",
      "Images/S1.png"
    );

    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    animation(this.image, pos.x, pos.y, this.w, this.h);
  }
}
