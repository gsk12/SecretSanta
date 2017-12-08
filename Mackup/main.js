 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-CHE7Zi_4yZ0bFxX_NquEYewjCxQ9ytI",
    authDomain: "secret-santa-app-zcam07.firebaseapp.com",
    databaseURL: "https://secret-santa-app-zcam07.firebaseio.com",
    projectId: "secret-santa-app-zcam07",
    storageBucket: "secret-santa-app-zcam07.appspot.com",
    messagingSenderId: "76344904717"
  };
  firebase.initializeApp(config);
var userID;
function onGenerate()
{
    console.log(userID+" <-");
//firebase.database().ref().  set({username:"hi"});
// var ref = firebase.database().ref();
// ref.on("value", function(snapshot) {
//   // console.log(snapshot.val());
//    snapshot.val();
// }, function (error) {
//    console.log("Error: " + error.code);
// });

var otherNames=new Array();
firebase.database().ref(userID+"/mySelection").set("1");
var myDetails = firebase.database().ref().orderByChild("selectedMe").equalTo("0");
myDetails.on('child_added', function(data) {
    //console.log(data.val().name.equalTo("Chandu"));
    var name=data.val().name;
    if(name!=document.getElementById("santaName").value)
    {
        //console.log(name," - " +data.key);
        otherNames.push(name);
    }
  //if(!data.val().name.equalTo(document.getElementById("santaName").value)){
    //console.log(data.val().name + " - " +data.key);
 // }
//   var selectionList = firebase.database().ref().orderByChild("selectedMe").equalTo("0");
//   selectionList.on('child_added', function(data2) {
//       if(data2.val().name.equals(data.val().name))
//     console.log(data2.val().name);
//   });
});
otherNames=shuffleNames(otherNames);
getNames1(otherNames);
console.log(otherNames);
document.getElementById("generateButton").disabled = true;
document.getElementById("VerifyButton").disabled = true;
}
function getNames1(otherNames)
{
    console.log("Entered getNames1");
    var name=new Array();
    var commentsRef = firebase.database().ref();

commentsRef.on('child_added', function(data) {
    name.push(data.val().name);
   //console.log(userID);
});
setTimeout(assignSantaChild,5000,otherNames,name);
}
function assignSantaChild(otherNames,name)
{
    var santaChild=otherNames[0];
    var id;
    id = name.indexOf(santaChild);
    console.log("santachildId--",id);
    ans=document.getElementById("answer");
    ans.innerHTML="Your Child is <strong style='color:white; font-size:x-large;'>"+santaChild +"..</strong>";
    firebase.database().ref(id+"/selectedMe").set("1");
}
function check(name)
{
    var santaName=document.getElementById("santaName").value;
   // console.log(name.indexOf(santaName));
   var ans=document.getElementById("answer");
    if(name.indexOf(santaName)>=0)
{
    userID = name.indexOf(santaName)+"";
    console.log(userID);
    ans=document.getElementById("answer");
    ans.innerHTML="Yes! You are eligible. Please click <strong style='color:black;'>Show My Child!</strong> button.";
    var k=document.getElementById("generateButton").style.display="block";
}
else{
    ans.innerHTML="No, You are not eligible.";
}
}
function getNames()
{
    document.getElementById("VerifyButton").disabled = true;
    document.getElementById("santaName").disabled = true;
    console.log("clicked");
    var name=new Array();
    var commentsRef = firebase.database().ref();

commentsRef.on('child_added', function(data) {
    name.push(data.val().name);
   //console.log(userID);
});
setTimeout(check,5000,name);
}


function shuffleNames(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}