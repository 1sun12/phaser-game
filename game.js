// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;

// add collectable items to the game
let health = document.getElementById("health")

function addItems() {
  items = game.add.physicsGroup();
  createItem(250, 250, 'coin');
  createItem(550, 300, 'coin');
  createItem(600, 500, 'coin');
  createItem(200, 500, 'coin');
  createItem(400, 375, 'poison');
  createItem(100, 130, 'poison');
  createItem(100, 20, 'star');
  createItem(500, 20, 'poison');
  createItem(700, 70, 'poison');

}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(200, 300, 'platform2');
  platforms.create(500, 350, 'platform2');
  platforms.create(300, 450, 'platform');
  platforms.create(100, 550, 'platform');
  platforms.create(500, 550, 'platform2');
  platforms.create(600, 150, 'platform');
  platforms.create(0, 200, 'platform');
  platforms.create(400, 70, 'platform');
  platforms.create(0, 70, 'platform');

  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  // console.log(item.key);
  console.log (item.key);

  item.kill();


  if (item.key === 'coin'){
    currentScore = currentScore + 10
  }
  
  if (item.key === 'poison'){
    currentScore = currentScore - 10
  }
  if (item.key === 'star'){
    currentScore = currentScore + 60
  }

  if (item.key === 'poison'){
    health = health.value -= 0

      alert ("Oh no you lost all your health!")

      location.reload();
  }
  if (currentScore === winningScore) {
    createBadge();
}
}


// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#FFFF87';
    
    //Load images
    game.load.image('platform', 'photos/platform_2.png');
    game.load.image('platform2', 'photos/platform_1.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'photos/skeleton_sprite.png', 55, 65);
    game.load.spritesheet('coin', 'photos/coin.png', 36, 44);
    game.load.spritesheet('badge', 'photos/badge.png', 42, 54);
    game.load.spritesheet('poison','photos/poison.png', 32, 32);
    game.load.spritesheet('star','photos/star.png', 32, 32);    
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }

  function render() {

  }

};
