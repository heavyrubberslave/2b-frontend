import '../css/site.scss';

import socketCluster from 'socketcluster-client';
import rangeSlider from 'rangeslider-pure';

const socket = socketCluster.connect({
    port: 8000
});

socket.on('error', function (err) {
    console.error(err);
});

socket.on('connect', function () {
    console.log('Device is connected');
});

socket.on('status', function (data) {
    console.log('Received status data from device: ');
    console.log(data);
});

let currentContainer = document.getElementById('main-control');

const sliderPulsePwm = document.getElementById('pulse-pwm');
const setCurrentPulsePwmValue = function (value) {
    document.getElementById('pulse-pwm-current').innerText = value;
};

setCurrentPulsePwmValue(sliderPulsePwm.value);

rangeSlider.create(sliderPulsePwm, {
    onSlideEnd: function (value) {
        socket.emit('pulsePwm', value);
        console.log('New pulse PWM: ' + value);
    },
    onSlide: setCurrentPulsePwmValue,
});

const sliderPulseFrequency = document.getElementById('pulse-frequency');
const setCurrentPulseFrequencyValue = function (value) {
    document.getElementById('pulse-frequency-current').innerText = value;
};

setCurrentPulseFrequencyValue(sliderPulseFrequency.value);

rangeSlider.create(sliderPulseFrequency, {
    onSlideEnd: function (value) {
        socket.emit('pulseFrequency', value);
        console.log('New pulse frequency: ' + value);
    },
    onSlide: setCurrentPulseFrequencyValue,
});

const sliderPowerChannelA = document.getElementById('channel-a-power');
const setCurrentPowerChannelAValue = function (value) {
    document.getElementById('power-channel-a-current').innerText = value + '%';
};

setCurrentPowerChannelAValue(sliderPowerChannelA.value);

rangeSlider.create(sliderPowerChannelA, {
    onSlideEnd: function (value) {
        socket.emit('power', {
            channel: 'A',
            percentage: value,
        });
        console.log('Power channel A: ' + value);
    },
    onSlide: setCurrentPowerChannelAValue,
});

const sliderPowerChannelB = document.getElementById('channel-b-power');
const setCurrentPowerChannelBValue = function (value) {
    document.getElementById('power-channel-b-current').innerText = value + '%';
};

setCurrentPowerChannelBValue(sliderPowerChannelB.value);

rangeSlider.create(sliderPowerChannelB, {
    onSlideEnd: function (value) {
        socket.emit('power', {
            channel: 'B',
            percentage: value,
        });
        console.log('Power channel B: ' + value);
    },
    onSlide: setCurrentPowerChannelBValue,
});

Array.from(document.getElementsByClassName('nav-link')).forEach(function (el) {
    el.onclick = function () {
        Array.from(document.getElementById('nav-main').getElementsByClassName('active')).forEach(function (navEl) {
            navEl.classList.toggle('active');
        });

        this.parentNode.classList.toggle('active');

        currentContainer.classList.toggle('hidden');
        currentContainer = document.getElementById(this.getAttribute('data-main'));
        console.log('show: ' + this.getAttribute('data-main'));
        currentContainer.classList.toggle('hidden');
        console.log(this.getAttribute('data-main'));
    }
});
