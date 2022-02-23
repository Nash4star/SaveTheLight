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
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.height, this.width)
        }
    }
}

let player = new Sprite(10, 10, 'blue', 4, 4)
let eye = new Sprite(425, 100, 'white', 16, 16)

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', movementHandler)
    setInterval(gameLoop, 60)
})

const gameLoop = () => {
    if (eye.alive) {
        detectHit()
    }
    ctx.clearRect(0, 0, game.width, game.height)
    movement.textContent = player.x + ', ' + player.y
    player.render()
    if (eye.alive) {
        eye.render()
    }
}

const movementHandler = (e) => {
    switch (e.keyCode) {
        case (87):
            // we'll move the player up
            player.y -= 10
            // then break the case
            break
        case (65):
            // move the player left
            player.x -= 10
            break
        case (83):
            // move player down
            player.y += 10
            break
        case (68):
            // move the player right
            player.x += 10
            break
    }
}

const detectHit = () => {
    if (player.x < eye.x + eye.width
       && player.x + player.width > eye.x
       && player.y < eye.y + eye.height
       && player.y + player.height > eye.y) {
           eye.alive = false
           document.getElementById('status').textContent = 'You saved the Light!'
       }
}
