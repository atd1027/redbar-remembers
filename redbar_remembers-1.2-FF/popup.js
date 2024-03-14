console.log("hello");

document.getElementById("toggleButton").src = isEnabled
browser.runtime.getBackgroundPage();
document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleButton');
  
    // Retrieve the current toggle state from local storage
    var isEnabled = localStorage.getItem('extensionEnabled') === 'true';
    console.log('popup: ' + isEnabled);
    try {
      document.getElementById("toggleButton").src = isEnabled ? "icons/rb128.png" : 'icons/gb128.png';
    } catch(err) {
      console.log(err);
    }
    console.log('deep: ');
    // Add a click event listener to toggle the extension
    toggleButton.addEventListener('click', function() {
      // Toggle the extension state
      isEnabled = !isEnabled;
      
      var src = isEnabled ? "icons/rb128.png" : "icons/gb128.png";
      document.getElementById("toggleButton").src = src;
      // Store the updated toggle state in local storage
      var state = isEnabled ? 'true' : 'false';
      localStorage.setItem('extensionEnabled', state);
    });
  });