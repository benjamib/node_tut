var SAM ={
    "about":"SAM is the shipboard AI, your digital wingman and partner in your adventure. SAM controls all of the shipboard systems through your commands. Type 'help SAM' to see a full list of what SAM can do.",
    "help": "command reference"

};
var ship = {
    "name" : "Sidhartha",
    "Status":{
    "Energy": 100,
    "Health": 100,
    "Sheilds":100,
    "Cargo_Cap" : 10,
    "Current_Cargo": 0
    },
    "type" : "AX1-C",
    "about": "Your ship is a functional single operator cargo hauler. The design is an AX1-C, a highly modular craft that is configured in the 'C' cargo variant. It is not fancy but does have adequate basic systems and an AI. No one would ever say that it is a sexy ship, perfect for hauling cargo, or making it appear like you are."
};
exports.GetAboutSAM = function(){
  return SAM.about;
};
exports.GetHelp = function(){
  return SAM.help;
};
exports.GetShip = function(){
  var str ="";
  str+="Name: " + ship.name;
  str+="\nType: "+ ship.type;
  str+="\n\n" + ship.about;
  return str;
};


class Location{
  constructor(name,x,y){
    //the name of the location
    this.name = name;
    //the curretn system that the location is part of
    this.system="Aegis";
    //the location to the north
    this.__north= ""
    //the location to the south
    this.__south = ""
    //the location to the east
    this.__east = ""
    //the location to the west
    this.__west = ""
    //what is found when you scan a location
    this.objects = [];
    //what can be seen in this location
    this.__look = "";
    //x-y pos
    this.pos = {
      "x":x,
      "y":y,
    };
    
  }
  get look(){
    return this.__look;
  }
  set look(newLook){
    this.__look = newLook;
  }
  lookNorth(){
    if(this.__north !== "")
      return this.__north.look;
    return "nothing to see here...";
  }
  lookSouth(){
    if(this.__south !== "")
      return this.__south.look;
    return "nothing to see here..."
    
  }
  lookEast(){
    if(this.__ease !== "")
      return this.__east.look;
    return "nothing to see here..."
  }
  lookWest(){
    if(this.__west !== "")
      return this.__west.look;
    return "nothing to see here..."
    
  }
  scan(){
    return this.objects;
  }
  addObject(newObj){
    this.objects.push(newObj);
  }
  set north(newLocation){
    this.__north = newLocation;
    if(newLocation.south ==="")
      newLocation.south = this;
  }
  get north(){
    return this.__north;
  }
  set south(newLocation){
    this.__south = newLocation;
    if(newLocation.north==="")
      newLocation.north = this;
  }
  get south(){
    return this.__south;
  }
  set east(newLocation){
    this.__east = newLocation;
    if(newLocation.west ==="")
      newLocation.west = this;
  }
  get east(){
    return this.__east;
  }
  set west(newLocation){
    this.__west = newLocation;
    if(newLocation.east==="")
      newLocation.east = this;
  }
  get west(){
    return this.__west;
  }
  
}
let Aegia = new Location("Aegia",5,10);
let Ferra = new Location("Ferra",5,11);
let AX1 = new Location("AX1",6,10);
AX1.look = "It's a shipyard, there are lots of ships..."
Ferra.look = "It's a moon!";
Aegia.look = "Aegia, the bustling center of the Aegis system. The planet is flecked with whisps of violet and teal clouds over land of deep green and wheat, and vast oceans of the deepest blue. AX1, a shipyard, is slightly to east of your view, humming with activity. Ferra, the Aegian moon, is just peeking over the horizon of Aegia, stone gray.";
Aegia.addObject("rock");
Aegia.north = Ferra;
Aegia.east = AX1;
let curLocation = Aegia;
exports.CurrentLocation = function(){
  return curLocation;
};
exports.MoveNorth = function(){
  if(curLocation.north!==""){
    curLocation = curLocation.north;
    return "Moved north";
  }
  return "Can't move further north...";
};
exports.MoveSouth = function(){
  if(curLoction.south !== ""){
    curLocation = curLocation.south;
    return "Moved south";
  }
  return "Can't move further south...";
};
exports.MoveEast = function(){
  if(curLocation.east !== ""){
    curLocation = curLocation.east;
    return "Moved east";
  }
  return "Can't move further east...";
};
exports.MoveWest = function(){
  if(curLocation.west !==""){
    curLocation = curLocation.west;
    return "Moved west";
  }
  return "Can't move further west...";
};

exports.GetLocation = function(){
  return "System: " + curLocation.system + "\nLocation: " + curLocation.name + "\nX: " + curLocation.pos.x + " Y: "+ curLocation.pos.y;
};
exports.GetWhoami = function(){
  var str=""
  str += "Name: Cmdr. Scout Jones";
  str += "\nOccupation: Silent Service Pilot";
  str += "\nAge: 29";
  str += "\nBio: Flying ships since they were 19. Joined the Corps at 21. Fought in the Chronis Uprising with distinguished service.";
  str += "\nCurrent Mission: Unknown";
  return str;
}
class Log {
  constructor(title,date,corrupted){
    this.title = title;
    this.date = date;
    this.content="";
    this.read = false;
    if(corrupted === null) corrupted = false;
    this.corrupted = corrupted;
  }
  ReadLog()
  {
    if(!this.corrupted){
      this.read = true;
      return "Title: " + this.title + "\nDate: " + this.date + "\n\n" + this.content;
    }
    else{
      return "Cannot read contents of this log, the contents are corrupted... "
    }
  }
}
var Logs = [];
let log1 = new Log("First Entry","1 March 2132");
Logs.push(log1);
log1.content = "Just took off from the AX1 shipyards with this old AX1-C. Cargo is loaded and we are heading for the rendevous five clicks west of Aegia. Should be there in a few days."
let log2 = new Log("Cargo Manifest","1 March 2132");
Logs.push(log2);
log2.content = "Remote Detonators qty: 5\nCX85 Mining Charge qty: 5\nV.2 Delivery Drones qty: 5\n\nCERTIFIED AX1 CARGO AGENT 634ATY";
let log3 = new Log("Orders","2 March 2132",true);
Logs.push(log3);
let log4 = new Log("@#$G $%^","@#$@GHF", true);
Logs.push(log4);
let log5 = new Log("Critical System Error","5 March 2132");
log5.content = "!!!SAM AUTOMATED MESSAGE!!!\nSystem reboot at 14:54:45.5656\n\nError Code: 34 - Power System Failure\nEnergy spike detected with external sensors. Signal indicates a high energy event. Power was diverted to life support systems.";
Logs.push(log5);

exports.DisplayLogs = function(){
  var str = "";
  str+= "=== Ship's Log ===\n\n";
  for(var i=0;i<Logs.length;i++){
    str+="\n"+ (i+1) + " - " + Logs[i].title;
  }
  return str;
};
exports.ReadLog = function(index){
  if(index <= 0 || index > Logs.length)
    return "Invalid log entry " + index +". Please enter a vlaue between 1 and " + Logs.length;
  return Logs[index-1].ReadLog();
}






var Loc_Aegia = {
    "name":"Aegia",
    "look": {
        "around":"Aegia, the bustling center of the Aegis system. The planet is flecked with whisps of violet and teal clouds over land of deep green and wheat, and vast oceans of the deepest blue. AX1, a shipyard, is slightly to east of your view, humming with activity. Ferra, the Aegian moon, is just peeking over the horizon of Aegia, stone gray.",
        "north":"An empty section of the system moving towards the Aegis sun.",
        "east": "The crowning acheivement of Aegia, a massive jump gate is under contruction. It nearly dwarfs the moon Ferra with it's immense size.",
        "west":"empty space",
        "south":"a non-descript area of empty space"
    },

    /*"objects":[Obj_Aegia,Obj_AX1,Obj_Ferra,Obj_Aegia_Beacon],*/
    "move":{
        "north":"",
        "east":"",
        "west":"",
        "south":""
    }

};
var Loc_Sector_2 = {
    "name":"An unnammed region of the Aegis system",
    
    "look": {
        "around": "The yellow white brightness from the Aegis Star is mellower at this orbit. In the far disance galaxies can be seen pulsing with energy. There is nothing of immediate interest in this area, but it has an inviting tranquility.",
        "north":"north lies the vastness of space",
        "east": "An empty region of the Aegis system with the captured Comet Julian a glowing spec in the distance",
        "west":"A debris field from a cosmic collision of some kind",
        "south":"The beggining of the Aegis Belt"
    },
    "scan":{
        "around": "Nothing but cold dark unforgiving space"
    },
    "objects":[],
    
    "move":{
    "north":"",
    "east":"",
    "west":"",
    "south":""
    }

};

/*var  = {
    "name":"",
    "look": {
        "around":"",
        "north":"",
        "east": "",
        "west":"",
        "south":"",
    },

    "objects":[],
    
    "move": {
        "north":"",
        "east":"",
        "west":"",
        "south:""
    }
};*/

//let test = new system("test");
//let testLoc = new location("test_loc",test);
//alert(testLoc.name);

var Loc_Sector_1 = {
    "name":"Unammed region of the Aegis system.",
    "look": {
        "around" :"You are currently in an empty sector of the Aegis system. Outside is the vastness of space with brilliant stars in all directions.",
        "north":"Directly north is Aegia, the most heavily populated planet in the Aegis system. Orbiting Aegia are two satellites, AX1, a shipyard, and Ferra, a moon that houses the Aegian planetary administrative offices.",
        "east":"To the east is the captured Comet Julian.",
        "west":"To the west is empty space",
        "south":"South is the beginning edge of the asteroid belt that rings the Aiegis system, the Aiegis Belt.",
    },
    "scan":{
        "around": "Your sensors don't pick up anything of interest in the area"
    },
    "objects":[],
    "move":{
    "north":"",
    "east":"",
    "west":"",
    "south":""
    },
    "system": "Aegis"

};
Loc_Sector_1.move.north = Loc_Aegia;
//Loc_Sector_1.move.east = Loc_Julian;
Loc_Sector_1.move.west = Loc_Sector_2;
//Loc_Sector_1.move.south = Loc_Aegis_Belt_1;

/*var Sys_Aegis = {
    "name":"Aegis",
    "locations":[Loc_Sector_1,Loc_Aegia,Loc_Julian,Loc_Sector_2,Loc_Aegis_Belt_1]
};*/