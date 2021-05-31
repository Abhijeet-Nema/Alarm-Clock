console.log("Welcome to the Console");
let AlarmTime = document.getElementById("AlarmTime");
//console.log(AlarmTime.value);
AlarmTime.value = "23:59";
let SavedInlocalStorage = localStorage.getItem("Alarms");
const AlarmRing = new Audio("Alarm.mp3");

if (SavedInlocalStorage == null) {
   AlarmList = [];
}

else {
   AlarmList = JSON.parse(SavedInlocalStorage);
}

DisplayAlarms(AlarmList);



setInterval(() => {

   // let AlarmTime = document.getElementById("AlarmTime");
   // console.log(AlarmTime.value)

   // console.log("Inside Interval");

   let date = new Date();
   /* date.setHours(3);
    date.setMinutes(8);*/
   let HoursNow = date.getHours();
   let MinutesNow = date.getMinutes();



   let SecondsNow = date.getSeconds();


   //console.log(HoursNow,MinutesNow,SecondsNow);

   let HRotation = HoursNow * 30 + MinutesNow / 2;
   let MRotation = MinutesNow * 6;
   let SRotation = SecondsNow * 6;

   let HoursHand = document.getElementById("HoursHand");
   let MinutesHand = document.getElementById("MinutesHand");
   let SecondsHand = document.getElementById("SecondsHand");
   let ClockImg = document.getElementById("ClockImg");
   let TimeDisplayer = document.getElementById("TimeDisplayer");

   if (String(MinutesNow).length < 2) {
      Mint = `0${String(MinutesNow)}`;
   }

   else {
      Mint = String(MinutesNow);
   }


   if (String(HoursNow).length < 2) {
      Hor = `0${String(HoursNow)}`;
   }

   else {
      Hor = String(HoursNow);
   }




   TimeDisplayer.innerHTML = ` ${Hor}:${Mint} `;

   HoursHand.style.transform = `translateX(-50%) rotate(${HRotation}deg)`;

   MinutesHand.style.transform = `translateX(-50%) rotate(${MRotation}deg)`;

   SecondsHand.style.transform = `translateX(-50%) rotate(${SRotation}deg)`;

   let AlarmTime = document.getElementById("AlarmTime");
   //console.log(AlarmTime.value);
   //AlarmTime.value = "23:59";

   let AlarmTimeDisplay = document.getElementsByClassName("AlarmTimeDisplay")[0];


   AlarmTimeDisplay.innerHTML = AlarmTime.value;


}, 1000)
// button to set an alarm
let SetBtn = document.getElementById("SetBtn");

SetBtn.addEventListener("click", SettingAlarm);

function SettingAlarm(){
   
      // console.log("hello");

      // let AlarmTime = document.getElementById("AlarmTime");
      // console.log(typeof AlarmTime.value);

      let SavedInlocalStorage = localStorage.getItem("Alarms");

      if (SavedInlocalStorage == null) {
         AlarmList = [];
      }

      else {
         AlarmList = JSON.parse(SavedInlocalStorage);
      }


      AlarmList.push(AlarmTime.value);

      // console.log(AlarmList);

      localStorage.setItem("Alarms", JSON.stringify(AlarmList));

      DisplayAlarms(AlarmList);


  
}


function DisplayAlarms(arr) {
   let TempStr = "";
   arr.forEach((TimeSlot, index) => {

      // console.log(TimeSlot);

      TempStr += `<div class="card text-center">
                <div class="card-body">
                    <h2 class="card-title">Alarm#${index + 1}</h2>
                    <p class="card-text"><em> This Alarm has been set to make you awake at </em> <strong> ${TimeSlot} </strong></p>
                    <button id="${index}" onclick="Confirm(this.id)" class="btn btn-danger">Delete Alarm</button>
                </div>
            </div>`;

   });

   let AlarmDisplayer = document.getElementById('AlarmDisplayer');

   if (arr.length < 1) {
      AlarmDisplayer.innerHTML = `<em style="opacity:0.56;">Nothing To show here...Try setting an alarm </em>`;
   }

   else {
      AlarmDisplayer.innerHTML = TempStr;
   }

}


function DeleteAlarm(i) {



   let SavedInlocalStorage = localStorage.getItem("Alarms");

   if (SavedInlocalStorage == null) {
      AlarmList = [];
   }

   else {
      AlarmList = JSON.parse(SavedInlocalStorage);
   }

   AlarmList.splice(i, 1);
   localStorage.setItem("Alarms", JSON.stringify(AlarmList));
   DisplayAlarms(AlarmList);


}

// To match the time for ringing the alarm
setInterval(() => {

   let NewDate = new Date();
   //NewDate.setMinutes(53);
   // NewDate.setHours(1);

   let Hour = String(NewDate.getHours());
   let Minutes = String(NewDate.getMinutes());

   if (Minutes.length < 2) {
      Minutes = `0${Minutes}`;
   }

   if (Hour.length < 2) {
      Hour = `0${Hour}`;
   }


   let TimeToMatch = `${Hour}:${Minutes}`;
   // console.log(TimeToMatch);


   AlarmList.forEach((Time) => {

      // console.log(Time);

      if (TimeToMatch == Time) {
         // console.log('success');
         AlarmRing.play();

         let IndexOfFinishedAlarm = AlarmList.indexOf(Time);

         setTimeout(() => {
            AlarmRing.pause();
            DeleteAlarm(IndexOfFinishedAlarm);

         }, 40000);

      }





   });








}, 1000);

function Confirm(i){

   // console.log(i);

   let check = confirm("You are about to delete an Alarm !!!");

   if (!check) {
      return;
   }

   // console.log(check);

   DeleteAlarm(i);



}

window.addEventListener("keydown", (e)=>{

   let x = e.key;

   // console.log(x);

   if (x === "Enter") {
      SettingAlarm();
   }


})