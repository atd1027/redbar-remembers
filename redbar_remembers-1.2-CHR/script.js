console.log('think');

var storedTime;
window.addEventListener('load', function() {
    // Access the <iframe> element
    const iframe = document.querySelector('iframe');
    if (iframe.contentWindow.document) {
        // Access the <video> element inside the iframe document
        const videoElement = iframe.contentWindow.document.querySelector('video-js video');
        if (videoElement) {
            const timeKey = `${videoElement.baseURI.split('=')[1]}`
            console.log(timeKey);
            // Retrieve stored time from local storage when page loads
            storedTime = localStorage.getItem(timeKey);
            console.log('Stored time retrieved:', storedTime);
            if (storedTime !== null) {
                videoElement.currentTime = parseFloat(storedTime); // Set current time
            } else {
                storedTime = 0;
            }
            
            // Store current time periodically while the video is playing
            setInterval(function() {
                if (videoElement.currentTime !== storedTime) {
                    storedTime = videoElement.currentTime;
                    localStorage.setItem(timeKey, storedTime);
                    console.log('Current time stored:', storedTime);
                }
            }, 1000); // Store time every second
            
            // Store current time when the video is paused
            videoElement.addEventListener('pause', function() {
                storedTime = videoElement.currentTime;
                localStorage.setItem(timeKey, storedTime);
                console.log('videoElement paused. Current time stored:', storedTime);
            });

        } else {
            console.log('No <video> element found inside the iframe');
        }
    } else {
        console.log('Failed to access document inside the iframe');
    }
});