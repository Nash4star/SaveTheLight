const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const ctx = game.getContext('2d')


game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

class Sprite {
    constructor(x, y, color, height, width) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.alive = true,
        this.speed = 7,


        this.direction = {
            up: false,
            down: false,
            right: false,
            left: false,
        }

    }
    setDirection = function (key) {
		console.log('the key pressed is', key)
		if (key.toLowerCase() == 'w') this.direction.up = true
		if (key.toLowerCase() == 'a') this.direction.left = true
		if (key.toLowerCase() == 's') this.direction.down = true
		if (key.toLowerCase() == 'd') this.direction.right = true
	}
    unsetDirection = function (key) {
		console.log('the key pressed is', key)
		if (key.toLowerCase() == 'w') this.direction.up = false
		if (key.toLowerCase() == 'a') this.direction.left = false
		if (key.toLowerCase() == 's') this.direction.down = false
		if (key.toLowerCase() == 'd') this.direction.right = false
	}
    movePlayer = function () {
		// move up
		if (this.direction.up) {
			this.y -= this.speed
			if (this.y <= 0) {
				this.y = 0
			}
		}
		// move left
		if (this.direction.left) {
			this.x -= this.speed
			if (this.x <= 0) {
				this.x = 0
			}
            
		}
		// move down
		if (this.direction.down) {
			this.y += this.speed
			if (this.y + this.height >= game.height) {
				this.y = game.height - this.height
			}
		}
		// move right
		if (this.direction.right) {
			this.x += this.speed
			if (this.x + this.width >= game.width) {
                console.log('this is coliding')
				this.x = game.width - this.width
			} 
            
		}
        if (this.x + this.width >= walls.x
            && this.x <= walls.x + walls.width
            && this.y + this.height >= walls.y
            && this.y <= walls.y + walls.height) {
                console.log('colision working')
        }
        
	}   
    render = function () {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}

class Monster {
    constructor(x, y, color, width, height, type) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.height = height,
        this.width = width,
        this.type = type,
        this.alive = true
    }
    render = function () {
        // ctx.fillStyle will determine the color(or style) of your element
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
// this is to create a maze to go though collect the crystals 
// and summon the boss and beat it.
class vertWall {
    // the reason I put the argumnet in as an object is to make it easier when giving it a location
    constructor(x, y) {
        this.x = x,
        this.y = y,
        this.height = 20,
        this.width = 4
    }
    
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    render = function () {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class horzWall {
    constructor(x, y) {
        this.x = x,
        this.y = y,
        this.height = 4,
        this.width = 20
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    render = function () {
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const walls = [
    new vertWall( 20, 0 ),
    new vertWall( 40, 0 ),
    new vertWall( 40, 40 ),
    new vertWall( 60, 0 ),
    new vertWall( 60, 20 ),
    new vertWall( 60, 40 ),
    new vertWall( 60, 60 ),   
    new vertWall( 20, 80 ),
    new vertWall( 80, 20 ),
    new vertWall( 80, 40),
    new vertWall( 80, 60),
    new vertWall( 80, 80),
    new vertWall( 80, 100),
    new vertWall( 100, 20),
    new vertWall( 100, 40),
    new vertWall( 100, 60),
    new vertWall( 100, 80),
    new vertWall( 120, 0),
    new vertWall( 120, 20), 
    new vertWall( 120, 40),
    new vertWall( 120, 60),
    new vertWall( 120, 80),
    new vertWall( 120, 100),
    new vertWall( 140, 120),
    new vertWall( 140, 100),
    new vertWall( 140, 80),
    new vertWall( 140, 60), 
    new vertWall( 100, 100),
    new vertWall( 100, 120), 
    new vertWall( 160, 60),
    new vertWall( 160, 80),
    new vertWall( 160, 100),
    new vertWall( 20, 120),
    new vertWall( 40, 120),
    new horzWall( 20, 16),
    new horzWall( 80, 20),
    new horzWall( 0, 40),
    new horzWall( 20, 40),
    new horzWall( 24, 80),
    new horzWall( 44, 80),
    new horzWall( 0, 120),
    new horzWall( 40, 120),
    new horzWall( 44, 120),
    new horzWall( 64, 120),
    new horzWall( 0, 56),
    new horzWall( 20, 56),
    new horzWall( 100, 140),
    new horzWall( 120, 140),
    new horzWall( 144, 60),
    new horzWall( 140, 140),
    new horzWall( 160, 140), 
    new horzWall( 164, 140), 
    new vertWall( 180, 0),
    new vertWall( 180, 20),
    new vertWall( 180, 40),
    new vertWall( 180, 60),
    new vertWall( 180, 80),
    new vertWall( 180, 100),
    new vertWall( 180, 120),
    new vertWall( 20, 0)
]


const randomPlaceCrystal = (max) => {
    return Math.floor(Math.random() * max)
}


let player = new Sprite(10, 10, 'blue', 6, 6)
let crystal1 = new Monster( 147, 70, 'white', 8, 12, 'crystal')
let crystal2 = new Monster(randomPlaceCrystal(game.width), randomPlaceCrystal(game.height), 'white', 12, 20, 'crystal')
let crystal3 = new Monster(randomPlaceCrystal(game.width), randomPlaceCrystal(game.height), 'white', 12, 20, 'crystal')
let crystal4 = new Monster(randomPlaceCrystal(game.width), randomPlaceCrystal(game.height), 'white', 12, 20, 'crystal')
let eye = new Monster(400, 200, 'red', 50, 50, 'eye')


const stopGameLoop = () => {clearInterval(gameInterval)}



document.addEventListener('DOMContentLoaded', function () {
    gameInterval
})

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    // the way to be able to kill/spawn the monster is to collect all the crystals
   
    if (crystal1.alive) {
        crystal1.render()
        detectHit(crystal1)
    } else if (crystal2.alive) {
        crystal2.render()
        detectHit(crystal2)

    } else if (crystal3.alive) {
        crystal3.render()
        detectHit(crystal3)

    } else if (crystal4.alive) {
        crystal4.render()
        detectHit(crystal4)

    } else if (eye.alive) {
        document.querySelector('#status').textContent = 'Now destroy the eye!'
        eye.render()
        detectHit(eye)

    } else {
        stopGameLoop()
        document.querySelector('#status').textContent = 'You saved the Light!'
    }
    
    movement.textContent = player.x + ', ' + player.y
    player.render()
    player.movePlayer()
    walls.forEach(wall => {
        wall.draw()
    })
}

document.addEventListener('keydown', (e) => {
    // when the key is pressed, change the direction
    player.setDirection(e.key)
})

document.addEventListener('keyup', (e) => {
    // now if any of the keys that are released correspond to a movement key
    // change the corresponding direction to false
    if (['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

const detectHit = (thing) => {
    if (player.x < thing.x + thing.width
       && player.x + player.width > thing.x
       && player.y < thing.y + thing.height
       && player.y + player.height > thing.y) {
           thing.alive = false
           document.getElementById('status').textContent = 'powering up!'
       }
}

let gameInterval = setInterval(gameLoop, 60)
