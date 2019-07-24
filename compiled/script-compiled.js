'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Szablon klasy
var Stopwatch = function () {
  function Stopwatch(display) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
    }
  }, {
    key: 'print',
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: 'format',
    value: function format(times) {
      return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
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
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'lap',
    value: function lap() {
      this.addResult();
    }

    //Dodawanie elementu do listy

  }, {
    key: 'addResult',
    value: function addResult() {
      var list = document.getElementById('results');
      var listItem = document.createElement('li');
      if (
      //gdy stoper jest zatrzymany nie można dodawać poprzez klikniecie lap tego samego wyniku
      (this.times.miliseconds !== 0 || this.times.seconds !== 0 || this.times.minutes !== 0) && (list.childNodes.length === 0 || list.lastChild.innerHTML !== this.format(this.times))) {
        listItem.innerHTML = this.format(this.times);
        list.appendChild(listItem);
      }
    }

    //Czyszczenie listy

  }, {
    key: 'clearList',
    value: function clearList() {
      document.getElementById('results').innerHTML = '';
    }
  }]);

  return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
  stopwatch.reset();
});

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
  resetButton.classList.add('disabled');
  resetButton.disabled = true;
  stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  resetButton.classList.remove('disabled');
  resetButton.disabled = false;
  stopwatch.stop();
});

var lapButton = document.getElementById('lap');
lapButton.addEventListener('click', function () {
  stopwatch.lap();
});

var clear = document.getElementById('clear');
clear.addEventListener('click', function () {
  return stopwatch.clearList();
});

//Ta funkcja dodaje zero
function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
