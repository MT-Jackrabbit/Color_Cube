console.log("Welcome to Color Cube!");

//each of the adj.. are the squares that are adjacent to this one
class Square{
    constructor(color="green", face="FRONT", number=0, adjUp=0, adjDown=0, adjLeft=0, adjRight=0){
        this.myColor = color;
        this.myFace = face;
        this.myNumber = number;
        this.adjUp = adjUp;
        this.adjDown = adjDown;
        this.adjLeft = adjLeft;
        this.adjRight = adjRight;
        this.counted = false;
    }

    setColor(color){
        this.myColor = color;
    }

    setFace(face){
        this.myFace = face;
    }

    //adjSquare (class Square) is the square that is being set adjacent
    setAdjSquares(adjUp, adjRight, adjDown, adjLeft){
        this.adjUp = adjUp;
        this.adjRight = adjRight;
        this.adjDown = adjDown;
        this.adjLeft = adjLeft;
    }

}

//there will only be one cube
class Cube{
    constructor()
    {
        //this.face1; //color change will happen in this variable
        //this.face2; //color change will happen in this variable
        //this.face3; //color change will happen in this variable
        //this.face4; //color change will happen in this variable
        //this.face5; //color change will happen in this variable
        //this.face6; //color change will happen in this variable
        this.front; //this variable will hold a copy of one of face1-6
        this.back;  //this variable will hold a copy of one of face1-6
        this.left; //this variable will hold a copy of one of face1-6
        this.right; //this variable will hold a copy of one of face1-6
        this.up; //this variable will hold a copy of one of face1-6
        this.down; //this variable will hold a copy of one of face1-6
        this.cubeRotation = 0; //this keeps track of the degrees the face has rotated
        this.faceRotationCount =0; //this keeps track of the number of front face rotations

        this.fillCube();

        this.faceShowing = this.Front;
    }

    //this fills the cube when the Cube is created
    fillCube()
    {
        const faces = []; //an array containing all six faces
        const colors = ["green", "blue", "orange", "red", "white", "yellow"];
        const faceNames = ["front", "back", "left", "right", "up", "down"];

        for(let j = 0; j < 6; j++)
        {
            const face = []; //an array containing all nine squares

            for(let i = 0; i < 9; i++)
            {
                const square = new Square(colors[j], faceNames[j], i);
                face.push(square);
            }

            faces.push(face);
        }

        this.front = faces[0];
        //this.face1 = faces[0];
        this.back = faces[1];
        //this.face2 = faces[1];
        this.left = faces[2];
        //this.face3 = faces[2];
        this.right = faces[3];
        //this.face4 = faces[3];
        this.up = faces[4];
        //this.face5 = faces[4];
        this.down = faces[5];
        //this.face6 = faces[5];

        this.cubeRotation = 0;
        this.faceRotationCount = 0;
        $('.cube').css("transform", "rotate(0deg)");
        this.updateSquareIds();
        //this.setSmallSquareColors();
        //this.updateAdjSquares();
        this.setFaceColors();
    }

    scrambleCube()
    {
        this.switchColumns("LEFT", "UP");
        this.switchRows("TOP", "RIGHT");
        //this.switchFaces("UP");
        this.switchRows("BOTTOM", "LEFT");
        this.switchColumns("RIGHT", "DOWN");
        //this.switchFaces("RIGHT");
        this.rotateBackFace("RIGHT");
        this.rotateFrontFace("LEFT");
        this.switchColumns("RIGHT", "DOWN");
        this.switchRows("TOP", "RIGHT");
        this.rotateLeftFace("RIGHT");
        this.rotateRightFace("LEFT");
    }

    countScore() {
        let score = 0;
        const faces = [this.front, this.back, this.down, this.up, this.right, this.left];

        //reset the counted value in each of the squares
        for(let i = 0; i < faces.length; i++)
        {
            for(let j = 0; j < faces[i].length; j++)
            {
                faces[i][j].counted = false;
            }
        }

        for(let j = 0; j < faces.length; j++)
        {
            for(let i = 0; i < faces[j].length; i++)
            {
                const myColor = faces[j][i].myColor;

                if(myColor === faces[j][i].adjDown.myColor && !faces[j][i].adjDown.counted)
                {
                    //if I havent been counted then count me
                    if(!faces[j][i].counted)
                    {
                        faces[j][i].counted = true;
                        score++;
                    }
                    //also count my adjacent cube    
                    faces[j][i].adjDown.counted = true;
                    score++;
                }

                if(myColor === faces[j][i].adjUp.myColor && !faces[j][i].adjUp.counted)
                {
                    //if I havent been counted then count me
                    if(!faces[j][i].counted)
                    {
                        faces[j][i].counted = true;
                        score++;
                    }
                    //also count my adjacent cube    
                    faces[j][i].adjUp.counted = true;
                    score++;
                }

                if(myColor === faces[j][i].adjRight.myColor && !faces[j][i].adjRight.counted)
                {
                    //if I havent been counted then count me
                    if(!faces[j][i].counted)
                    {
                        faces[j][i].counted = true;
                        score++;
                    }
                    //also count my adjacent cube    
                    faces[j][i].adjRight.counted = true;
                    score++;
                }

                if(myColor === faces[j][i].adjLeft.myColor && !faces[j][i].adjLeft.counted)
                {
                    //if I havent been counted then count me
                    if(!faces[j][i].counted)
                    {
                        faces[j][i].counted = true;
                        score++;
                    }
                    //also count my adjacent cube    
                    faces[j][i].adjLeft.counted = true;
                    score++;
                }
            }
        }

        return score;
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
                this.rotateLeftFace("UP");
                this.rotateRightFace("UP");
                break;
            case "DOWN":
                this.front = up;
                this.up = back;
                this.back = down;
                this.down = front;
                this.rotateRightFace("DOWN");
                this.rotateLeftFace("DOWN");
                break;
            case "LEFT":
                this.front = right;
                this.left = front;
                this.back = left;
                 //need to turn the back upside down
                this.invertCubeFace(this.back);
                this.right = back;
                //need to turn the right side up
                this.invertCubeFace(this.right);
                this.rotateDownFace("LEFT");
                this.rotateUpFace("LEFT");
                break;
            case "RIGHT":
                this.front = left;
                this.left = back;
                //need to turn the left side up
                this.invertCubeFace(this.left);
                this.back = right;
                //need to turn the back upside down
                this.invertCubeFace(this.back);
                this.right = front;
                this.rotateDownFace("RIGHT");
                this.rotateUpFace("RIGHT");
                break;
        }

        this.setFaceColors();
    }

    //used to turn upside down or right side up.  This will just swap
    //the squares position in the array.
    invertCubeFace(faceToChange)
    {
        let temp = [];
        let upper = faceToChange.length - 1;

        for(let i = 0; i < (faceToChange.length)/2; i++)
        {
            temp = faceToChange[i];
            faceToChange[i] = faceToChange[upper];
            faceToChange[upper] = temp;

            upper--;
        }
    }

    //updates the main cube colors to the user
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

        this.setSmallSquareColors();
        this.updateAdjSquares();
    }

    //updates the small square map as the user manipulates the cube 
    setSmallSquareColors(){
        const $smallCubes = $('.small-cubes .small-box');
        let u = 0;
        let l = 9;
        let f = 18;
        let r = 27;
        let b = 36;
        let d = 45;

        let j = 8; //to count backwards
        for(let i = 0; i < 9; i++)
        {
            //update the up face
            $smallCubes.eq(u).css("background-color", this.up[i].myColor);
            //$smallCubes.eq(u).text(this.up[i].myNumber);
            u++;
            //update the left face
            $smallCubes.eq(l).css("background-color", this.left[i].myColor);
            //$smallCubes.eq(l).text(this.left[i].myNumber);
            l++;
            //update the front face
            $smallCubes.eq(f).css("background-color", this.front[i].myColor);
            //$smallCubes.eq(f).text(this.front[i].myNumber);
            f++;
            //update the right face
            $smallCubes.eq(r).css("background-color", this.right[i].myColor);
            //$smallCubes.eq(r).text(this.right[i].myNumber);
            r++;
            //update the back face (the back face is inverted)
            $smallCubes.eq(b).css("background-color", this.back[j].myColor);
            //$smallCubes.eq(b).text(this.back[j].myNumber);
            b++;
            j--;
            //update the down face
            $smallCubes.eq(d).css("background-color", this.down[i].myColor);
            //$smallCubes.eq(d).text(this.down[i].myNumber);
            d++;
        }
    }

    updateAdjSquares()
    {
        //front face (up, right, down, left)
        this.front[0].setAdjSquares(this.up[6], this.front[1], this.front[3], this.left[2]);
        this.front[1].setAdjSquares(this.up[7], this.front[2], this.front[4], this.front[0]);
        this.front[2].setAdjSquares(this.up[8], this.right[0], this.front[5], this.front[1]);
        this.front[3].setAdjSquares(this.front[0], this.front[4], this.front[6], this.left[5]);
        this.front[4].setAdjSquares(this.front[1], this.front[5], this.front[7], this.front[3]);
        this.front[5].setAdjSquares(this.front[2], this.right[3], this.front[8], this.front[4]);
        this.front[6].setAdjSquares(this.front[3], this.front[7], this.down[0], this.left[8]);
        this.front[7].setAdjSquares(this.front[4], this.front[8], this.down[1], this.front[6]);
        this.front[8].setAdjSquares(this.front[5], this.right[6], this.down[2], this.front[7]);

        //up face (up, right, down, left)
        this.up[0].setAdjSquares(this.back[6], this.up[1], this.up[3], this.left[0]);
        this.up[1].setAdjSquares(this.back[7], this.up[2], this.up[4], this.up[0]);
        this.up[2].setAdjSquares(this.back[8], this.right[0], this.up[5], this.up[1]);
        this.up[3].setAdjSquares(this.up[0], this.up[4], this.up[6], this.left[5]);
        this.up[4].setAdjSquares(this.up[1], this.up[5], this.up[7], this.up[3]);
        this.up[5].setAdjSquares(this.up[2], this.right[3], this.up[8], this.up[4]);
        this.up[6].setAdjSquares(this.up[3], this.up[7], this.front[0], this.left[2]);
        this.up[7].setAdjSquares(this.up[4], this.up[8], this.front[1], this.up[6]);
        this.up[8].setAdjSquares(this.up[5], this.right[0], this.front[2], this.up[7]);

        //down face (up, right, down, left)
        this.down[0].setAdjSquares(this.front[6], this.down[1], this.down[3], this.left[8]);
        this.down[1].setAdjSquares(this.front[7], this.down[2], this.down[4], this.down[0]);
        this.down[2].setAdjSquares(this.front[8], this.right[6], this.down[5], this.down[1]);
        this.down[3].setAdjSquares(this.down[0], this.down[4], this.down[6], this.left[7]);
        this.down[4].setAdjSquares(this.down[1], this.down[5], this.down[7], this.down[3]);
        this.down[5].setAdjSquares(this.down[2], this.right[7], this.down[8], this.down[4]);
        this.down[6].setAdjSquares(this.down[3], this.down[7], this.back[0], this.left[6]);
        this.down[7].setAdjSquares(this.down[4], this.down[8], this.back[1], this.down[6]);
        this.down[8].setAdjSquares(this.down[5], this.right[8], this.back[2], this.down[7]);

        //back face
        this.back[0].setAdjSquares(this.down[6], this.back[1], this.back[3], this.left[6]);
        this.back[1].setAdjSquares(this.down[7], this.back[2], this.back[4], this.back[0]);
        this.back[2].setAdjSquares(this.down[8], this.right[8], this.back[5], this.back[1]);
        this.back[3].setAdjSquares(this.back[0], this.back[4], this.back[6], this.left[3]);
        this.back[4].setAdjSquares(this.back[1], this.back[5], this.back[7], this.back[3]);
        this.back[5].setAdjSquares(this.back[2], this.right[5], this.back[8], this.back[4]);
        this.back[6].setAdjSquares(this.back[3], this.back[7], this.up[0], this.left[0]);
        this.back[7].setAdjSquares(this.back[4], this.back[8], this.up[1], this.back[6]);
        this.back[8].setAdjSquares(this.back[5], this.right[2], this.up[2], this.back[7]);

        //left face
        this.left[0].setAdjSquares(this.up[0], this.left[1], this.left[3], this.back[6]);
        this.left[1].setAdjSquares(this.up[3], this.left[2], this.left[4], this.left[0]);
        this.left[2].setAdjSquares(this.up[6], this.front[0], this.left[5], this.left[1]);
        this.left[3].setAdjSquares(this.left[0], this.left[4], this.left[6], this.back[3]);
        this.left[4].setAdjSquares(this.left[1], this.left[5], this.left[7], this.left[3]);
        this.left[5].setAdjSquares(this.left[2], this.front[3], this.left[8], this.left[4]);
        this.left[6].setAdjSquares(this.left[3], this.left[7], this.down[6], this.back[0]);
        this.left[7].setAdjSquares(this.left[4], this.left[8], this.down[3], this.left[6]);
        this.left[8].setAdjSquares(this.left[5], this.front[6], this.down[0], this.left[7]);

        //right face
        this.right[0].setAdjSquares(this.up[8], this.right[1], this.right[3], this.front[2]);
        this.right[1].setAdjSquares(this.up[5], this.right[2], this.right[4], this.right[0]);
        this.right[2].setAdjSquares(this.up[2], this.back[8], this.right[5], this.right[1]);
        this.right[3].setAdjSquares(this.right[0], this.right[4], this.right[6], this.front[5]);
        this.right[4].setAdjSquares(this.right[1], this.right[5], this.right[7], this.right[3]);
        this.right[5].setAdjSquares(this.right[2], this.back[5], this.right[8], this.right[4]);
        this.right[6].setAdjSquares(this.right[3], this.right[7], this.down[2], this.front[8]);
        this.right[7].setAdjSquares(this.right[4], this.right[8], this.down[5], this.right[6]);
        this.right[8].setAdjSquares(this.right[5], this.back[2], this.down[8], this.right[7]);
    }

    //whichWay: LEFT || RIGHT
    rotateUpFace(whichWay){
        const square0 = this.up[0];
        const square1 = this.up[1];
        const square2 = this.up[2];
        const square3 = this.up[3];
        const square5 = this.up[5];
        const square6 = this.up[6];
        const square7 = this.up[7];
        const square8 = this.up[8];

        switch(whichWay.toUpperCase())
        {
            case "LEFT":
                this.up[0] = square6;
                this.up[1] = square3;
                this.up[2] = square0;
                this.up[3] = square7;
                this.up[5] = square1;
                this.up[6] = square8;
                this.up[7] = square5;
                this.up[8] = square2;
                break;
            case "RIGHT":
                this.up[0] = square2;
                this.up[1] = square5;
                this.up[2] = square8;
                this.up[3] = square1;
                this.up[5] = square7;
                this.up[6] = square0;
                this.up[7] = square3;
                this.up[8] = square6;
                break;
        }
    }

    //whichWay: LEFT || RIGHT
    rotateDownFace(whichWay){
        const square0 = this.down[0];
        const square1 = this.down[1];
        const square2 = this.down[2];
        const square3 = this.down[3];
        const square5 = this.down[5];
        const square6 = this.down[6];
        const square7 = this.down[7];
        const square8 = this.down[8];

        switch(whichWay.toUpperCase())
        {
            case "RIGHT":
                this.down[0] = square6;
                this.down[1] = square3;
                this.down[2] = square0;
                this.down[3] = square7;
                this.down[5] = square1;
                this.down[6] = square8;
                this.down[7] = square5;
                this.down[8] = square2;
                break;
            case "LEFT":
                this.down[0] = square2;
                this.down[1] = square5;
                this.down[2] = square8;
                this.down[3] = square1;
                this.down[5] = square7;
                this.down[6] = square0;
                this.down[7] = square3;
                this.down[8] = square6;
                break;
        }
    }

    //whichWay: UP || DOWN
    rotateRightFace(whichWay){
        const square0 = this.right[0];
        const square1 = this.right[1];
        const square2 = this.right[2];
        const square3 = this.right[3];
        const square5 = this.right[5];
        const square6 = this.right[6];
        const square7 = this.right[7];
        const square8 = this.right[8];

        switch(whichWay.toUpperCase())
        {
            case "UP":
                this.right[0] = square6;
                this.right[1] = square3;
                this.right[2] = square0;
                this.right[3] = square7;
                this.right[5] = square1;
                this.right[6] = square8;
                this.right[7] = square5;
                this.right[8] = square2;
                break;
            case "DOWN":
                this.right[0] = square2;
                this.right[1] = square5;
                this.right[2] = square8;
                this.right[3] = square1;
                this.right[5] = square7;
                this.right[6] = square0;
                this.right[7] = square3;
                this.right[8] = square6;
                break;
        }
    }

    //whichWay: UP || DOWN
    rotateLeftFace(whichWay){
        const square0 = this.left[0];
        const square1 = this.left[1];
        const square2 = this.left[2];
        const square3 = this.left[3];
        const square5 = this.left[5];
        const square6 = this.left[6];
        const square7 = this.left[7];
        const square8 = this.left[8];

        switch(whichWay.toUpperCase())
        {
            case "DOWN":
                this.left[0] = square6;
                this.left[1] = square3;
                this.left[2] = square0;
                this.left[3] = square7;
                this.left[5] = square1;
                this.left[6] = square8;
                this.left[7] = square5;
                this.left[8] = square2;
                break;
            case "UP":
                this.left[0] = square2;
                this.left[1] = square5;
                this.left[2] = square8;
                this.left[3] = square1;
                this.left[5] = square7;
                this.left[6] = square0;
                this.left[7] = square3;
                this.left[8] = square6;
                break;
        }
    }

    //whichWay: LEFT || RIGHT
    rotateFrontFace(whichWay){
        const color0 = this.front[0];
        const color1 = this.front[1];
        const color2 = this.front[2];
        const color3 = this.front[3];
        const color5 = this.front[5];
        const color6 = this.front[6];
        const color7 = this.front[7];
        const color8 = this.front[8];
        const leftColors = [this.left[2], this.left[5], this.left[8]];
        const upColors = [this.up[6], this.up[7], this.up[8]];
        const rightColors = [this.right[0], this.right[3], this.right[6]];
        const downColors = [this.down[0], this.down[1], this.down[2]];

        switch(whichWay.toUpperCase())
        {
            case "RIGHT":
                //change front face
                this.front[0] = color6;
                this.front[1] = color3;
                this.front[2] = color0;
                this.front[3] = color7;
                this.front[5] = color1;
                this.front[6] = color8;
                this.front[7] = color5;
                this.front[8] = color2;
                //change left face
                this.left[2] = downColors[0];
                this.left[5] = downColors[1];
                this.left[8] = downColors[2];
                //change up face
                this.up[6] = leftColors[2];
                this.up[7] = leftColors[1];
                this.up[8] = leftColors[0];
                //change right face
                this.right[0] = upColors[0];
                this.right[3] = upColors[1];
                this.right[6] = upColors[2];
                //change down face
                this.down[0] = rightColors[2];
                this.down[1] = rightColors[1];
                this.down[2] = rightColors[0];
                this.cubeRotation += 90;
                this.faceRotationCount++;
                break;
            case "LEFT":
                //change front face
                this.front[0] = color2;
                this.front[1] = color5;
                this.front[2] = color8;
                this.front[3] = color1;
                this.front[5] = color7;
                this.front[6] = color0;
                this.front[7] = color3;
                this.front[8] = color6;
                //change left face
                this.left[2] = upColors[2];
                this.left[5] = upColors[1];
                this.left[8] = upColors[0];
                //change up face
                this.up[6] = rightColors[0];
                this.up[7] = rightColors[1];
                this.up[8] = rightColors[2];
                //change right face
                this.right[0] = downColors[2];
                this.right[3] = downColors[1];
                this.right[6] = downColors[0];
                //change down face
                this.down[0] = leftColors[0];
                this.down[1] = leftColors[1];
                this.down[2] = leftColors[2];
                this.cubeRotation -= 90;
                this.faceRotationCount--;
                break;
        }

        const rotate = `rotate(${this.cubeRotation}deg)`;
        $('.cube').css("transform", rotate);
        this.updateSquareIds();
        this.setSmallSquareColors();
        this.updateAdjSquares();
    }

    //whichWay: LEFT || RIGHT
    rotateBackFace(whichWay){
        const color0 = this.back[0];
        const color1 = this.back[1];
        const color2 = this.back[2];
        const color3 = this.back[3];
        const color5 = this.back[5];
        const color6 = this.back[6];
        const color7 = this.back[7];
        const color8 = this.back[8];
        const leftColors = [this.left[0], this.left[3], this.left[6]];
        const upColors = [this.up[0], this.up[1], this.up[2]];
        const rightColors = [this.right[2], this.right[5], this.right[8]];
        const downColors = [this.down[6], this.down[7], this.down[8]];

        switch(whichWay.toUpperCase())
        {
            case "RIGHT":
                //change back face
                this.back[0] = color6;
                this.back[1] = color3;
                this.back[2] = color0;
                this.back[3] = color7;
                this.back[5] = color1;
                this.back[6] = color8;
                this.back[7] = color5;
                this.back[8] = color2;
                //change left face
                this.left[0] = downColors[0];
                this.left[3] = downColors[1];
                this.left[6] = downColors[2];
                //change up face
                this.up[0] = leftColors[2];
                this.up[1] = leftColors[1];
                this.up[2] = leftColors[0];
                //change right face
                this.right[2] = upColors[0];
                this.right[5] = upColors[1];
                this.right[8] = upColors[2];
                //change down face
                this.down[6] = rightColors[2];
                this.down[7] = rightColors[1];
                this.down[8] = rightColors[0];
                break;
            case "LEFT":
                //change front face
                this.back[0] = color2;
                this.back[1] = color5;
                this.back[2] = color8;
                this.back[3] = color1;
                this.back[5] = color7;
                this.back[6] = color0;
                this.back[7] = color3;
                this.back[8] = color6;
                //change left face
                this.left[0] = upColors[2];
                this.left[3] = upColors[1];
                this.left[6] = upColors[0];
                //change up face
                this.up[0] = rightColors[0];
                this.up[1] = rightColors[1];
                this.up[2] = rightColors[2];
                //change right face
                this.right[2] = downColors[2];
                this.right[5] = downColors[1];
                this.right[8] = downColors[0];
                //change down face
                this.down[6] = leftColors[0];
                this.down[7] = leftColors[1];
                this.down[8] = leftColors[2];
                break;
        }

        //this.setFaceColors();
        this.setSmallSquareColors();
        this.updateAdjSquares();
    }

    //this makes sure the control buttons on the front face stay in the correct location
    updateSquareIds()
    {
        const rotationCount = this.faceRotationCount%4;

        const $cubeButtons = $('.cube button');
        const $squares = $('.cube div');

        if(rotationCount === 0)
        { //cube #1 is top left
                $squares.eq(0).attr("id", "one");
                $squares.eq(1).attr("id", "two");
                $squares.eq(2).attr("id", "three");
                $squares.eq(3).attr("id", "four");
                $squares.eq(5).attr("id", "six");
                $squares.eq(6).attr("id", "seven");
                $squares.eq(7).attr("id", "eight");
                $squares.eq(8).attr("id", "nine");
        }
        else if(rotationCount === 1 || rotationCount === -3)
        { //cube #7 is top left
                $squares.eq(0).attr("id", "three");
                $squares.eq(1).attr("id", "six");
                $squares.eq(2).attr("id", "nine");
                $squares.eq(3).attr("id", "two");
                $squares.eq(5).attr("id", "eight");
                $squares.eq(6).attr("id", "one");
                $squares.eq(7).attr("id", "four");
                $squares.eq(8).attr("id", "seven");
        }
        else if(rotationCount === 2 || rotationCount === -2)
        { //cube #9 is top left
                $squares.eq(0).attr("id", "nine");
                $squares.eq(1).attr("id", "eight");
                $squares.eq(2).attr("id", "seven");
                $squares.eq(3).attr("id", "six");
                $squares.eq(5).attr("id", "four");
                $squares.eq(6).attr("id", "three");
                $squares.eq(7).attr("id", "two");
                $squares.eq(8).attr("id", "one");
        }
        else if(rotationCount === 3 || rotationCount === -1)
        { //cube #3 is top left
                $squares.eq(0).attr("id", "seven");
                $squares.eq(1).attr("id", "four");
                $squares.eq(2).attr("id", "one");
                $squares.eq(3).attr("id", "eight");
                $squares.eq(5).attr("id", "two");
                $squares.eq(6).attr("id", "nine");
                $squares.eq(7).attr("id", "six");
                $squares.eq(8).attr("id", "three");
        }
    }

    //options:
    // whichRow: TOP || BOTTOM
    // whichDirection: LEFT || RIGHT
    // this will affect the squares in five faces
    switchRows(whichRow, whichDirection){
        //these will store the top row of each side
        if(whichRow.toUpperCase() === "TOP")
        {
            const front = [this.front[0], this.front[1], this.front[2]];
            const left = [this.left[0], this.left[1], this.left[2]];
            const back = [this.back[8], this.back[7], this.back[6]];
            const right = [this.right[0], this.right[1], this.right[2]];

            if(whichDirection.toUpperCase() === "LEFT")
            {
                this.setRowFront("TOP", right);
                this.setRowLeft("TOP", front);
                this.setRowRight("TOP", back);
                this.setRowBack("TOP", left);

                this.rotateUpFace("LEFT");
            }
            else if(whichDirection.toUpperCase() === "RIGHT")
            {
                this.setRowFront("TOP", left);
                this.setRowLeft("TOP", back);
                this.setRowRight("TOP", front);
                this.setRowBack("TOP", right);

                this.rotateUpFace("RIGHT");
            }
            
        }
        else if(whichRow.toUpperCase() === "BOTTOM")
        {
            const front = [this.front[6], this.front[7], this.front[8]];
            const left = [this.left[6], this.left[7], this.left[8]];
            const back = [this.back[2], this.back[1], this.back[0]];
            const right = [this.right[6], this.right[7], this.right[8]];

            if(whichDirection.toUpperCase() === "LEFT")
            {
                this.setRowFront("BOTTOM", right);
                this.setRowLeft("BOTTOM", front);
                this.setRowRight("BOTTOM", back);
                this.setRowBack("BOTTOM", left);

                this.rotateDownFace("LEFT");
            }
            else if(whichDirection.toUpperCase() === "RIGHT")
            {
                this.setRowFront("BOTTOM", left);
                this.setRowLeft("BOTTOM", back);
                this.setRowRight("BOTTOM", front);
                this.setRowBack("BOTTOM", right);

                this.rotateDownFace("RIGHT");
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
            const front = [this.front[0], this.front[3], this.front[6]];
            const back = [this.back[0], this.back[3], this.back[6]];
            const up = [this.up[0], this.up[3], this.up[6]];
            const down = [this.down[0], this.down[3], this.down[6]];

            if(whichDirection.toUpperCase() === "UP")
            {
                this.setColFront("LEFT", down);
                this.setColBack("LEFT", up);
                this.setColDown("LEFT", back);
                this.setColUp("LEFT", front);

                this.rotateLeftFace("UP");
            }
            else if(whichDirection.toUpperCase() === "DOWN")
            {
                this.setColFront("LEFT", up);
                this.setColBack("LEFT", down);
                this.setColDown("LEFT", front);
                this.setColUp("LEFT", back);

                this.rotateLeftFace("DOWN");
            }
            
        }
        else if(whichColumn.toUpperCase() === "RIGHT")
        {
            const front = [this.front[2], this.front[5], this.front[8]];
            const back = [this.back[2], this.back[5], this.back[8]];
            const up = [this.up[2], this.up[5], this.up[8]];
            const down = [this.down[2], this.down[5], this.down[8]];

            if(whichDirection.toUpperCase() === "UP")
            {
                this.setColFront("RIGHT", down);
                this.setColBack("RIGHT", up);
                this.setColDown("RIGHT", back);
                this.setColUp("RIGHT", front);

                this.rotateRightFace("UP");
            }
            else if(whichDirection.toUpperCase() === "DOWN")
            {
                this.setColFront("RIGHT", up);
                this.setColBack("RIGHT", down);
                this.setColDown("RIGHT", front);
                this.setColUp("RIGHT", back);

                this.rotateRightFace("DOWN");
            }
        }

        this.setFaceColors();
    }

    //which = LEFT || RIGHT
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
            this.front[i] = colors[c];
            c++;
        }
    }

    //which = LEFT || RIGHT
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
            this.back[i] = colors[c];
            c++;
        }
    }

    //which = LEFT || RIGHT
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
            this.up[i] = colors[c];
            c++;
        }
    }

    //which = LEFT || RIGHT
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
            this.down[i] = colors[c];
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
            this.front[i] = colors[c];
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
            this.left[i] = colors[c];
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
            start = 6;
            end = 8;
        }
        else if(which.toUpperCase() === "BOTTOM")
        {
            start = 0;
            end = 2;
        }

        let c = 2;
        for(let i = start; i <= end; i++)
        {
            this.back[i] = colors[c];
            c--;
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
            this.right[i] = colors[c];
            c++;
        }
    }

    
}

const gameCube = new Cube(); //the main cube that contains all the data

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

$('.button__three-right').click(function(event){
    const parentId = $('.button__three-right').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchColumns("LEFT", "UP");
            break;
        case "three":
            gameCube.switchRows("TOP", "RIGHT");
            break;
        case "seven":
            gameCube.switchRows("BOTTOM", "LEFT");
            break;
        case "nine":
            gameCube.switchColumns("RIGHT", "DOWN");
            break;
    }
});

$('.button__one-left').click(function(event){
    const parentId = $('.button__one-left').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchRows("TOP", "LEFT");
            break;
        case "three":
            gameCube.switchColumns("RIGHT", "UP");
            break;
        case "seven":
            gameCube.switchColumns("LEFT", "DOWN");
            break;
        case "nine":
            gameCube.switchRows("BOTTOM", "RIGHT");
            break;
    }
});

$('.button__nine-right').click(function(event){
    const parentId = $('.button__nine-right').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchRows("TOP", "LEFT");
            break;
        case "three":
            gameCube.switchColumns("RIGHT", "UP");
            break;
        case "seven":
            gameCube.switchColumns("LEFT", "DOWN");
            break;
        case "nine":
            gameCube.switchRows("BOTTOM", "RIGHT");
            break;
    }
});

$('.button__seven-left').click(function(event){
    const parentId = $('.button__seven-left').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchColumns("LEFT", "UP");
            break;
        case "three":
            gameCube.switchRows("TOP", "RIGHT");
            break;
        case "seven":
            gameCube.switchRows("BOTTOM", "LEFT");
            break;
        case "nine":
            gameCube.switchColumns("RIGHT", "DOWN");
            break;
    }
});

$('.button__one-top').click(function(event){
    const parentId = $('.button__one-top').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchColumns("LEFT", "UP");
            break;
        case "three":
            gameCube.switchRows("TOP", "RIGHT");
            break;
        case "seven":
            gameCube.switchRows("BOTTOM", "LEFT");
            break;
        case "nine":
            gameCube.switchColumns("RIGHT", "DOWN");
            break;
    }
    
});

$('.button__seven-bottom').click(function(event){
    const parentId = $('.button__seven-bottom').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchRows("TOP", "LEFT");
            break;
        case "three":
            gameCube.switchColumns("RIGHT", "UP");
            break;
        case "seven":
            gameCube.switchColumns("LEFT", "DOWN");
            break;
        case "nine":
            gameCube.switchRows("BOTTOM", "RIGHT");
            break;
    }
});

$('.button__three-top').click(function(event){
    const parentId = $('.button__three-top').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchRows("TOP", "LEFT");
            break;
        case "three":
            gameCube.switchColumns("RIGHT", "UP");
            break;
        case "seven":
            gameCube.switchColumns("LEFT", "DOWN");
            break;
        case "nine":
            gameCube.switchRows("BOTTOM", "RIGHT");
            break;
    }
});

$('.button__nine-bottom').click(function(event){
    const parentId = $('.button__nine-bottom').parent().attr("id");
    switch(parentId)
    {
        case "one":
            gameCube.switchColumns("LEFT", "UP");
            break;
        case "three":
            gameCube.switchRows("TOP", "RIGHT");
            break;
        case "seven":
            gameCube.switchRows("BOTTOM", "LEFT");
            break;
        case "nine":
            gameCube.switchColumns("RIGHT", "DOWN");    
            break;
    }
    
});

$('.rotate-front-right').click(function(event){
    gameCube.rotateFrontFace("RIGHT");
});

$('.rotate-front-left').click(function(event){
    gameCube.rotateFrontFace("LEFT");
});

$('.header__button--scramble-reset').click(function(event){

    const $button = $('.header__button--scramble-reset');

    if($button.text() === "Scramble")
    {
        const randomNum = Math.floor(Math.random() * 4);
    
        for(let i = 0; i <= randomNum; i++)
            gameCube.scrambleCube();
        
        $button.text("Reset");
    }
    else if($button.text() === "Reset")
    {
        gameCube.fillCube();

        $button.text("Scramble");
    }
});

//capture the keystrokes and see if they are the arrow keys, b key or alt key
document.onkeydown = checkKey;
let keyBuffer = [];

function checkKey(e) {

    let keyStroke = e.keyCode;
    let rotateBack = false;
    keyBuffer.push(keyStroke);

    if(keyStroke === 66 && keyBuffer[keyBuffer.length-2] === 18)
    {
        keyStroke = -1; //spin the back face inverse
    }
    
    //clear the key buffer if the alt key was not pressed
    if(keyStroke !== 18)
    {
        keyBuffer = [];
    }

    let whichWay = "";
    switch(keyStroke)
    {
        case 37: //left arrow
            whichWay = "LEFT";
            break;
        case 38: //up arrow
            whichWay = "UP";
            break;
        case 39: //right arrow
            whichWay = "RIGHT";
            break;
        case 40: //down arrow
            whichWay = "DOWN";
            break;
        case 66: //the b key
            rotateBack = true;
            whichWay = "LEFT";
            break;
        case -1: //the alt + b keys were pressed
            rotateBack = true;
            whichWay = "RIGHT";
            break;
    }

    if(rotateBack)
        gameCube.rotateBackFace(whichWay);
    else
        gameCube.switchFaces(whichWay);
}