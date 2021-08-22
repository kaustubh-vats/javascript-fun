var total =0;
var totalBalls;
var batting;
class Player{
    constructor()
    {
        this.runrate = 0;
        this.runs = 0;
        this.wickets = 0;
        this.balls = 0;
        this.chase = false;
        this.playerrun = 0;
    }
    setPlayers(players)
    {
        this.players=players;
        this.playerNames=Object.keys(players);
    }
    updateRunrate(runs,balls)
    {
        if(balls==0)
        {
            this.ball = 0;
            this.runrate = 0.0;
            return 0;
        }
        var over = Math.floor(balls/6);
        this.ball = Math.floor(balls%6);
        if(over == 0)
        {
            this.runrate=this.runs*(6/this.ball);
        }
        else if(this.ball != 0)
        {
            this.runrate = this.runs / (over + (this.ball/10));
        }
        else{
            this.runrate = this.runs/over;
        }
        this.runrate = this.runrate.toFixed(3);
        return over;
    }
    updateRuns(runs,balls){
        var batsman = this.playerNames[this.wickets];
        if(this.players[batsman] == -1)
            this.players[batsman]=0;
        this.players[batsman]+=runs;
        this.runs = runs + this.runs;
        this.balls = balls;
        var over = this.updateRunrate(runs,balls);
        document.getElementById("Batsmancurrentplayer").innerHTML=batsman+" "+this.players[batsman];
        document.getElementById("runrate").innerHTML="Runrate: "+this.runrate;
        document.getElementById("overs").innerHTML="Overs: "+over+"."+this.ball;
        document.getElementById("score").innerHTML=this.runs+"/"+this.wickets;
        document.getElementById("playerscore").innerHTML=this.runs+"/"+this.wickets;
    }
    updateWicket(runs,balls)
    {
        var batsman = this.playerNames[this.wickets];
        if(this.players[batsman] == -1)
            this.players[batsman]=0;
        this.wickets++;
        var newbatsman = this.playerNames[this.wickets];
        var over = this.updateRunrate(runs,balls);
        document.getElementById("Batsmancurrentplayer").innerHTML=newbatsman+" 0";
        document.getElementById("runrate").innerHTML="Runrate: "+this.runrate;
        document.getElementById("overs").innerHTML="Overs: "+over+"."+this.ball;
        document.getElementById("score").innerHTML=this.runs+"/"+this.wickets;
        document.getElementById("playerscore").innerHTML=this.runs+"/"+this.wickets;
    }
    updateRequired(ballsleft)
    {
        this.requiredRunrate = (total +1 - this.runs) / (ballsleft ) * 6 ;
        this.requiredRunrate = this.requiredRunrate.toFixed(3);
        document.getElementById("requiredrate").innerHTML="Required runrate: "+this.requiredRunrate;
        document.getElementById("need").innerHTML="Need "+(total + 1 - this.runs)+" in "+ballsleft+" balls";
    }
}
class Device{
    constructor()
    {
        this.runrate = 0;
        this.runs = 0;
        this.wickets = 0;
        this.balls = 0;
        this.chase = false;
        this.playerrun = 0;
    }
    setPlayers(players)
    {
        this.players=players;
        this.playerNames=Object.keys(players);
    }
    updateRunrate(runs,balls)
    {
        if(balls==0)
        {
            this.ball = 0;
            this.runrate = 0.0;
            return 0;
        }
        var over = Math.floor(balls/6);
        this.ball = Math.floor(balls%6);
        if(over == 0)
        {
            this.runrate=this.runs * (6/this.ball);
        }
        else if(this.ball != 0)
        {
            this.runrate = this.runs / (over + (this.ball/10));
        }
        else{
            this.runrate = this.runs/over;
        }
        this.runrate = this.runrate.toFixed(3);
        return over;
    }
    updateRuns(runs,balls){
        var batsman = this.playerNames[this.wickets];
        if(this.players[batsman] == -1)
            this.players[batsman]=0;
        this.players[batsman]+=runs;
        this.runs = runs + this.runs;
        this.balls = balls;
        var over = this.updateRunrate(runs,balls);  
        document.getElementById("Batsmancurrentdevice").innerHTML=batsman+" "+this.players[batsman];
        document.getElementById("runrate").innerHTML="Runrate: "+this.runrate;
        document.getElementById("overs").innerHTML="Overs: "+over+"."+this.ball;
        document.getElementById("score").innerHTML=this.runs+"/"+this.wickets;
        document.getElementById("devicescore").innerHTML=this.runs+"/"+this.wickets;
    }
    updateWicket(runs,balls)
    {
        var batsman = this.playerNames[this.wickets];
        if(this.players[batsman] == -1)
            this.players[batsman]=0;
        this.wickets++;
        var newbatsman = this.playerNames[this.wickets];
        var over = this.updateRunrate(runs,balls);
        document.getElementById("Batsmancurrentdevice").innerHTML=newbatsman+" 0";
        document.getElementById("runrate").innerHTML="Runrate: "+this.runrate;
        document.getElementById("overs").innerHTML="Overs: "+over+"."+this.ball;
        document.getElementById("score").innerHTML=this.runs+"/"+this.wickets;
        document.getElementById("devicescore").innerHTML=this.runs+"/"+this.wickets;
    }
    updateRequired(ballsleft)
    {
        this.requiredRunrate = (total+1 - this.runs) / (ballsleft ) * 6 ;
        this.requiredRunrate = this.requiredRunrate.toFixed(3);
        document.getElementById("requiredrate").innerHTML="Required runrate: "+this.requiredRunrate;
        document.getElementById("need").innerHTML="Need "+(total + 1 - this.runs)+" in "+ballsleft+" balls";
    }
}
var balls = 0;
var myPlayer = new Player();
var myDevice = new Device();
function start(data){
    document.getElementById("start").style.display="none";
    document.getElementById("mainDiv").style.display="block";
    document.getElementById("stadium").play();
    document.getElementById("stadium").volume = 0.5;
    batting = data.batting;
    totalBalls = Number(data.overs);
    var commentry = data.commentry;
    if(commentry == "english")
    {
        document.getElementById("out1").src="/static/audio/english/out1.mpeg";
        document.getElementById("out2").src="/static/audio/english/out2.mpeg";
        document.getElementById("six1").src="/static/audio/english/six1.mpeg";
        document.getElementById("six2").src="/static/audio/english/six2.mp3";
        document.getElementById("four1").src="/static/audio/english/four1.mpeg";
        document.getElementById("four2").src="/static/audio/english/four2.mpeg";
    }
    if(batting == 1)
    {
        myDevice.chase = true;
    }
    else
    {
        myPlayer.chase = true;
    }
    myPlayer.setPlayers(data.myteam);
    myDevice.setPlayers(data.dteam);
}
function getDevice()
{
    var myScore = Math.floor(Math.random() * 5)+1;
    if(myScore == 5)
    return 6;
    else
    return myScore;
}
function updateScoreCard(){
    document.getElementById("scoreboard").style.display="block";
    document.getElementById("mainDiv").style.display="none";
    var bman = document.getElementsByName("batsmanscoremy");
    var scr = document.getElementsByName("scorebatsmanmy");
    var it=0;
    for(x in myPlayer.players)
    {
        if(it==5)
        break;
        bman[it].innerHTML=x;
        if(myPlayer.players[x]==-1)
        {
            scr[it].innerHTML="Not bat";
        }
        else
        {
            scr[it].innerHTML=myPlayer.players[x];
        }
        it++;
    }
    var bmandiv = document.getElementsByName("batsmanscorediv");
    var scrdiv = document.getElementsByName("scorebatsmandiv");
    it=0;
    for(x in myDevice.players)
    {
        if(it==5)
        break;
        bmandiv[it].innerHTML=x;
        if(myDevice.players[x]==-1)
        {
            scrdiv[it].innerHTML="Not bat";
        }
        else
        {
            scrdiv[it].innerHTML=myDevice.players[x];
        }
        it++;
    }
}
function myrun(run){
    balls++;
    if(batting == 1)
    {
        var devicechoice = getDevice();
        document.getElementById("player").src = "/static/images/cricket/player"+run+".png";
        document.getElementById("device").src = "/static/images/cricket/device"+devicechoice+".png";
        if(run == devicechoice)
        {
            var r=Math.floor(Math.random()*2);
            if(r==0)
            {
                document.getElementById("out1").play();
            }  
            else{
                document.getElementById("out2").play();
            } 
            myPlayer.updateWicket(myPlayer.runs,balls);
            if(myPlayer.chase)
            {
                myPlayer.updateRequired(totalBalls - balls);
            }
            if(myPlayer.wickets >= 5)
            {
                if(myPlayer.chase)
                {
                    if(myPlayer.runs == total)
                    {
                        alert("Match tied");
                        document.getElementById("winner").innerHTML="Match tied";
                        updateScoreCard();
                    }
                    else
                    {
                        alert("You loose all out");
                        document.getElementById("winner").innerHTML="You loose";
                        updateScoreCard();
                    }
                    document.getElementById("mybuttons").style.display="none";
                }
                else
                {
                    batting = 2;
                    balls = 0;
                    total = myPlayer.runs;
                    document.getElementById("innings").innerHTML="Target "+(total+1);
                    myDevice.updateRuns(0,0);
                }
            }
            if(balls >= totalBalls)
            {
                if(!myPlayer.chase)
                {
                    batting = 2;
                    balls = 0;
                    total = myPlayer.runs;
                    document.getElementById("innings").innerHTML="Target "+(total+1);
                }
                else if(myPlayer.runs < total)
                {
                    updateScoreCard();
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You loose";
                    alert("Sorry you loose overs Completed");
                }
                else if(myPlayer.runs == total)
                {
                    updateScoreCard();
                    document.getElementById("winner").innerHTML="Match tied";
                    document.getElementById("mybuttons").style.display="none"; 
                    alert("Match tied");
                }
            }
        }
        else
        {
            if(run == 6)
            {
                var r=Math.floor(Math.random()*2);
                if(r==0)
                {
                    document.getElementById("six1").play();
                }  
                else{
                    document.getElementById("six2").play();
                } 
            }
            if(run == 4)
            {
                var r=Math.floor(Math.random()*2);
                if(r==0)
                {
                    document.getElementById("four1").play();
                }  
                else{
                    document.getElementById("four2").play();
                } 
            }
            myPlayer.updateRuns(run, balls);
            if(myPlayer.chase)
            {
                myPlayer.updateRequired(totalBalls - balls);
                if(myPlayer.runs > total)
                {
                    updateScoreCard();
                    alert("winner");
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You Win";
                }
            }
            if(balls >= totalBalls)
            {
                if(!myPlayer.chase)
                {
                    batting = 2;
                    balls = 0;
                    total = myPlayer.runs;
                    document.getElementById("innings").innerHTML="Target "+(total+1);
                    myDevice.updateRuns(0,0);
                }
                else if(myPlayer.runs < total)
                {
                    updateScoreCard();
                    alert("Sorry you loose overs Completed");
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You loose";
                }
                else if(myPlayer.runs == total)
                {
                    document.getElementById("winner").innerHTML="Match tied";
                    document.getElementById("mybuttons").style.display="none";
                    updateScoreCard();
                    alert("Match tied");
                }
                else
                {
                    document.getElementById("winner").innerHTML="You Won";
                    document.getElementById("mybuttons").style.display="none";
                    updateScoreCard();
                    alert("you won");
                }
            }
        }
    }
    else{
        var devicechoice = getDevice();
        document.getElementById("player").src = "/static/images/cricket/player"+run+".png";
        document.getElementById("device").src = "/static/images/cricket/device"+devicechoice+".png";
        if(run == devicechoice)
        {
            var r=Math.floor(Math.random()*2);
            if(r==0)
            {
                document.getElementById("out1").play();
            }  
            else{
                document.getElementById("out2").play();
            } 
            myDevice.updateWicket(myDevice.runs,balls);
            if(myDevice.chase)
            {
                myDevice.updateRequired(totalBalls-balls);
            }
            if(myDevice.wickets >= 5)
            {
                if(myDevice.chase)
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You Won";
                    updateScoreCard();
                    alert("You won all out");
                }
                else
                {
                    batting = 1;
                    balls = 0;
                    total = myDevice.runs;
                    document.getElementById("innings").innerHTML="Target "+(total+1);
                    myPlayer.updateRuns(0,0);
                }
            }
            
            if(balls >= totalBalls)
            {
                if(!myDevice.chase)
                {
                    batting = 1;
                    balls = 0;
                    total = myDevice.runs;
                    document.getElementById("innings").innerHTML="Target "+(total+1);
                    myPlayer.updateRuns(0,0);
                }
                else if(total > myDevice.runs)
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You Win";
                    updateScoreCard();
                    alert("You win");
                }
                else if(total == myDevice.runs)
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="Match tied";
                    updateScoreCard();
                    alert("Match tied");
                }
                else
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You loose";
                    updateScoreCard();
                    alert("You loose");
                }
            }
        }
        else
        {
            if(devicechoice == 6)
            {
                var r=Math.floor(Math.random()*2);
                if(r==0)
                {
                    document.getElementById("six1").play();
                }  
                else{
                    document.getElementById("six1").play();
                } 
            }
            if(devicechoice == 4)
            {
                var r=Math.floor(Math.random()*2);
                if(r==0)
                {
                    document.getElementById("four1").play();
                }  
                else{
                    document.getElementById("four2").play();
                } 
            }
            myDevice.updateRuns(devicechoice, balls);
            
            if(myDevice.chase)
            {
                myDevice.updateRequired(totalBalls-balls);
                if(myDevice.runs > total)
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You loose";
                    updateScoreCard();
                    alert("You loose");
                }
            }
            if(balls >= totalBalls)
            {
                if(!myDevice.chase)
                {
                    batting = 1;
                    balls = 0;
                    total = myDevice.runs;
                    alert("Innings finished");
                    document.getElementById("innings").innerHTML="Target "+(total+1);
                    myPlayer.updateRuns(0,0);
                }
                else if(total > myDevice.runs)
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You Win";
                    updateScoreCard();
                    alert("You win");
                }
                else if(total == myDevice.runs)
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="Match tied";
                    updateScoreCard();
                    alert("Match tied");
                }
                else
                {
                    document.getElementById("mybuttons").style.display="none";
                    document.getElementById("winner").innerHTML="You loose";
                    updateScoreCard();
                    alert("You loose");
                }
            }
        }
    }
}