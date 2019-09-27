var runButton = document.getElementById('runButton');
var amountInput = document.getElementById('amountInput');
var amount = 0;

runButton.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        amount = parseInt(amountInput.value);
        if (isNaN(amount) || !isFinite(amount)) {
            alert("Must be a valid number");
            return;
        }
        if (amount === 0)
            return;
        chrome.tabs.sendMessage(tabs[0].id, {"message": "start_refresh_cycle", "tab": tabs[0].id, "amount": amount});
        window.close();
    });
}
