var cardArray = [];
var cardDataArray = [];
var choosenCard = [];
var choosenId = [];
var currentScore = 0;
var multiplayer = false;
var turn = 1; 
var playerOne = 0;
var playerTwo = 0;
const colorArray = ['linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)', 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', 'linear-gradient(to right, #fa709a 0%, #fee140 100%)', 'radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)','linear-gradient(to top, #96fbc4 0%, #f9f586 100%)','linear-gradient(to top, #c471f5 0%, #fa71cd 100%)','linear-gradient(to right, #434343 0%, black 100%)']
function createblock(){
    var grid=document.querySelector('.grid');
    for(let i=0;i<cardDataArray.length;i++)
    {
        var myCard = document.createElement('div');
        myCard.setAttribute("class","card");
        myCard.setAttribute("data-id",i);
        myCard.addEventListener('click', cardClicked);
        grid.appendChild(myCard);
    }
}
function multiplayerCheck(){
    if(document.getElementById("multiplayer").checked)
    {
        multiplayer = true;
    }
    else
    {
        multiplayer = false;
    }
}
function start(){
    document.getElementById("bgmusic").play();
    document.getElementById("start").style.display="none";
    document.getElementById("container").style.display="flex";
    if(multiplayer)
    {
        document.getElementById("score").style.display="block";
    }
    for(var i=0;i<8;)
    {
        var eq1 = Math.floor(Math.random() * 9) + 1;
        var eq2 = Math.floor(Math.random() * 9) + 1;
        var res;
        if(eq1 % eq2 == 0 && cardArray.indexOf(eq1/eq2)==-1)
        {
            res = eq1/eq2;
            cardArray.push(res);
            var myData = {};
            myData['name']=i;
            myData['data']=res;
            cardDataArray.push(myData);
            var myData = {};
            myData['name']=i;
            myData['data']=eq1+"/"+eq2;
            cardDataArray.push(myData);
            i++;
        }
        else
        {
            var op = Math.floor(Math.random() * 3);
            if(op==0 && cardArray.indexOf(eq1+eq2)==-1)
            {
                res = eq1 + eq2;
                cardArray.push(res);
                var myData = {};
                myData['name']=i;
                myData['data']=res;
                cardDataArray.push(myData);
                var myData = {};
                myData['name']=i;
                myData['data']=eq1+"+"+eq2;
                cardDataArray.push(myData);
                i++;
            }
            else if(op==1 && cardArray.indexOf(eq1-eq2)==-1)
            {
                res = eq1 - eq2;
                cardArray.push(res);
                var myData = {};
                myData['name']=i;
                myData['data']=res;
                cardDataArray.push(myData);
                var myData = {};
                myData['name']=i;
                myData['data']=eq1+"-"+eq2;
                cardDataArray.push(myData);
                i++;
            }
            else if(op==2 && cardArray.indexOf(eq1*eq2)==-1)
            {
                res = eq1 * eq2;
                cardArray.push(res);
                var myData = {};
                myData['name']=i;
                myData['data']=res;
                cardDataArray.push(myData);
                var myData = {};
                myData['name']=i;
                myData['data']=eq1+"*"+eq2;
                cardDataArray.push(myData);
                i++;
            }
        }
    }
    cardDataArray.sort(() => 0.5 - Math.random());
    createblock();
}
function updateUi()
{
    document.getElementById("player1").innerHTML="Player 1: "+playerOne;
    document.getElementById("player2").innerHTML="Player 2: "+playerTwo;
    document.getElementById("displayturn").innerHTML="Player "+turn;
}
function checkIt() {
    var cards = document.getElementsByClassName("card");
    const optionOneId = choosenId[0];
    const optionTwoId = choosenId[1];
    if(optionOneId == optionTwoId)
    {
        cards[optionOneId].style.background = "url('/static/images/block.jpg')";
        cards[optionOneId].innerHTML="";
        if(turn == 1)
        turn = 2;
        else
        turn = 1;
        updateUi();
    } else if (choosenCard[0]==choosenCard[1]) {
        document.getElementById("correct").play();
        cards[optionOneId].style.visibility="hidden";
        cards[optionTwoId].style.visibility="hidden";
        currentScore++;
        if(multiplayer)
        {
            if(turn == 1)
            {
                playerOne++;
            }
            else
            {
                playerTwo++;
            }
            updateUi();
        }
    } else {
        cards[optionOneId].style.background="url('/static/images/block.jpg')";
        cards[optionTwoId].style.background="url('/static/images/block.jpg')";
        cards[optionOneId].innerHTML="";
        cards[optionTwoId].innerHTML="";
        if(multiplayer)
        {
            if(turn == 1)
            turn = 2;
            else
            turn = 1;
            updateUi();
        }
    }
    choosenCard = []
    choosenId = []
    if(currentScore == cardArray.length)
    {
        document.getElementById("complete").play();
        var disp = document.getElementById("winner");
        disp.style.display="block";
        document.getElementById("container").style.display="none";
        if(multiplayer)
        {
            if(playerOne > playerTwo)
            disp.innerHTML = "Player 1 wins";
            else if(playerOne < playerTwo)
            disp.innerHTML = "Player 2 wins";
            else
            disp.innerHTML = "Match Tied";
            document.getElementById("displayturn").style.display="none";
        }
    }
}

function cardClicked(){
    var dataId = this.getAttribute('data-id');
    choosenCard.push(cardDataArray[dataId].name)
    choosenId.push(dataId);
    this.style.background=colorArray[cardDataArray[dataId].name];
    this.innerHTML=cardDataArray[dataId].data;
    if(choosenCard.length === 2)
    {
        setTimeout(checkIt,500);
    }
}