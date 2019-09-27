var refreshes_count = 0;
var startTime = 0;
var endTime = 0;

function doBenchmark(tab, amount) {
    refreshes_count = 0;
    startTime = new Date();
    chrome.tabs.reload(tab);
    chrome.tabs.onUpdated.addListener(function doBenchmark(tabId, info) {
        if (tabId === tab && info.status === 'complete') {
            if (++refreshes_count >= amount) {
                endTime = new Date();
                chrome.tabs.sendMessage(tab, {"message": "benchmark_done", "amount": amount, "time": (endTime - startTime)});
                chrome.tabs.onUpdated.removeListener(doBenchmark);
                return;
            }
            chrome.tabs.reload(tab);
        }

    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "start_benchmark") {
            doBenchmark(request.tab, request.amount);
        }
    }
);
