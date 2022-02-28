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
    new vertWall( 180, 20),
    new vertWall( 180, 40),
    new vertWall( 180, 60),
    new vertWall( 180, 80),
    new vertWall( 180, 100),
    new vertWall( 180, 120),
    new vertWall( 20, 160),
    new vertWall( 20, 180),
    new vertWall( 20, 200),
    new vertWall( 20, 220),
    new vertWall( 20, 140),
    new vertWall( 20, 240),
    new vertWall( 40, 140),
    new vertWall( 40, 160),
    new vertWall( 40, 180),
    new vertWall( 40, 200),
    new vertWall( 40, 220),
    new vertWall( 40, 240),
    new vertWall( 380, 20),
    new vertWall( 400, 20), 
    new vertWall( 60, 280),
    new vertWall( 80, 260),
    new vertWall( 80, 280),
    new vertWall( 80, 320),
    new vertWall( 80, 340),
    new vertWall( 80, 360),
    new vertWall( 20, 280),
    new vertWall( 20, 300),
    new vertWall( 20, 320),
    new vertWall( 20, 360),
    new vertWall( 20, 400),
    new vertWall( 20, 406),
    new vertWall( 40, 400),
    new vertWall( 40, 406),
    new vertWall( 116, 380),
    new vertWall( 60, 340),
    new vertWall( 50, 320),
    new vertWall( 260, 300),
    new vertWall( 240, 320),
    new horzWall( 20, 280),
    new horzWall( 40, 260),
    new horzWall( 60, 260),
    new horzWall( 40, 280),
    new horzWall( 0, 400),
    new horzWall( 40, 400),
    new horzWall( 60, 400),
    new horzWall( 20, 380),
    new horzWall( 40, 380),
    new horzWall( 80, 400),
    new horzWall( 80, 380),
    new horzWall( 100, 400),
    new horzWall( 100, 380),
    new horzWall( 0, 200),
    new horzWall( 40, 340),

    new horzWall( 180, 20),
    new horzWall( 200, 20),
    new horzWall( 220, 20),
    new horzWall( 240, 20),
    new horzWall( 260, 20),
    new horzWall( 280, 20),
    new horzWall( 300, 20),
    new horzWall( 320, 20),
    new horzWall( 340, 20),
    new horzWall( 360, 20),
    new horzWall( 400, 20),
    new horzWall( 420, 20),
    new horzWall( 440, 20),
    new horzWall( 460, 20),
    new horzWall( 480, 20),
    new horzWall( 500, 20),
    new horzWall( 520, 20),
    new horzWall( 80, 300),
    new horzWall( 80, 320),
    new horzWall( 100, 300),
    new horzWall( 100, 320),
    new horzWall( 120, 300),
    new horzWall( 120, 320),
    new horzWall( 140, 300),
    new horzWall( 140, 320),
    new horzWall( 160, 300),
    new horzWall( 160, 320),
    new horzWall( 180, 300),
    new horzWall( 180, 320),
    new horzWall( 200, 300),
    new horzWall( 200, 320),
    new horzWall( 220, 300),
    new horzWall( 220, 320),
    new horzWall( 240, 300),
    new horzWall( 240, 340),
    new horzWall( 260, 320),
    new horzWall( 260, 340),
    new horzWall( 280, 320),
    new horzWall( 280, 340),
    new horzWall( 300, 320),
    new horzWall( 300, 340),
    new horzWall( 320, 320),
    new horzWall( 320, 340),
    new horzWall( 340, 320),
    new horzWall( 340, 340),
    new horzWall( 360, 320),
    new horzWall( 360, 340),
    new horzWall( 380, 320),
    new horzWall( 380, 340),
    new horzWall( 400, 320),
    new horzWall( 400, 340),
    new horzWall( 540, 20),
    new horzWall( 420, 320),
    new horzWall( 420, 340),
    new horzWall( 440, 320),
    new horzWall( 440, 340),
    new horzWall( 460, 320),
    new horzWall( 460, 340),
    new horzWall( 480, 320),
    new horzWall( 480, 340),
    new horzWall( 500, 320),
    new horzWall( 500, 340),
    new horzWall( 520, 320),
    new horzWall( 520, 340),
    new horzWall( 540, 320),
    new horzWall( 540, 340),
    new horzWall( 560, 320),
    new horzWall( 560, 340),
    new horzWall( 580, 300),
    new horzWall( 580, 340),
    new horzWall( 600, 300),
    new horzWall( 600, 320),
    new vertWall( 580, 304),
    new vertWall( 600, 324),
    new vertWall( 620, 320),
    new vertWall( 620, 340),
    new vertWall( 620, 360),
    new vertWall( 620, 380),
    new vertWall( 620, 400),
    new vertWall( 640, 380),
    new vertWall( 640, 360),
    new vertWall( 640, 340),
    new vertWall( 640, 320),
    new vertWall( 640, 280),
    new vertWall( 660, 280),
    new vertWall( 660, 300),
    new vertWall( 660, 340),
    new vertWall( 680, 260),
    new vertWall( 680, 300),
    new vertWall( 680, 340),
    new vertWall( 700, 280),
    new vertWall( 700, 300),
    new vertWall( 700, 340),
    new vertWall( 720, 280),
    new vertWall( 720, 300),
    new vertWall( 720, 320),
    new vertWall( 720, 340),
    new vertWall( 720, 260),
    new vertWall( 740, 280),
    new vertWall( 740, 300),
    new vertWall( 740, 320),
    new vertWall( 740, 340),
    new vertWall( 740, 260),
    new vertWall( 740, 360),
    new vertWall( 740, 380),
    new vertWall( 740, 400),
    new vertWall( 720, 360),
    new vertWall( 720, 380),
    new vertWall( 740, 240),
    new vertWall( 740, 220),
    new vertWall( 740, 200),
    new vertWall( 740, 180),
    new vertWall( 740, 160),
    new vertWall( 740, 140),
    new vertWall( 740, 120),
    new vertWall( 740, 100),
    new vertWall( 740, 80),
    new vertWall( 740, 60),
    new vertWall( 720, 240),
    new vertWall( 720, 220),
    new vertWall( 720, 200),
    new vertWall( 720, 180),
    new vertWall( 720, 160),
    new vertWall( 720, 140),
    new vertWall( 720, 120),
    new vertWall( 720, 100),
    new vertWall( 720, 80),
    new vertWall( 720, 60),
    new vertWall( 720, 40),
    new vertWall( 740, 40),
    new vertWall( 720, 20),
    new vertWall( 740, 20),
    new vertWall( 740, 0),
    new vertWall( 640, 260),

    new horzWall( 620, 300),
    new horzWall( 620, 420),
    new horzWall( 624, 300),
    new horzWall( 644, 260),
    new horzWall( 664, 260),
    new horzWall( 680, 280),
    new horzWall( 684, 260),
    new horzWall( 704, 260),
    new horzWall( 640, 420),
    new horzWall( 660, 420),
    new horzWall( 680, 420),
    new horzWall( 700, 420),
    new horzWall( 720, 420),
    new horzWall( 724, 420),
    new horzWall( 700, 360),
    new horzWall( 680, 340),
    new horzWall( 664, 360),
    new horzWall( 660, 360),
    new horzWall( 640, 340),

    new horzWall( 700, 20),
    new horzWall( 680, 20),
    new horzWall( 660, 20),
    new horzWall( 640, 20),
    new horzWall( 620, 20),
    new horzWall( 600, 20),
    new horzWall( 580, 20),
    new horzWall( 560, 20),

]



let player = new Sprite(10, 10, 'blue', 6, 6)
let crystal1 = new Monster( 147, 70, 'lightblue', 8, 12, 'crystal')
let crystal2 = new Monster( 100, 389, 'lightblue', 12, 8, 'crystal')
let crystal3 = new Monster( 690, 267, 'lightblue', 12, 8, 'crystal')
let crystal4 = new Monster( 388, 27, 'lightblue', 8, 12, 'crystal')
let eye = new Monster(375, 150, 'purple', 50, 50, 'eye')


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
