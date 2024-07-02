const root = document.getElementById('root')
const color = ['#00ffff', '#ffff00', '#800080', '#00ff00', '#ff0000', '#0000ff', '#ff7f00', '#7f7f7f']
let currColor = ''
let currLetter = ''
let letterIndex = 0;
let startx = 0, endx = 2, starty = 3, endy = 5;
const scoreHTML = document.getElementById("score")
let score = 0;

//Letter Grid with all possible shapes
const letterGrid = {
    I: [
        [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
        [[1, 1, 1, 1], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    J: [
        [[0, 0, 1], [0, 0, 1], [0, 1, 1]],
        [[1, 1, 0], [1, 0, 0], [1, 0, 0]],
        [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
        [[1, 1, 1], [0, 0, 1], [0, 0, 0]],
    ],
    L: [
        [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
        [[1, 0, 0], [1, 0, 0], [1, 1, 0]],
        [[1, 1, 1], [1, 0, 0], [0, 0, 0]],
        [[0, 1, 1], [0, 0, 1], [0, 0, 1]]
    ],
    O: [
        [[1, 1, 0], [1, 1, 0], [0, 0, 0]]
    ],
    S: [
        [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
        [[0, 1, 0], [0, 1, 1], [0, 0, 1]]
    ],
    T: [
        [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
        [[1, 0, 0], [1, 1, 0], [1, 0, 0]],
        [[0, 0, 1], [0, 1, 1], [0, 0, 1]],
        [[1, 1, 1], [0, 1, 0], [0, 0, 0]]
    ],
    Z: [
        [[1, 1, 0],[0, 1, 1], [0, 0, 0]],
        [[0, 0, 1], [0, 1, 1], [0, 1, 0]]
    ]
}
//10X20 grid , displaying on the screen
const grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
//getting random letter from IJOSTZ 
function getLetter() {
    const characters = 'JLOSTZ';
    const charactersLength = characters.length;
    currLetter = characters.charAt(Math.floor(Math.random() * charactersLength));
    const letter = letterGrid[currLetter][0];
    let x = 0, y = 0;
    for (let i = 0; i <= 2; i++) {
        for (let j = 3; j <= 5; j++) {
            if (letter[x][y] === 1) document.getElementById(`${i}-${j}`).style.backgroundColor = currColor
            grid[i][j] = letter[x][y++]
        }
        x++;
        y = 0;
    }
}

//To check if the block can slide more or not.
function atEnd() {
    for (let i = starty; i < endy; i++) if (grid[endx] && grid[endx][i] && grid[endx][i] === 2) return true;
    return false;
}
//Checking if the Game over .
function GameOver() {
    for (let i = 0; i <= 2; i++)
        for(let j=3;j<=5;j++)
            if(grid[i][j]==2) return true;
    return false;
}

//sliding the block after every 500 ms , this function is called inside setInterval
function slide() {
    if (startx == 0) {
        if(GameOver()){
            alert(`Game Over\nYour Total Score = ${score}`)
            location.reload()
        }
        currColor = getColor()
        getLetter()
        startx++;
        endx++;
    }
    else if (endx == 21 || atEnd()) {
        for (let i = startx; i <= endx; i++) {
            for (let j = starty; j <= endy; j++) {
                if (grid[i] && grid[i][j] &&  grid[i][j] === 1) grid[i][j] = 2;
            }
        }
        score+=10
        scoreHTML.innerHTML = score
        startx = 0;
        starty = 3;
        endx = 2;
        endy = 5;
        currColor = '';
    }
    else {
        for (let i = endx; i >= startx; i--) {
            for (let j = starty; j <= endy; j++) {
                if (grid[i - 1][j] === 1) {
                    const a = document.getElementById(`${i}-${j}`)
                    const b = document.getElementById(`${i - 1}-${j}`)
                    if(a) a.style.backgroundColor = currColor
                    if(b) b.style.backgroundColor = ''
                }
                grid[i][j] = grid[i - 1][j]
            }
        }
        for (let i = starty; i <= endy; i++) {
            grid[startx - 1][i] = 0
            document.getElementById(`${startx - 1}-${i}`).style.backgroundColor = ''
        }
        startx++; endx++;
    }
}
//calculating the score
function scoring(){
    for(let i=0;i<=19;i++){
        const array = grid[i].toLocaleString().replaceAll(",","")
        if(array.indexOf('0')==-1){
            for (let j = 0; j <= 9; j++) {
                if (grid[i - 1][j] === 2) {
                    const a = document.getElementById(`${i}-${j}`)
                    const b = document.getElementById(`${i - 1}-${j}`)
                    if(a) a.style.backgroundColor = document.getElementById(`${i-1}-${j}`).style.backgroundColor
                    if(b) b.style.backgroundColor = ''
                }
                grid[i][j] = grid[i - 1][j]
            }
            for (let i = starty; i <= endy; i++) {
                grid[startx - 1][i] = 0
                document.getElementById(`${startx - 1}-${i}`).style.backgroundColor = ''
            }
        }
    }
}
//listening keydown events for arrow keys
document.onkeydown = checkKey;
// arrow keys functionality
function checkKey(e) {

    e = e || window.KeyboardEvent;
    //up arrow
    if (e.keyCode == '38') {
        // change the shape of the block
        letterIndex++;
        letterIndex%=letterGrid[currLetter].length
        let x=0,y=0;
        for(let i=startx-1;i<endx;i++){
            for(let j=starty;j<=endy;j++){
                grid[i][j] = letterGrid[currLetter][letterIndex][x][y++]
                if(grid[i][j]==1) document.getElementById(`${i}-${j}`).style.backgroundColor = currColor
                else if(grid[i][j]==0) document.getElementById(`${i}-${j}`).style.backgroundColor = ''
            }
            x++;
            y=0
        }
    }
    // down arrow
    else if (e.keyCode == '40') {
        // shifting down the block
        if(GameOver()){
            alert("Game Over")
            location.reload()
        }
        else if (atEnd()) {
            for (let i = startx; i <= endx; i++) {
                for (let j = starty; j <= endy; j++) {
                    if (grid[i][j] === 1) grid[i][j] = 2;
                }
            }
            startx = 0;
            starty = 3;
            endx = 2;
            endy = 5;
            currColor = '';
        }
        else if (endx < 19) {
            for (let i = endx; i >= startx; i--) {
                for (let j = starty; j <= endy; j++) {
                    if (grid[i-1] && grid[i-1][j] && grid[i - 1][j] === 1) {
                        const a = document.getElementById(`${i - 1}-${j}`)
                        const b = document.getElementById(`${i}-${j}`)
                        if(a) a.style.backgroundColor = ''
                        if(b) b.style.backgroundColor = currColor
                    }
                    grid[i][j] = grid[i - 1][j]
                }
            }
            for (let i = starty; i <= endy; i++) {
                grid[startx - 1][i] = 0
                document.getElementById(`${startx - 1}-${i}`).style.backgroundColor = ''
            }
            startx++; endx++;
        }
    }
    // left arrow 
    else if (e.keyCode == '37') {
        // shifting the block towards left side
        if (starty > 0) {
            let temp = false;
            for(let i = startx;i<=endx;i++){
                if(grid[i][starty-1]==2){
                    temp = true;
                    break;
                }
            }
            if(!temp) {
                for (let i = startx-1; i < endx; i++) {
                    for (let j = starty; j <= endy; j++) {
                        if (grid[i][j] === 1) {
                            document.getElementById(`${i}-${j - 1}`).style.backgroundColor = currColor
                            document.getElementById(`${i}-${j}`).style.backgroundColor = ''
                        }
                        grid[i][j - 1] = grid[i][j]
                        grid[i][j] = 0
                    }
                }
                starty--;
                endy--;
            }
        }
    }
    // right arrow
    else if (e.keyCode == '39') {
        // shifting the block towards right side
        if (endy < 9) {
            starty++;
            endy++;
            for (let i = endy; i >= starty; i--) {
                for (let j = startx-1; j < endx; j++) {
                    if (grid[j] && grid[j][i - 1] && grid[j][i - 1] === 1) {
                        document.getElementById(`${j}-${i}`).style.backgroundColor = currColor
                        document.getElementById(`${j}-${i - 1}`).style.backgroundColor = ''
                    }
                    grid[j][i] = grid[j][i - 1]
                }
            }
        }
    }

}

//Sliding the block and reseting the it at end
setInterval(() => {
    slide()
}, 500);

//getting random color
function getColor() {
    return color[Math.floor(Math.random() * color.length)]
}

//rendering 2D grid
let html = ``;
for (let i = 0; i <= 19; i++) {
    for (let j = 0; j <= 9; j++) {
        html += `
        <div class="block" id="${i}-${j}"></div>
        `
    }
}
root.innerHTML = html
