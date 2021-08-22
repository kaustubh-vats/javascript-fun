
var algo , arrayType, arr, size;
var height = document.body.clientHeight;
var width = document.body.clientWidth;
var diff = 0;
function myFunc(data)
{
    algo = data.algo;
    arrayType = data.typearray;
    size = data.sizeOfArray;
    if(arrayType == "random")
    {
        arr=[];
        for(var i=0; i<size;i++)
        {
            arr[i]=Math.floor(Math.random() * (height-20)) + 1;
            var d = document.createElement("div");
            d.setAttribute("class","elementsarr");
            d.style.width = (Math.floor(width/size)-20)+"px";            
            d.style.height = arr[i]+"px";
            d.setAttribute("name", "arrElem");
            d.innerHTML=arr[i];
            document.body.appendChild(d);
        }
        strt();
    }
    else if(arrayType == "myarray")
    {
        arr = data.getArray.split(' ').map(Number);
        size = arr.length;
        if(size > 30)
        {
            alert("Your array should be less than 30");
            return;
        }
        diff = height - Math.max.apply(null, arr);

        console.log(diff,height,Math.max.apply(null, arr));
        for(var i=0; i<size;i++)
        {
            if(arr[i]>height)
            {
                alert("You have inserted a very big height of "+arr[i]+" which might cause error in visualization\nPlease enter element less than "+height);
                return;
            }
            var d = document.createElement("div");
            d.setAttribute("class","elementsarr");
            d.style.width = (Math.floor(width/size)-20)+"px";            
            d.style.height = (arr[i]+diff-20)+"px";
            d.setAttribute("name", "arrElem");
            d.innerHTML=arr[i];
            document.body.appendChild(d);
        }
        strt();
    }
}
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve, ms));
}
function strt(){
    if(algo=="bubble")
    {
        bubble(arr,size);
    }
    if(algo=="insertion")
    {
        insertion(arr,size);
    }
    if(algo == "selection")
    {
        selection(arr,size);
    }
}
async function selection(arr,n)
{
    var doc = document.getElementsByName("arrElem");
    var i,j;
    for(i=0;i<n-1;i++)
    {
        for(j=i+1;j<n;j++)
        {
            if(arr[j] < arr[i])
            {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                doc[i].style.backgroundColor="#ff0000";
                doc[j].style.backgroundColor="#ff0000";
                await delay(350);
                doc[i].innerHTML = arr[i];
                doc[i].style.height = (arr[i]+diff-20)+"px";
                doc[j].innerHTML = arr[j];
                doc[j].style.height = (arr[j]+diff-20)+"px";
                await delay(350);
                doc[i].style.backgroundColor="#00ff00";
                doc[j].style.backgroundColor="#00ff00";
                await delay(350);
                doc[i].style.backgroundColor="#0062ff";
                doc[j].style.backgroundColor="#0062ff";
            }
        }
    }
    for(i=0;i<n;i++)
    {
        doc[i].style.backgroundColor="#00ff00";
    }
    document.getElementById("complete").play();
}

async function insertion(arr,n)
{
    var doc = document.getElementsByName("arrElem");
    var i, key, j;
    for(i=1;i<n;i++)
    {
        key = arr[i];
        j = i-1;
        while(j>=0 && arr[j]>key)
        {
            doc[j].style.backgroundColor="#ff0000";
            doc[j+1].style.backgroundColor="#ff0000";
            doc[j+1].innerHTML = arr[j];
            doc[j+1].style.height = (arr[j]+diff-20)+"px";
            arr[j+1] =arr[j];
            j--;
            await delay(350);
        }
        arr[j+1] = key;
        doc[j+1].style.backgroundColor="#ff0000";
        doc[j+1].innerHTML = key;
        doc[j+1].style.height = (key+diff-20)+"px";
        await delay(350);
        doc[j+1].style.backgroundColor="#00ff00";
        await delay(350);   
        for(var k=0;k<n;k++)
        {
            doc[k].style.backgroundColor="#0062ff";
        }
    }
    for(i=0;i<n;i++)
    {
        doc[i].style.backgroundColor="#00ff00";
    }
    document.getElementById("complete").play();
}
async function bubble(arr, n){
    var doc = document.getElementsByName("arrElem");
    var i,j;
    for(i=0;i<n-1;i++)
    {
        for(j=0;j<n-i-1;j++)
        {
            if(arr[j]>arr[j+1])
            {
                var temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
                doc[j+1].style.backgroundColor="#ff0000";
                doc[j].style.backgroundColor="#ff0000";
                await delay(350);
                doc[j+1].innerHTML = arr[j+1];
                doc[j+1].style.height = (arr[j+1]+diff-20)+"px";
                doc[j].innerHTML = arr[j];
                doc[j].style.height = (arr[j]+diff-20)+"px";
                await delay(350);
                doc[j+1].style.backgroundColor="#00ff00";
                doc[j].style.backgroundColor="#00ff00";
                await delay(350);
                doc[j+1].style.backgroundColor="#0062ff";
                doc[j].style.backgroundColor="#0062ff";
            }
        }
    }
    for(i=0;i<n;i++)
    {
        doc[i].style.backgroundColor="#00ff00";
    }
    document.getElementById("complete").play();
}

