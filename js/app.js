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
            // if (this.x + this.width >= walls.position.x) {
            //     this.x = walls.position.x - this.width
            // }
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
// class vertWall {
//     // the reason I put the argumnet in as an object is to make it easier when giving it a location
//     constructor({ position }) {
//         this.position = position,
//         this.height = 20,
//         this.width = 4
//     }
    
//     draw() {
//         ctx.fillStyle = 'red'
//         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
//     }
// }

// class horzWall {
//     constructor( {position} ) {
//         this.position = position,
//         this.height = 4,
//         this.width = 20
//     }
//     draw() {
//         ctx.fillStyle = 'red'
//         ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
//     }

// }

// const walls = [
//     new vertWall({
//         position : {
//             x: 20,
//             y: 0
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 40,
//             y: 0
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 40,
//             y: 40
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 60,
//             y: 0
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 60,
//             y: 20
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 60,
//             y: 40
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 60,
//             y: 60
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 20,
//             y: 80
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 80,
//             y: 20
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 80,
//             y: 40
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 80,
//             y: 60
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 80,
//             y: 80
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 80,
//             y: 100
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 100,
//             y: 20
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 100,
//             y: 40
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 100,
//             y: 60
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 100,
//             y: 80
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 120,
//             y: 0
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 120,
//             y: 20
//         }
//     }),new vertWall({
//         position : {
//             x: 120,
//             y: 40
//         }
//     }),new vertWall({
//         position : {
//             x: 120,
//             y: 60
//         }
//     }),new vertWall({
//         position : {
//             x: 120,
//             y: 80
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 120,
//             y: 100
//         }
//     }),new vertWall({
//         position : {
//             x: 140,
//             y: 120
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 140,
//             y: 100
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 140,
//             y: 80
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 140,
//             y: 60
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 100,
//             y: 100
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 100,
//             y: 120
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 160,
//             y: 60
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 160,
//             y: 80
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 160,
//             y: 100
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 20,
//             y: 120
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 40,
//             y: 120
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 20,
//             y: 16
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 80,
//             y: 20
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 0,
//             y: 40
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 20,
//             y: 40
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 24,
//             y: 80
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 44,
//             y: 80
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 0,
//             y: 120
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 40,
//             y: 120
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 44,
//             y: 120
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 64,
//             y: 120
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 0,
//             y: 56
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 20,
//             y: 56
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 100,
//             y: 140
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 120,
//             y: 140
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 144,
//             y: 60
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 140,
//             y: 140
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 160,
//             y: 140
//         }
//     }),
//     new horzWall({
//         position : {
//             x: 164,
//             y: 140
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 180,
//             y: 0
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 180,
//             y: 20
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 180,
//             y: 40
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 180,
//             y: 60
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 180,
//             y: 80
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 180,
//             y: 100
//         }
//     }),
//     new vertWall({
//         position : {
//             x: 180,
//             y: 120
//         }
//     }),

//     new vertWall({
//         position : {
//             x: 20,
//             y: 0
//         }
//     }),

// ]

const randomPlaceCrystal = (max) => {
    return Math.floor(Math.random() * max)
}


let player = new Sprite(10, 10, 'blue', 6, 6)
let crystal1 = new Monster( 147, 70, 'white', 8, 12, 'crystal')
let crystal2 = new Monster(randomPlaceCrystal(game.width), randomPlaceCrystal(game.height), 'white', 12, 20, 'crystal')
let crystal3 = new Monster(randomPlaceCrystal(game.width), randomPlaceCrystal(game.height), 'white', 12, 20, 'crystal')
let crystal4 = new Monster(randomPlaceCrystal(game.width), randomPlaceCrystal(game.height), 'white', 12, 20, 'crystal')
let eye = new Monster(400, 200, 'white', 50, 50, 'eye')


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
    // walls.forEach(wall => {
    //     wall.draw()
    // })
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
