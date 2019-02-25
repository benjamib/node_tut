var i = 0;
var txt = '';
var speed = 40;
var cmdHistory=[];
var cmdHistoryIndex=0;
/*var loc = Loc_Sector_1;
var lsArr = new Map();
*/

document.addEventListener("mouseup", handleEvent);
window.addEventListener("load", initGame);
function initGame()
{
    /*var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }*/
   
    var initText = "booting SAM [Ship AutoMation]----------------------- done\nconnecting to ship main system---------------------- done\nlife support---------------------------------------- online\nadvanced diagnostics-------------------------------- online\nsensors suite--------------------------------------- online\nreactor core---------------------------------------- operational\nbooting nav system---------------------------------- done\nAll Systems 100% Begin Operation...";
    initText+="Hi! I am SAM, the Ship AutoMation system.\n";
    initText+="SAy something funny and wittty that endears this character to the player...";
    typeWriter("reboot system...")
    setTimeout(function () {
       typeWriter(initText);
    }, 5000);
    
}
function handleEvent()
{
    document.getElementById("command-line").focus();
}

function typeWriter(textToWrite) {

    i=0;
    document.getElementById("demo").innerHTML = "";
    txt = textToWrite;
    type();
}
function type(){

  if (i < txt.length)
  {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(type, speed);
  }
  
}
function processInput()
{
    var key = event.keyCode;
    var cmd_obj = document.getElementById("command-line");
    if(key=='13')
    {
        
        
        var cmd = cmd_obj.value;
        if (cmd !== "")
        {
            
            var txt = processCommand(cmd);
            cmd_obj.value="";
        }

    }
    if(key=='38')
    {
        if(cmdHistory[cmdHistoryIndex]!==undefined)
            {
                cmd_obj.value=cmdHistory[cmdHistory.length-cmdHistoryIndex-1];
                cmdHistoryIndex++;
            }

    }
    else
        cmdHistoryIndex=0;
    

}
function processCommand(cmd)
{
  cmdHistory.push(cmd);
  cmdHistoryIndex=0;
  cmd = cmd.toLowerCase();
  var cmdArray =  cmd.split(" ");
  if (cmdArray === null || cmdArray.length > 2)
  {
        typeWriter("command '" + cmd +"' is not recognized");
        return;
  }
  var url = '/'+ cmdArray[0] +'?param=' + cmdArray[1];
  fetch(url).then(function(response) {
    response.text().then(function(text) {
      typeWriter(JSON.parse(text));
	  });
  });
}
/*function processCommand(cmd)
{
    cmdHistory.push(cmd);
    cmdHistoryIndex=0;
    var myArray = /(^\w+)\b/g.exec(cmd);
   
    if (myArray === null)
    {
        return "command '" + cmd +"' is not recognized";
    }
    switch(myArray[1])
    {
        case "move":
            return processMove(cmd);
        case "look":
            return processLook(cmd);
        case "scan":
            return processScan(cmd);
        case "status":
            return processStatus(cmd);
        case "about":
            return processAbout(cmd);
        case "echo":
            return processEcho(cmd);
        case "clear":
            return "";
        case "help":
            return processHelp();
        case "ping":
            return "pong!";
        case "set":
            return processSet(cmd);
        case "hi":
            return "hello captain, what can I do for you?";
        case "where":
            return "Location:" + loc.name + "\nSystem:" + loc.system;
        default:
            return "command '" + cmd +"' is not recognized";
    }
}
function processLook(cmd)
{
    var myArray = /^look (.+)?\s*$/g.exec(cmd);
    if(myArray===null)
        return loc.look.around;
    switch(myArray[1])
    {
        case "around":
            return loc.look.around;
        case "north":
            return loc.look.north;
         case "east":
            return loc.look.east;
         case "south":
            return loc.look.south;
             case "west":
            return loc.look.west;
        
        default:
            return "I don't know wht you are trying to look at with '" + cmd +"'. Please try looking another way.";
    }
}
function processMove(cmd)
{
    var myArray = /^move (.+)?\s*$/g.exec(cmd);
    if(myArray===null)
        return "Please indicate where I should move to..."
    switch(myArray[1])
    {
        case "north":
            loc = loc.move.north;
            break;
        case "east":
            loc = loc.move.east;
            break;
        case "south":
            loc = loc.move.south;
            break;
        case "west":
            loc =  loc.move.west;
            break;
        default:
            return "I don't know wht you are trying to look at with '" + cmd +"'. Please try looking another way.";
    }
    return "You move " + myArray[1];
}
function processScan(cmd)
{
    var myArray = /^scan (.+)?\s*$/g.exec(cmd);
    if(myArray===null)
        return loc.scan.around;
    switch(myArray[1])
    {
        default:
            return "I can't scan " + myArray[1];
    }
}
function processEcho(cmd)
{
    var myArray = /^echo (.+)?\s*$/g.exec(cmd);
    return myArray[1];
}
function processHelp()
{
    var help_str ="";
    help_str="===HELP===\n";
    help_str+="The following commands are supported:\n";
    help_str+="1- 'echo [text]': will print to the screen any text [text] after echo\n";
    help_str+="2- 'clear': clear the output screen\n";
    help_str+="3- 'help': display the help menu\n";
    return help_str;
}


function processStatus(cmd)
{
    var myArray = /^status (.+)?\s*$/g.exec(cmd);
    if(myArray===null)
        return JSON.stringify(ship);
    switch(myArray[1])
    {
        case "ship":
            return JSON.stringify(ship.Status);
        case "crew":
            //processCrewStatus();
            return "crew status";
        default:
            return "Can't get the status of " + myArray[1];
    }
}
function processAbout(cmd)
{
    var myArray = /^about (.+)?\s*$/g.exec(cmd);
    if(myArray===null)
        return "What do you want to know about...?";
    switch(myArray[1])
    {
        case ship.name:
        case "ship":
            return ship.about;
        case "system":
            //return processAboutSystem(cmd);
            return "you are in a system, hmmm....";
        case "SAM":
            return SAM.about;

        default:
            return "I don't know about " + myArray[1];
    }
}
function processSet(cmd)
{
    
    var myArray=/^set (.+)\b\.(.+)\b\s(.+)\b$/g.exec(cmd);
    
    if(myArray!==null)
    {
        if(myArray[1] ==="ship")
        {
            return "Ship " + myArray[2] + " is " + myArray[3];
        }
    }
}
*/