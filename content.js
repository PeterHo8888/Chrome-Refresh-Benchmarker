chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "start_refresh_cycle")
            chrome.runtime.sendMessage({"message": "start_benchmark", "tab": request.tab, "amount": request.amount});
        if (request.message === "benchmark_done")
            alert("Finished " + request.amount + " refreshes in " + request.time + "ms\n" + "Average: " + (request.time / request.amount) + "ms");
	}
);
