document.addEventListener("keydown",keyDownText, false);
document.addEventListener("keyup",keyUpText,false);
var k;
var keyCount=0;
var correct=false;
var randomArray;
var randomText = "Select game mode to continue";
var wordCount = 0;
var startcheck = false;
var inpBox;
var textBox;
var audioComplete;
var audioCorrect;
window.onload=function(e){
    inpBox = document.getElementById("inputbox");
    textBox = document.getElementById("textrandom");
    textBox.innerHTML=randomText;
    audioComplete = document.getElementById('complete');
    audioCorrect = document.getElementById('correct');
}
var it = 0;
function keyUpText(e){
    var keyCode = e.keyCode;
    k=document.getElementsByName(keyCode);
    for (var i=0, max=k.length; i < max; i++)
    {
        k[i].style.border="1px solid #8900ff";
        k[i].style.boxShadow="1px 1x 10px #8900ff";
    }
    if(it==randomText.length)
    {
        if(startcheck)
        {
            audioCorrect.play();
            it=0;
            wordCount++;
            randomText = randomArray[Math.floor(Math.random() * randomArray.length)];
            textBox.innerHTML = randomText;
            inpBox.value="";
        }
    }
}
function keyDownText(e){
    correct=false;
    var keyCode = e.keyCode;
    if(String.fromCharCode(keyCode).toLowerCase()==randomText.charAt(it).toLowerCase())
    {
        it++;
        correct=true;
    }
    k=document.getElementsByName(keyCode);
    for (var i=0, max=k.length; i < max; i++)
    {
        if(correct)
        {
            k[i].style.border=" 2px solid #00ffc4";
            k[i].style.boxShadow="1px 1x 10px #57eafd";
        }
        else{
            k[i].style.border=" 2px solid #ff0800";
            k[i].style.boxShadow="1px 1x 10px #ff3300";
        }
    }
    keyCount=keyCount+1;
}
function initialize(data){
    randomArray = data;
    var check = document.getElementsByName("gameType");
    var result = 0;
    for(var i=0;i<3;i++)
    {
        if(check[i].checked)
        {
            result = check[i].value;
        }
    }
    if(result==0)
    {
        alert("Please select your game mode");
    }
    else
    {
        randomText = randomArray[Math.floor(Math.random() * randomArray.length)];
        textBox.innerHTML=randomText;
        inpBox.value="";
        inpBox.focus();
        startcheck = true;
        var optionMenu = document.getElementById("optionMenu");
        optionMenu.style.display="none";
        var timer = document.getElementById("timer");
        var countDownDate = new Date().getTime()+(60*1000);
        var x = setInterval(function(){
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var minutes = Math.floor((distance%(1000 * 60 * 60 ))/(1000 * 60));
            var seconds = Math.floor((distance%(1000 * 60))/1000);
            var milisec = Math.floor(distance % 1000);
            timer.innerHTML=minutes + ":" + seconds + ":" + milisec;
            if(distance<0)
            {
                clearInterval(x);
                audioComplete.play();
                timer.innerHTML="EXPIRED";
                optionMenu.style.display="flex";
                startcheck = false;
                var form = document.createElement("form");
                form.setAttribute("method","POST");
                form.setAttribute("style","display: none");
                var inp=document.createElement("input");
                inp.setAttribute("type","text");
                inp.setAttribute("name","highscore");
                inp.value=Math.floor(wordCount/result);
                form.appendChild(inp);
                document.body.appendChild(form);
                alert("total words typed "+wordCount+"\n wpm : "+wordCount/result);
                form.submit();
                document.removeChild(form);
                }
        },1);
    }
}
