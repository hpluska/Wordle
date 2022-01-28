var letterBox;
var letterBoxWidth = 50;
var letterBoxHeight = 50;
var letterBoxSpacing = 55;
var goToNextLine = false;

var wordToGuess = "";

var letterButton;
var letterButtonWidth = 30;
var letterButtonHeight = 40;
var letterButtonSpacing = 35;
var firstRowLetterButtons = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
var secondRowLetterButtons = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
var thirdRowLetterButtons = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"];
var currentRowStatus = [false, false, false, false, false, false];

var letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","A", "S", "D", "F", "G", "H", "J", "K", "L",]

var wordBank = ["HORSE", "SMASH", "STASH", "CANDY", "PILLS", "WASTE", "STACK", "STAKE", "GREAT", 
                "GEEKS", "CANDY", "SUGAR", "WHACK", "SMACK", "ASHES", "ACHES", "PAINS", "CRASH", "BLAST", 
                "GRAPH", "FARTS", "VOMIT", "ABBEY", "ACTOR", "ADMIT", "ADULT", "AGENT", "APPLE", "BACON", 
                "BANJO", "CARDS", "CANOE", "CLUES", "COURT", "COUGH", "DELTA", "DOLLS", "FABLE", "FANGS",
                "FIBER", "FLOCK", "GENIE", "GLOBE", "HEART", "HELLO", "HOURS", "IVORY", "KNOCK", "LIVES",
                "LOVES", "LOSER", "MANGO", "MERCY", "NINJA", "NOISE", "PAROL", "PILOT", "PLUCK", "REMIX", 
                "RIFLE", "ROYAL", "SAUNA", "SEWAR", "SHELF", "SOARS", "TEXAS", "TICKS", "TORSO", "UNITS",
                "URINE", "VERBS","WHEAT", "WOMAN", "YOUTH", "ZEBRA", "CHILD", "WHITE", "ARGON", "PAPER", 
                "LIGHT", "WHORE", "PURSE", "PERKY", "GUPPY", "SLUMP", "BLEAK", "CLAIM", "WIERD", "SMELL", 
                "SMILE", "DWELL", "AGAIN", "SLACK", "PARTY", "GROWN", "GROAN", "BLACK", "SLAVE", "PLEAD", 
                "TULIP", "AMPLE", "FIRST", "BEARD", "BRAIN", "GECKO", "QUIET"];

window.addEventListener("load", chooseWord);
function chooseWord(){
    wordToGuess = wordBank[Math.floor(Math.random()*wordBank.length)];
    console.log(wordToGuess);
}

document.body.style.backgroundColor = "black";

var gameHolder = document.createElement("div");
gameHolder.style.margin = "auto";
gameHolder.style.width = letterBoxSpacing*5 + "px";
gameHolder.style.position = "relative";
document.body.append(gameHolder);

var buttonHolder = document.createElement("div");
buttonHolder.style.margin = "auto";
buttonHolder.style.position = "relative";
buttonHolder.style.top = letterBoxSpacing * 6 + 25 + "px";
buttonHolder.style.width = letterButtonSpacing*firstRowLetterButtons.length + 50+ "px";
buttonHolder.style.height = 210 + "px";
document.body.append(buttonHolder);
buttonHolder.style.border = "green thin solid";

function makeLetterBox(letter, xPos, yPos, id){
    letterBox = document.createElement("div");
    letterBox.style.position = "absolute";
    letterBox.style.left = xPos + "px";
    letterBox.style.top = yPos + "px";
    letterBox.style.width = letterBoxWidth + "px";
    letterBox.style.height = letterBoxHeight + "px"
    letterBox.style.border = "gray thin solid";
    letterBox.style.color = "white";
    letterBox.style.fontFamily = "Arial, sans-serif";
    letterBox.style.textAlign = "center";
    letterBox.style.fontSize = "2.8em";
    letterBox.style.fontStyle = "bold";
    letterBox.innerHTML = letter;
    letterBox.id = id;
    gameHolder.append(letterBox);
}

function makeLetterButton(letter, xPos, yPos, id, w, type){
    letterButton = document.createElement("div");
    letterButton.style.position = "absolute";
    letterButton.style.left = 5 + xPos + "px";
    letterButton.style.top = 5 + yPos + "px";
    letterButton.style.width = w + "px";
    letterButton.style.height = letterButtonHeight + "px"
    letterButton.style.backgroundColor = "gray";
    letterButton.style.color = "white";
    letterButton.style.fontFamily = "Arial, sans-serif";
    letterButton.style.borderRadius = "10%";
    letterButton.innerHTML = letter;
    letterButton.id = id;
    letterButton.style.textAlign = "center";
    letterButton.style.paddingTop = "20px";
    letterButton.style.paddingBottom = "0px";
    letterButton.style.cursor = "pointer";
    if(type == "letter"){
        letterButton.addEventListener("click", addLetter);
    }
    if(type == "delete"){
        letterButton.addEventListener("click", removeLetter);
    }
    if(type == "enter"){
        letterButton.addEventListener("click", checkWord);
    }
    buttonHolder.append(letterButton);
}

function makeLetters(){
var id = 0;
    for(var rows = 0; rows < 6; rows++){
        for(var cols = 0; cols < 5; cols++){
            
            var x = cols*letterBoxSpacing;
            var y = rows*letterBoxSpacing;
            makeLetterBox("", x, y, id);
            id++;
        }
    }
}

function makeFirstRowLetterButtons(){
    var rows = 0;
    for(var cols = 0; cols < firstRowLetterButtons.length; cols++){
        var id = firstRowLetterButtons[cols];
        var x = 25+cols*letterButtonSpacing;
        var y = rows*letterButtonSpacing;
        makeLetterButton(firstRowLetterButtons[cols], x, y, id, letterButtonWidth, "letter");
    }
}

function makeSecondRowLetterButtons(){
    var rows = 1;
    for(var cols = 0; cols < secondRowLetterButtons.length; cols++){
        var x = 40+cols*letterButtonSpacing;
        var y = 35+rows*letterButtonSpacing;
        var id = secondRowLetterButtons[cols];
        makeLetterButton(secondRowLetterButtons[cols], x, y, id, letterButtonWidth, "letter");
    }
}

function makeThirdRowLetterButtons(){
    var rows = 2;
    for(var cols = 0; cols < thirdRowLetterButtons.length; cols++){
        var w;
        var type = "letter"; 
        var id = thirdRowLetterButtons[cols];
        x = cols*letterButtonSpacing;
        var y = 70+rows*letterButtonSpacing;
        if(cols == 0 || cols == thirdRowLetterButtons.length - 1){
            
            w = letterButtonWidth + 40;
            type = "enter";
            if(cols == thirdRowLetterButtons.length - 1){
                x = cols*letterButtonSpacing+40; 
                type = "delete";
            }
        }else{
            w = letterButtonWidth;
            x = cols*letterButtonSpacing+40;
        }
        makeLetterButton(thirdRowLetterButtons[cols], x, y, id, w, type); 
    }
}

var currentRow = 0;
var letterCount = 0;
function addLetter(e){

    if(Math.floor(letterCount/5) == currentRow){//first row - need to evaluate before adding more letters
        document.getElementById(letterCount).innerHTML = e.target.id;
        letterCount++;
    }
    if(Math.floor(letterCount/5 + 1) == currentRow && currentRowStatus[currentRow - 1] == true){//the previous row is done and we can fill this row
        document.getElementById(letterCount).innerHTML = e.target.id;
        letterCount++;
    }
    
    /*
    if(Math.floor(letterCount/5) == 2 && currentRowStatus[1] == true){//the previous row is done
        document.getElementById(letterCount).innerHTML = e.target.id;
        letterCount++;
        console.log("row 2");
    }
    if(Math.floor(letterCount/5) - 1 == 3){//first row is done
        document.getElementById(letterCount).innerHTML = e.target.id;
        letterCount++;
    }
    if(Math.floor(letterCount/5) - 1 == 4){//first row is done
        document.getElementById(letterCount).innerHTML = e.target.id;
        letterCount++;
    }
    if(Math.floor(letterCount/5) - 1 == 5){//first row is done
        document.getElementById(letterCount).innerHTML = e.target.id;
        letterCount++;
    }
    */


}
//works!
function removeLetter(){
    if(letterCount > 0){
        if(currentRowStatus[Math.floor((letterCount-1)/5)] == false){
            letterCount--;
            console.log("remove letter = " + letterCount);
            console.log("current row = " +  letterCount/5);
            document.getElementById(letterCount).innerHTML = "";
        }
    
    }
}

function checkWord(){

    console.log("in check word and the letter count is = " + letterCount);
    var rowToCheck;
    //do no
    for(r = 0; r < currentRowStatus.length; r++){
        if(currentRowStatus[r] == false){
            rowToCheck = r;
            break;
        }
    }
    
    if(letterCount%5 == 0){
        var letters = [];
        var j = 1;
        for(var i = 4; i >= 0; i--){
            letters[i] = document.getElementById(letterCount-j).innerHTML;
            j++;
        }
        var correctLetters = [false, false, false, false, false];
        for(var i = 0; i < letters.length;i++){
            var inWord = false;
            if(wordToGuess.charAt(i) == letters[i]){
                inWord = true;
                correctLetters[i] = true;
                document.getElementById(letterCount - 5 + i).style.backgroundColor = "green";
                document.getElementById(letters[i]).style.backgroundColor = "green";
                
            }

            //I think this works
            for(var j = 0; j < wordToGuess.length; j++){
                if(i != j && wordToGuess.charAt(j) == letters[i]){
                    inWord = true;
                    if(correctLetters[i] == false){
                        document.getElementById(letterCount - 5 + i).style.backgroundColor = "yellow";
                        if(document.getElementById(letters[i]).style.backgroundColor != "green"){
                            document.getElementById(letters[i]).style.backgroundColor = "yellow"; 
                        }
                    }
                }
            }
            if(!inWord){
                document.getElementById(letterCount - 5 + i).style.backgroundColor = "#454545";
                document.getElementById(letters[i]).style.backgroundColor = "#454545";
            }
            
        }
    currentRowStatus[rowToCheck] = true;
    currentRow++;
    }else{//do not need, for testing only
        //console.log("do not check");
    }
    
    //console.log(currentRowStatus);
    //console.log(currentRowStatus[0]);
}

makeLetters();
makeFirstRowLetterButtons();
makeSecondRowLetterButtons();
makeThirdRowLetterButtons();






//function makeAlphabet(){
    //var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
//}




/*
var j = 5;//starts at index 5 (F)
var i = 6;//index of next letter (G)
var endModulo= letters.length + j;//end when the modulo does not equal 5 which is 4 (E)

for(j = 5; i != endModulo; j=(i)%(letters.length)){
    console.log(letters[j]);
    i++;
}
*/



