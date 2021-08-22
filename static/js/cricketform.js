function tossCoin(){
    var choice;
    if(document.getElementById("tosschoice").value=="1")
    {
        choice = 1;
    }
    else
    {
        choice = 0;
    }
    var coin = Math.floor(Math.random()*2);
    if(coin == choice)
    {
        document.getElementById("toss").readOnly = false;
        alert("You have won the toss please enter your choice in the given input (e.g. bowling or batting) in lower case");
    }
    else{
        var myChoice = Math.floor(Math.random()*2);
        document.getElementById("toss").readOnly = true;
        if(myChoice==0)
        {
            alert("Computer have won the toss and choose to field first so you have to bat first");
            document.getElementById("toss").value = "batting";
        }
        else{
            alert("Computer have won the toss and choose to bat first so you have to bowl first");
            document.getElementById("toss").value = "bowling";
        }
    }
    document.getElementById("tossButton").disabled = true;
}
function verification() {
    if(document.getElementById("toss").value != "bowling" && document.getElementById("toss").value != "batting")
    {
        alert("You can only choose either batting or bowling try to write it in lower case");
        return false;
    }
    var mt1 = document.getElementById("mteam1").value;
    var mt2 = document.getElementById("mteam2").value;
    var mt3 = document.getElementById("mteam3").value;
    var mt4 = document.getElementById("mteam4").value;
    var mt5 = document.getElementById("mteam5").value;
    var dt1 = document.getElementById("dteam1").value;
    var dt2 = document.getElementById("dteam2").value;
    var dt3 = document.getElementById("dteam3").value;
    var dt4 = document.getElementById("dteam4").value;
    var dt5 = document.getElementById("dteam5").value;
    var j1 = {[mt1]:0,[mt2]:0,[mt3]:0,[mt4]:0,[mt5]:0};
    var j2 = {[dt1]:0,[dt2]:0,[dt3]:0,[dt4]:0,[dt5]:0};
    if(Object.keys(j1).length != 5 || Object.keys(j2).length != 5)
    {
        alert("You cannot have two players with same name in a team");
        return false;
    }
    return true;
}