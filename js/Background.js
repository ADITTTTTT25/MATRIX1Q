class Background {
  constructor(x, y, width, height) {
    this.w = width;
    this.h = height;

    var options = {
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);

    this.image = loadAnimation(
      "Images/1.png",
      "Images/2.png",
      "Images/3.png",
      "Images/4.png",
      "Images/5.png",
      "Images/6.png",
      "Images/7.png",
      "Images/8.png",
      "Images/9.png",
      "Images/10.png",
      "Images/11.png",
      "Images/12.png",
      "Images/13.png",
      "Images/14.png",
      "Images/15.png",
      "Images/16.png"
    );

    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    animation(this.image, pos.x, pos.y, this.w, this.h);
  }
}
