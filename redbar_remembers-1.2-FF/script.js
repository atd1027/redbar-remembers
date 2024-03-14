console.log('think');
var video;
var storedTime;
var extEnabled = window.localStorage.getItem('extensionEnabled');
if (extEnabled === undefined || extEnabled === null) {
    console.log('setting state to true');
    window.localStorage.setItem('extensionEnabled', 'true');
    var isEnabled = true;
} else {
    var isEnabled = localStorage.getItem('extensionEnabled') === 'true';
    console.log('state evaluated to: ' + isEnabled);
}

window.addEventListener('load', function() {
    
    // Access the <iframe> element
    const iframe = document.querySelector('iframe');
    if (iframe.contentWindow.document) {
        video = iframe.contentWindow.document.querySelector('video-js video');
        if (video) {
            const timeKey = `${video.baseURI.split('=')[1]}`;
            console.log(timeKey);
            // Retrieve stored time from local storage when page loads
            storedTime = localStorage.getItem(timeKey);
            console.log('Stored time retrieved:', storedTime);
            if (storedTime !== null && isEnabled) {
                video.currentTime = parseFloat(storedTime); // Set current time
            } else {
                storedTime = 0;
            }
            
            // Store current time periodically while the video is playing
            setInterval(function() {
                if (video.currentTime !== storedTime && isEnabled) {
                    storedTime = video.currentTime;
                    localStorage.setItem(timeKey, storedTime);
                    console.log('Current time stored:', storedTime);
                }
            }, 1000); // Store time every second
            
            // Store current time when the video is paused
            video.addEventListener('pause', function() {
                if (isEnabled) {
                    storedTime = video.currentTime;
                    localStorage.setItem(timeKey, storedTime);
                    console.log('Video paused. Current time stored:', storedTime);
                }
            });

            
             

            

        } else {
            console.log('Failed to find video element.');
        }
    }
});