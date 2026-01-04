const displayTime = document.getElementById('displayTime')

function Time(){
    if (displayTime === null || !(displayTime instanceof HTMLElement)) {
        throw new Error("Time not found")
    }
    const dateAndTime = new Date();
    let hours = dateAndTime.getHours();
    const minutes = dateAndTime.getMinutes();
    displayTime.innerHTML = `${hours}:${minutes}`;
}
Time();
setInterval(Time, 1000);