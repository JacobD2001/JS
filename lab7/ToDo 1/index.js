//TO DO1: Usuń coupling pomiędzy funkcjami interval() a saveCToSessionStorage() 
//z przykładu w index.js zachowując działanie kodu
// (timer co 2s jest dalej przekazywany do funkcji saveCToSessionStorage)

interval(saveCToSessionStorage) //passes saveCToSessionStorage to interval

//sets up a timer that increments every 2 seconds(each time calling 2 functions)
//setInterval says execute interval every 2 seconds
//inside setInterval there is an anonymous function(without a name) that calls callback function
function interval(callback) {
  let timer = 1
  setInterval(
    () => {
      // mamy coupling - interval ma na sztywno zaszyte w sobie C i D (..i logger)
      callback(timer)
      discoverPowerBallNumber(timer)
      timer++
    }
    , 2000)
}


//logs provided data to console
class Logger {
  static log(data) {
    console.log(data)
  }
}

function saveCToSessionStorage(data) { //takes data
  console.log('[reader C]', data) //logs data
  const storageData = { data } //store data
  sessionStorage.setItem('C', JSON.stringify(storageData)) //store data in session storage
  // brudzimy funkcję loggerem - to nie jest jej funkcjonalność!
  Logger.log(`[log from C] ${data}`) //logs data again
}

//generates a random number based on data & logs it
function discoverPowerBallNumber(data) {
  const number = Math.floor(Math.random() * data * 100)
  console.log('[powerball number]', number)
}