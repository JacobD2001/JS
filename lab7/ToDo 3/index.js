//TO DO3: third-party library

interval(saveCToSessionStorage) //passes saveCToSessionStorage to interval

//sets up a timer that increments every 2 seconds(each time calling 2 functions)
//setInterval says execute interval every 2 seconds
//inside setInterval there is an anonymous function(without a name) that calls callback function
function interval(callback) {
  let timer = 1
  setInterval(
    () => {
      callback(timer)
      discoverPowerBallNumber(timer)
      timer++
    }
    , 2000)
}


//logs provided data to console
//third party lib 
class Logger {
  static log(data) {
    console.log(data);
  }

  static logFromC(data) {
    console.log('[reader C]', data)
    Logger.log(`[log from C] ${data}`);
  }

  static logPowerBallNumber(number){
    console.log('[powerball number]', number)
  }
  
}


function saveCToSessionStorage(data) { //takes data
  Logger.logFromC(data); //logs data
  const storageData = { data } //store data
  sessionStorage.setItem('C', JSON.stringify(storageData)) //store data in session storage
}

//generates a random number based on data & logs it
function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100)
  Logger.logPowerBallNumber(number)
}



