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

    //sets the main cube colors to the user
    setFaceColors(){
        $('#one').css("background-color", `${this.front[0].myColor}`);
        // $('#one').text('0');
        $('#two').css("background-color", `${this.front[1].myColor}`);
        $('#two').text('1');
        $('#three').css("background-color", `${this.front[2].myColor}`);
        //$('#three').text('2');
        $('#four').css("background-color", `${this.front[3].myColor}`);
        $('#four').text('3');
        $('#five').css("background-color", `${this.front[4].myColor}`);
        $('#five').text('4');
        $('#six').css("background-color", `${this.front[5].myColor}`);
        $('#six').text('5');
        $('#seven').css("background-color", `${this.front[6].myColor}`);
        //$('#seven').text('6');
        $('#eight').css("background-color", `${this.front[7].myColor}`);
        $('#eight').text('7');
        $('#nine').css("background-color", `${this.front[8].myColor}`);
        //$('#nine').text('8');
    }

    //options:
    // whichRow: TOP || BOTTOM
    // whichDirection: LEFT || RIGHT
    // this will affect the squares in five faces
    switchRows(whichRow, whichDirection){
        //these will store the top row of each side
        if(whichRow.toUpperCase() === "TOP")
        {
            const front = [this.front[0].myColor, this.front[1].myColor, this.front[2].myColor];
            const left = [this.left[0].myColor, this.left[1].myColor, this.left[2].myColor];
            const back = [this.back[0].myColor, this.back[1].myColor, this.back[2].myColor];
            const right = [this.right[0].myColor, this.right[1].myColor, this.right[2].myColor];

            if(whichDirection.toUpperCase() === "LEFT")
            {
                this.setRowFront("TOP", right);
                this.setRowLeft("TOP", front);
                this.setRowRight("TOP", back);
                this.setRowBack("TOP", left);
            }
            else if(whichDirection.toUpperCase() === "RIGHT")
            {
                this.setRowFront("TOP", left);
                this.setRowLeft("TOP", back);
                this.setRowRight("TOP", front);
                this.setRowBack("TOP", right);
            }
            
        }
        else if(whichRow.toUpperCase() === "BOTTOM")
        {
            const front = [this.front[6].myColor, this.front[7].myColor, this.front[8].myColor];
            const left = [this.left[6].myColor, this.left[7].myColor, this.left[8].myColor];
            const back = [this.back[6].myColor, this.back[7].myColor, this.back[8].myColor];
            const right = [this.right[6].myColor, this.right[7].myColor, this.right[8].myColor];

            if(whichDirection.toUpperCase() === "LEFT")
            {
                this.setRowFront("BOTTOM", right);
                this.setRowLeft("BOTTOM", front);
                this.setRowRight("BOTTOM", back);
                this.setRowBack("BOTTOM", left);
            }
            else if(whichDirection.toUpperCase() === "RIGHT")
            {
                this.setRowFront("BOTTOM", left);
                this.setRowLeft("BOTTOM", back);
                this.setRowRight("BOTTOM", front);
                this.setRowBack("BOTTOM", right);
            }
        }

        this.setFaceColors();
    }

    //options:
    // Column: LEFT || RIGHT
    // Direction: UP || DOWN
    //this will affect the squares in five faces
    switchColumns(whichColumn, whichDirection){
        if(whichColumn.toUpperCase() === "LEFT")
        {
            const front = [this.front[0].myColor, this.front[3].myColor, this.front[6].myColor];
            const back = [this.back[0].myColor, this.back[3].myColor, this.back[6].myColor];
            const up = [this.up[0].myColor, this.up[3].myColor, this.up[6].myColor];
            const down = [this.down[0].myColor, this.down[3].myColor, this.down[6].myColor];

            if(whichDirection.toUpperCase() === "UP")
            {
                this.setColFront("LEFT", down);
                this.setColBack("LEFT", up);
                this.setColDown("LEFT", back);
                this.setColUp("LEFT", front);
            }
            else if(whichDirection.toUpperCase() === "DOWN")
            {
                this.setColFront("LEFT", up);
                this.setColBack("LEFT", down);
                this.setColDown("LEFT", front);
                this.setColUp("LEFT", back);
            }
            
        }
        else if(whichColumn.toUpperCase() === "RIGHT")
        {
            const front = [this.front[2].myColor, this.front[5].myColor, this.front[8].myColor];
            const back = [this.back[2].myColor, this.back[5].myColor, this.back[8].myColor];
            const up = [this.up[2].myColor, this.up[5].myColor, this.up[8].myColor];
            const down = [this.down[2].myColor, this.down[5].myColor, this.down[8].myColor];

            if(whichDirection.toUpperCase() === "UP")
            {
                this.setColFront("RIGHT", down);
                this.setColBack("RIGHT", up);
                this.setColDown("RIGHT", back);
                this.setColUp("RIGHT", front);
            }
            else if(whichDirection.toUpperCase() === "DOWN")
            {
                this.setColFront("RIGHT", up);
                this.setColBack("RIGHT", down);
                this.setColDown("RIGHT", front);
                this.setColUp("RIGHT", back);
            }
        }

        this.setFaceColors();
    }

    //which = RIGHT || LEFT
    //colors = 3 element array
    setColFront(which, colors){
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "LEFT")
        {
            start = 0;
            end = 6;
        }
        else if(which.toUpperCase() === "RIGHT")
        {
            start = 2;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i+=3)
        {
            this.front[i].myColor = colors[c];
            c++;
        }
    }

    //which = RIGHT || LEFT
    //colors = 3 element array
    setColBack(which, colors){
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "LEFT")
        {
            start = 0;
            end = 6;
        }
        else if(which.toUpperCase() === "RIGHT")
        {
            start = 2;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i+=3)
        {
            this.back[i].myColor = colors[c];
            c++;
        }
    }

    //which = RIGHT || LEFT
    //colors = 3 element array
    setColUp(which, colors){
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "LEFT")
        {
            start = 0;
            end = 6;
        }
        else if(which.toUpperCase() === "RIGHT")
        {
            start = 2;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i+=3)
        {
            this.up[i].myColor = colors[c];
            c++;
        }
    }

    //which = RIGHT || LEFT
    //colors = 3 element array
    setColDown(which, colors){
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "LEFT")
        {
            start = 0;
            end = 6;
        }
        else if(which.toUpperCase() === "RIGHT")
        {
            start = 2;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i+=3)
        {
            this.down[i].myColor = colors[c];
            c++;
        }
    }

    //which = TOP || BOTTOM
    //colors = 3 element array
    setRowFront(which, colors)
    {
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "TOP")
        {
            start = 0;
            end = 2;
        }
        else if(which.toUpperCase() === "BOTTOM")
        {
            start = 6;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i++)
        {
            this.front[i].myColor = colors[c];
            c++;
        }
    }

    //which = TOP || BOTTOM
    //colors = 3 element array
    setRowLeft(which, colors)
    {
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "TOP")
        {
            start = 0;
            end = 2;
        }
        else if(which.toUpperCase() === "BOTTOM")
        {
            start = 6;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i++)
        {
            this.left[i].myColor = colors[c];
            c++;
        }
    }

    //which = TOP || BOTTOM
    //colors = 3 element array
    setRowBack(which, colors)
    {
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "TOP")
        {
            start = 0;
            end = 2;
        }
        else if(which.toUpperCase() === "BOTTOM")
        {
            start = 6;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i++)
        {
            this.back[i].myColor = colors[c];
            c++;
        }
    }

    //which = TOP || BOTTOM
    //colors = 3 element array
    setRowRight(which, colors)
    {
        let start = 0;
        let end = 0;

        if(which.toUpperCase() === "TOP")
        {
            start = 0;
            end = 2;
        }
        else if(which.toUpperCase() === "BOTTOM")
        {
            start = 6;
            end = 8;
        }

        let c = 0;
        for(let i = start; i <= end; i++)
        {
            this.right[i].myColor = colors[c];
            c++;
        }
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

$('.top-row-right').click(function(event){
    gameCube.switchRows("TOP", "RIGHT");
});

$('.top-row-left').click(function(event){
    gameCube.switchRows("TOP", "LEFT");
});

$('.bottom-row-right').click(function(event){
    gameCube.switchRows("BOTTOM", "RIGHT");
});

$('.bottom-row-left').click(function(event){
    gameCube.switchRows("BOTTOM", "LEFT");
});

$('.left-column-up').click(function(event){
    gameCube.switchColumns("LEFT", "UP");
});

$('.left-column-down').click(function(event){
    gameCube.switchColumns("LEFT", "DOWN");
});

$('.right-column-up').click(function(event){
    gameCube.switchColumns("RIGHT", "UP");
});

$('.right-column-down').click(function(event){
    gameCube.switchColumns("RIGHT", "DOWN");
});

const gameCube = new Cube(); //the main cube that contains all the data
