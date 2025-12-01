const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("Timer");

let started=false;
let seconds=0;
let minutes=0;


start.addEventListener("click", () => {
    started=true;
})

stop.addEventListener("click", () => {
    started=false;
})


reset.addEventListener("click", () => {
    started=false;
    seconds=0;
    minutes=0;
    update();
})


function update() 
{
    if(started)
    {
        seconds+=1;
          if(seconds===60)
          {
            seconds=0;
            minutes+=1;
          }
    }
    if (minutes>0)
    {
        timer.textContent=`${minutes}m${seconds}s`; 
    }
    else
    {
        timer.textContent=`${seconds}s`;
    }
     
    
    
}

update();
setInterval(update, 1000);