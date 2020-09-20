class Game {
  constructor() {}
  getState() {
    database.ref("gameState").on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  // getWinner() {
  //   database.ref("winner").on("value", function (data) {
  //     winner = data.val();
  //   });
  // }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    neoBullet = createSprite(1300, 1050, 50, 10);
    neoBullet.visible = false;
    neoBullet.addImage(neoBullet_IMG);
    neoBullet.scale = 0.25;
    smithBullet = createSprite(1300, 1050, 50, 10);
    smithBullet.visible = false;
    smithBullet.addImage(smithBullet_IMG);
    smithBullet.scale = 0.25;
    players = [player1, player2];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();

    var x = 100;
    var y = 200;
    var index = 0;
    drawSprites();
    if (allPlayers != undefined) {
      for (var plr in allPlayers) {
        index = index + 1;
        x = 1300 - allPlayers[plr].distance;
        y = 2100 - allPlayers[plr].height;

        if (
          allPlayers.player1.bulletX !== 0 ||
          allPlayers.player1.bulletY !== 0
        ) {
          neoBullet.visible = true;
          neoBullet.x = allPlayers.player1.bulletX;
          neoBullet.y = allPlayers.player1.bulletY;
        }
        if (
          allPlayers.player2.bulletX2 !== 0 ||
          allPlayers.player2.bulletY2 !== 0
        ) {
          smithBullet.visible = true;
          smithBullet.x = allPlayers.player2.bulletX;
          smithBullet.y = allPlayers.player2.bulletY;
        }

        players[index - 1].x = x;
        players[index - 1].y = y;
        //bullet collision logic - Player1 Bullet

        if (neoBullet.collide(player2)) {
          var player2Health = allPlayers.player2.health - 10;
          player.bulletX = 0;
          player.updatePlayer2Health(player2Health);
        }

        // Bullet Collision logic - Player 2
        if (smithBullet.collide(player1)) {
          var player1Health = allPlayers.player1.health - 10;
          player.bulletX = 0;
          player.updatePlayer1Health(player1Health);
        }

        // FOR NAME AND HEALTH
        // if (player.index === 1) {
        // Player.getPlayerInfo();
        // textSize(20);
        // stroke("black");
        // fill("green");
        // strokeWeight(5);

        // text(
        //   allPlayers.player1.name +
        //     " : " +
        //     allPlayers.player1.health +
        //     " / 100 HP",
        //   x - 100,
        //   y - 250
        // );
        // }
        // if (player.index === 2) {
        // Player.getPlayerInfo();
        // textSize(20);
        // stroke("black");
        // fill("green");
        // strokeWeight(5);
        // console.log(allPlayers.player2.health);
        // text(
        //   allPlayers.player2.name +
        //     " : " +
        //     allPlayers.player2.health +
        //     " / 100 HP",
        //   x - 100,
        //   y - 250
        // );
        // }
      }
      // end of for loop
      textSize(20);
      stroke("black");
      fill("green");
      strokeWeight(5);
      //name for player 1

      text(
        "Hello Player 2",
        // allPlayers.player2.name +
        //   " : " +
        //   allPlayers.player2.health +
        //   " / 100 HP",
        allPlayers.player2.distance,
        allPlayers.player2.height
      );
      textSize(20);
      stroke("black");
      fill("green");
      strokeWeight(5);
      text(
        "Hello Player 1",
        allPlayers.player1.distance,
        allPlayers.player1.height
      );

      if (allPlayers.player1.health <= 0 || allPlayers.player2.health <= 0) {
        screen1 = 0;
        screen2 = 0;
        screen3 = 0;
        screen4 = 1;

        // player.updatePlayer2Health(500);
        // game.update(1);
      }
    }

    if (keyIsDown(32)) {
      if (
        player.index === 1 &&
        player.bulletX === 0 &&
        player.height === 1050
      ) {
        player.bulletX = player1.x + 75;
      }
      if (player.index === 1 && player.height === 1050) {
        player.bulletX = player.bulletX + 50;
        player.bulletY = 900;
        player.update();
      }
      if (
        player.index === 2 &&
        player.bulletX === 0 &&
        player.height === 1050
      ) {
        player.bulletX = player2.x + 75;
      }
      if (player.index === 2 && player.height === 1050) {
        player.bulletX = player.bulletX - 50;
        player.bulletY = 900;
        player.update();
      }
    }

    // for og pos
    if (player.index === 1 && player.distance === 0) {
      player.distance = 1150;
      player.update();
    }
    if (player.index === 2 && player.distance === 0) {
      player.distance = -1050;
      player.update();
    }
    if (player.index === 1) {
      if (player.distance <= 250) {
        player.distance = 250;
        player.update();
      }
    }
    if (player.index === 2) {
      if (player.distance >= -250) {
        player.distance = -250;
        player.update();
      }
    }

    if (player.bulletX > 2500) {
      player.bulletX = 0;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.distance -= 10;

      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }
    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.height += 50;
      player.update();
    } else {
      player.height = 1050;
      player.update();
    }
    if (player.height > 1800) {
      player.height = 1800;
      player.update();
    }

    drawSprites();
  }
}
