const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

// all variables
var winner;
var allPlayers;
var player;
var database;
var playerCount;
var gameState = 0;
var form;
var bend = 0;
var game;
var background_Img2;
var bckground;
var bckground2;
var bckground3;
var bckground4;
var bckground5;
var bckground6;
var box;
var title;
var titleImg;
var scene2IMG;
var readyUPIMG;
var scene3IMG;
var smithDodges;
var neoDodges;
var screen1 = 1;
var screen2 = 0;
var screen3 = 0;
var screen4 = 0;
var ground;
var song1;
var player1_img, player2_img;
var players = [];
var player1;
var player2;
var health;
var gun;
var sentinel;
var sentinel_IMG;
var neoDodges_img;
var smithDodges_img;
var timer = 0;
var sc;
var telephone_img;
var telephone;
var neoBullet;
var smithBullet;
var neoINFO_IMG;
var smithINFO_IMG;
var smithINFO;
var neoINFO;
var smithBullet_IMG;
var neoBullet_IMG;

function preload() {
  //all images
  titleImg = loadImage("Images/Matrix.png");
  scene2IMG = loadImage("Images/Scene2.jpg");
  readyUPIMG = loadImage("Images/ReadyUP.jpg");
  scene3IMG = loadImage("Images/Scene3.jpg");
  player1_img = loadImage("Images/N1.png");
  player2_img = loadImage("Images/S1.png");
  neoDodges_img = loadAnimation("Images/N8.png");
  smithDodges_img = loadAnimation("Images/S7.png");
  sentinel_IMG = loadImage("Images/Sentinel.png");
  song1 = loadSound("INTRO.mp3");
  telephone_img = loadImage("Images/Telephone.png");
  neoINFO_IMG = loadImage("Images/neo info.png");
  smithINFO_IMG = loadImage("Images/smith info.png");
  smithBullet_IMG = loadImage("Images/smithBullet.png");
  neoBullet_IMG = loadImage("Images/neoBullet.png");
}
function setup() {
  engine = Engine.create();
  world = engine.world;

  createCanvas(displayWidth, displayHeight);
  database = firebase.database();

  //class object
  game = new Game();
  bckground = new Background(500, 400);
  bckground2 = new Background(1500, 400);
  bckground3 = new Background(2500, 400);
  bckground4 = new Background(500, 1200);
  bckground5 = new Background(1500, 1200);
  bckground6 = new Background(2500, 1200);

  //sprites
  box = createSprite(1250, 700, 1200, 300);
  box.shapeColor = "black";

  title = createSprite(1250, 650);
  title.addImage(titleImg);

  ground = createSprite(-700, 700);

  game.getState();

  game.start();

  // song1.setVolume(2);

  player1 = createSprite(-500, -500, 100, 500);
  player1.addImage("player1", player1_img);
  player1.addAnimation("dodge1", neoDodges_img);
  player1.scale = 1.1;
  // player1.debug = true;

  player2 = createSprite(-500, -500, 500, 100);
  player2.addImage("player2", player2_img);
  player2.addAnimation("dodge2", smithDodges_img);
  player2.scale = 0.85;
  // player2.debug = true;
  neoINFO = createSprite(2300, 500);
  neoINFO.addImage(neoINFO_IMG);
  neoINFO.scale = 0.00001;
  smithINFO = createSprite(250, 500);
  smithINFO.addImage(smithINFO_IMG);
  smithINFO.scale = 0.00001;

  neoDodges = new NeoDodge(1300 - Player.distance, 1050);
  smithDodges = new SmithDodge(1300 - Player.distance, 1050);
  telephone = createSprite(-10000, 700);
  telephone.addImage(telephone_img);
  telephone.scale = 1;
}

function draw() {
  Engine.update(engine);

  if (gameState === 0) {
    //telephone logic
    sc = second();

    // to display scene 2 when playerCount === 2
    if (playerCount === 2) {
      form.displayScene2();
    }

    if (screen1 === 1) {
      // // // // //FIRST SCREEN
      bckground.display();
      bckground2.display();
      bckground3.display();
      bckground4.display();
      bckground5.display();
      bckground6.display();
      drawSprites();

      // song1.play();
    }

    if (screen2 === 1) {
      // // // // //SECOND SCREEN
      background(readyUPIMG);
      neoINFO.scale = 0.1;
      smithINFO.scale = 0.1;
      box.destroy();
      title.destroy();
      drawSprites();
    }
    if (screen3 === 1) {
      // // // // //THIRD SCREEN
      background(scene2IMG);
      // smithDodges.display();
      // neoDodges.display();
      smithINFO.destroy();
      neoINFO.destroy();
      drawSprites();
      game.play();

      if (sc >= 45 && sc < 50) {
        telephone.x = displayWidth / 2 + 10;
        telephone.y = -250;
        telephone.velocityY = 13;
      }
      if (telephone.y > 2500) {
        telephone.y = -250;
      }
      if (sc === 55) {
        telephone.y = -250;
        telephone.velocityY = 0;
      }

      // telephone logic for player1
      if (player1.collide(telephone)) {
        player.updatePlayer1Health(100);
        telephone.y = -250;
        telephone.velocityY = 0;
      }
      // Telephone logic for player2
      if (player2.collide(telephone)) {
        player.updatePlayer2Health(100);
        telephone.y = -250;
        telephone.velocityY = 0;
      }
    }
  }
  // if (gameState === 1) {
  if (player.index === 1) {
    if (screen4 === 1) {
      // // // //  //FOURTH SCREEN
      // background(scene3IMG);

      //for scrolling background and Sentinels (AS OF NOW TEMPORARY)
      ground.velocityX = 5;
      ground.scale = 1.6;
      ground.addImage(scene3IMG);
      if (ground.x > 3250) {
        ground.x = -700;
      }
      player1.destroy();
      player2.destroy();
      form.leaderBoard();
      player.updateCount(0);
      game.update(0);
      player.health = 0;
      player.update();
      drawSprites();
    }
  }
  if (player.index === 2) {
    if (screen4 === 1) {
      // // // //  //FOURTH SCREEN
      // background(scene3IMG);

      //for scrolling background and Sentinels (AS OF NOW TEMPORARY)
      ground.velocityX = 5;
      ground.scale = 1.6;
      ground.addImage(scene3IMG);
      if (ground.x > 3250) {
        ground.x = -700;
      }
      player1.destroy();
      player2.destroy();
      telephone.destroy();
      neoBullet.destory();
      smithBullet.destroy();
      form.leaderBoard();
      player.updateCount(0);
      game.update(0);
      player.health = 0;
      player.name = "name";
      player.bulletX = 0;
      player.bulletY = 0;
      player.distance = 0;
      player.height = 0;
      player.update();
      drawSprites();
    }
  }

  // }
}
