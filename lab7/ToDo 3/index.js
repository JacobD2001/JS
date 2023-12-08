//TO DO3: third-party library

interval(saveCToSessionStorage)
interval(discoverPowerBallNumber)
//passes saveCToSessionStorage to interval
//sets up a timer that increments every 2 seconds(each time calling 2 functions)
//setInterval says execute interval every 2 seconds
//inside setInterval there is an anonymous function(without a name) that calls callback function
function interval(callback) {
  let timer = 1
  setInterval(
    () => {
      callback(timer)
      //callback(timer)
      timer++
    }
    , 2000)
}

class Observable {
  constructor() {
    this.observers = []; // observers: an array of observers that will get notified whenever a specific event occurs
  }

  addObserver(obs) {
    this.observers.push(obs);
  }
  removeObserver(obs) {
    this.observers = this.observers.filter((observer) => observer !== obs);
  }
  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

//logs provided data to console
//third party lib 
class Logger {
  static log(data) {
    console.log(`[log from C] ${data}`);
    //console.log(`[powerball number]  ${data.number}`);

  }

  static log1(number){
    console.log(`[powerball number]  ${number}`)
  }

}

const logger = new Logger();
const observable = new Observable();
const observable1 = new Observable();

observable.addObserver(Logger.log);
observable1.addObserver(Logger.log1);

function saveCToSessionStorage(data) { //takes data
  const storageData = { data } //store data
  sessionStorage.setItem('C', JSON.stringify(storageData)) //store data in session storage
  observable.notify(data);
}

//generates a random number based on data & logs it
function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100)
  observable1.notify(number);
}



