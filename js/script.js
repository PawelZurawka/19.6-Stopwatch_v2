//Szablon klasy
class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print();
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
    this.addResult();
  }

  //Dodawanie elementu do listy
  addResult() {
    var list = document.getElementById('results');
    var listItem = document.createElement('li');
    if (
      //gdy stoper jest zatrzymany nie można dodawać poprzez klikniecie stop tego samego wyniku
      (this.times.miliseconds !== 0 ||
        this.times.seconds !== 0 ||
        this.times.minutes !== 0) &&
      (list.childNodes.length === 0 ||
        list.lastChild.innerHTML !== this.format(this.times))
    ) {
      listItem.innerHTML = this.format(this.times);
      list.appendChild(listItem);
    }
  }

  //Czyszczenie listy
  clearList() {
    document.getElementById('results').innerHTML = '';
  }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
  stopwatch.reset();
});

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
  resetButton.classList.add('disabled');
  resetButton.disabled = true;
  stopwatch.start();
});

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
  resetButton.classList.remove('disabled');
  resetButton.disabled = false;
  stopwatch.stop();
});

let clear = document.getElementById('clear');
clear.addEventListener('click', () => stopwatch.clearList());

//Ta funkcja dodaje zero
function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
