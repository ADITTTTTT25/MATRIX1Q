class NeoDodge {
  constructor(x, y, width, height) {
    this.w = width;
    this.h = height;

    var options = {
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);

    this.image = loadAnimation(
      "Images/N1.png",
      "Images/N1.png",
      "Images/N1.png",
      "Images/N2.png",
      "Images/N2.png",
      "Images/N2.png",
      "Images/N3.png",
      "Images/N3.png",
      "Images/N3.png",
      "Images/N4.png",
      "Images/N4.png",
      "Images/N4.png",
      "Images/N5.png",
      "Images/N5.png",
      "Images/N5.png",
      "Images/N6.png",
      "Images/N6.png",
      "Images/N6.png",
      "Images/N7.png",
      "Images/N7.png",
      "Images/N7.png",
      "Images/N8.png",
      "Images/N8.png",
      "Images/N8.png",
      "Images/N9.png",
      "Images/N9.png",
      "Images/N10.png",
      "Images/N10.png",
      "Images/N10.png",
      "Images/N10.png",
      "Images/N10.png",
      "Images/N9.png",
      "Images/N9.png",
      "Images/N8.png",
      "Images/N8.png",
      "Images/N7.png",
      "Images/N7.png",
      "Images/N6.png",
      "Images/N6.png",
      "Images/N5.png",
      "Images/N5.png",
      "Images/N4.png",
      "Images/N4.png",
      "Images/N3.png",
      "Images/N3.png",
      "Images/N2.png",
      "Images/N2.png",
      "Images/N1.png",
      "Images/N1.png"
    );

    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    animation(this.image, pos.x, pos.y, this.w, this.h);
  }
}
