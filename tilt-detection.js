var highSide = ''

function requestTiltDetectionPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'undefined') {
        return
    }

    DeviceOrientationEvent.requestPermission().then(function (permissionState) {
        if (permissionState === 'granted') {
            registerEventListener()
        }
    })
}

function registerEventListener() {
    window.addEventListener('deviceorientation', deviceOrientationEventHandler)
}

function deviceOrientationEventHandler(event) {
    let newHighSide

    if (event.gamma < 0 && event.beta > 0) {
        newHighSide = 'left'
    } else if (event.gamma < 0 && event.beta < 0) {
        newHighSide = 'right'
    } else if (event.gamma > 0 && event.beta < 0) {
        newHighSide = 'left'
    } else if (event.gamma > 0 && event.beta > 0) {
        newHighSide = 'right'
    }

    if (highSide === newHighSide) {
        return
    }

    highSide = newHighSide

    fireDeviceTiltChangeEvent(highSide)
}

function fireDeviceTiltChangeEvent(highSide) {
    window.dispatchEvent(
        new CustomEvent('device-tilt-change', {
            detail: { highSide },
        })
    )
}

registerEventListener()
