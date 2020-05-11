console.log("Welcome to Color Cube!");

//each of the adj.. are the squares that are adjacent to this one
class Square{
    constructor(color="red", face="FRONT", adjUp=0, adjDown=0, adjLeft=0, adjRigh=0){
        this.myColor = color;
        this.myFace = face;
        this.adjUp = adjUp;
        this.adjDown = adjDown;
        this.adjLeft = adjLeft;
        this.adjRight = adjRigh;
    }

    setColor(color){
        this.myColor = color;
    }

    setFace(face){
        this.myFace = face;
    }

    //adjSquare (class Square) is the square that is being set adjacent
    //whichSquare (string) = "UP" || "DOWN" || "RIGHT" || "LEFT"
    setAdjSquare(adjSquare, whichSquare){
        switch(whichSquare.toUpperCase())
        {
            case "UP":
                this.adjUp = adjSquare;
                break;
            case "DOWN":
                this.adjDown = adjSquare;
                break;
            case "RIGHT":
                this.adjRight = adjSquare;
                break;
            case "LEFT":
                this.adjLeft = adjSquare;
                break; 
        }
    }

}

//there will only be one cube
class Cube{
    constructor()
    {
        this.face1; //color change will happen in this variable
        this.face2; //color change will happen in this variable
        this.face3; //color change will happen in this variable
        this.face4; //color change will happen in this variable
        this.face5; //color change will happen in this variable
        this.face6; //color change will happen in this variable
        this.front; //this variable will hold a copy of one of face1-6
        this.back;  //this variable will hold a copy of one of face1-6
        this.left; //this variable will hold a copy of one of face1-6
        this.right; //this variable will hold a copy of one of face1-6
        this.up; //this variable will hold a copy of one of face1-6
        this.down; //this variable will hold a copy of one of face1-6

        this.fillCube();

        this.faceShowing = this.Front;
    }

    //this fills the cube when the Cube is created
    fillCube()
    {
        const faces = []; //an array containing all six faces
        const colors = ["green", "blue", "orange", "red", "white", "yellow"];

        for(let j = 0; j < 6; j++)
        {
            const face = []; //an array containing all nine squares

            for(let i = 0; i < 9; i++)
            {
                const square = new Square(colors[j]);
                face.push(square);
            }

            faces.push(face);
        }

        this.front = faces[0];
        this.face1 = faces[0];
        this.back = faces[1];
        this.face2 = faces[1];
        this.left = faces[2];
        this.face3 = faces[2];
        this.right = faces[3];
        this.face4 = faces[3];
        this.up = faces[4];
        this.face5 = faces[4];
        this.down = faces[5];
        this.face6 = faces[5];

        this.setFaceColors();
    }

    //options: UP || DOWN || LEFT || RIGHT
    //this will affect the squares in all six faces
    switchFaces(whichWay){
        const up = this.up;
        const down = this.down;
        const front = this.front;
        const back = this.back;
        const left = this.left;
        const right = this.right;
        switch(whichWay){
            case "UP":
                this.front = down;
                this.up = front;
                this.back = up;
                this.down = back;
                //console.log("Rotate faces up!");
                break;
            case "DOWN":
                this.front = up;
                this.up = back;
                this.back = down;
                this.down = front;
                //console.log("Rotate faces down!");
                break;
            case "LEFT":
                this.front = right;
                this.left = front;
                this.back = left;
                this.right = back;
                //console.log("Rotate faces left!");
                break;
            case "RIGHT":
                this.front = left;
                this.left = back;
                this.back = right;
                this.right = front;
                //console.log("Rotate faces right!");
                break;
        }

        this.setFaceColors();
    }

    setFaceColors(){
        $('#one').css("background-color", `${this.front[0].myColor}`);
        $('#two').css("background-color", `${this.front[1].myColor}`);
        $('#three').css("background-color", `${this.front[2].myColor}`);
        $('#four').css("background-color", `${this.front[3].myColor}`);
        $('#five').css("background-color", `${this.front[4].myColor}`);
        $('#six').css("background-color", `${this.front[5].myColor}`);
        $('#seven').css("background-color", `${this.front[6].myColor}`);
        $('#eight').css("background-color", `${this.front[7].myColor}`);
        $('#nine').css("background-color", `${this.front[8].myColor}`);
    }

    //options:
    // Row: TOP || BOTTOM
    // Direction: LEFT || RIGHT
    // this will affect the squares in five faces
    switchRows(){

    }

    //options:
    // Column: LEFT || RIGHT
    // Direction: UP || DOWN
    //this will affect the squares in five faces
    switchColumns(){

    }
}

$('.face-right').click(function(event){
    gameCube.switchFaces("RIGHT");
});

$('.face-left').click(function(event){
    gameCube.switchFaces("LEFT");
});

$('.face-up').click(function(event){
    
    gameCube.switchFaces("UP");
});

$('.face-down').click(function(event){
    gameCube.switchFaces("DOWN");
});

const gameCube = new Cube(); //the main cube that contains all the data
