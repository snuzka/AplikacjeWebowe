const minimum = document.getElementById("minimum");
const maksimum = document.getElementById("maksimum");
const form = document.getElementById("settings");
const capital = document.getElementById("capital");
const special = document.getElementById("special");


form.addEventListener("submit", (event) =>{
  event.preventDefault();
  let mini = Number(minimum.value);
  let maks = Number(maksimum.value);

  if (mini>maks) {
    alert("Podane minimum jest większe niż maksimum!");
  }
  else if (mini<2 && capital.checked && special.checked) {
    alert("Minimum jest zbyt małe");
  }
  else {
    let chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let capitals = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let specials = "!@#$%^&*()-=+_[]{};:/?><.,~";
    let capitalPos=-1;
    let specialPos=-1;
    let length = Math.floor(Math.random()*(maks-mini+1)+mini);
    if (capital.checked && special.checked) {
      capitalPos=Math.floor(Math.random()*(length));
      specialPos=Math.floor(Math.random()*(length-1));
      if (specialPos==capitalPos) {
        specialPos=length-1;
      }
      chars+=capitals;
      chars+=specials;
    }
    else {
      if (capital.checked) {
        capitalPos=Math.floor(Math.random()*(length));
        chars+=capitals;
      }
      if (special.checked) {
        specialPos=Math.floor(Math.random()*(length));
        chars+=specials;
      }
    }

    let result="";

    for (let i=0; i<length; i++)
    {
      if (i==capitalPos) {result += capitals[Math.floor(Math.random()*capitals.length)]}
      else if (i==specialPos) {result += specials[Math.floor(Math.random()*specials.length)]}
      else {result+= chars[Math.floor(Math.random()*chars.length)]}
    }
    alert(result);
  }
})