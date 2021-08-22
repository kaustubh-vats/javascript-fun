function changeUi(){
    var size = document.getElementById("size");
    var arr = document.getElementById("array");
    var typearray = document.getElementById("arrayType").value;
    if(typearray == "random")
    {
        size.style.display = "block";
        arr.style.display = "none";
    }
    else if(typearray == "myarray")
    {
        size.value="1";
        arr.style.display = "block";
        size.style.display = "none";
    }
}
function verification(){
    var size = document.getElementById("size");
    var arr = document.getElementById("array");
    var typearray = document.getElementById("arrayType").value;
    if(typearray == "none")
    {
        alert("Select type of array");
        return false;
    }
    if(typearray == "random")
    {
        if(size.value == "")
        {
            alert("size is required");
            return false;
        }
        if(size.value == "0")
        {
            alert("size should not be zero");
            return false;
        }
        try{
            Number(size.value);
            return true;
        }
        catch{
            alert("Invalid size value");
            return false;
        }
    }
    else if(typearray == "myarray")
    {
        if(arr.value == "")
        {
            alert("Array field is required");
            return false;
        }
        try{
            var k=size.value
            var s = k.split(' ').map(Number);
            return true;
        }
        catch{
            alert("Invalid array");
            return false;
        }
    }
}