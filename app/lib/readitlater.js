var Readitlater = {
    get: function(url, okCallback) {
	
	var key = '032A7q95d778aR8643pfn79NR9T5w596';
	
    new Ajax.Request("https://text.readitlaterlist.com/v2/text", {
        method: "get",
		asynchronous: false,
        parameters: {'apikey':key, 'url':url, 'images':1},
        onSuccess: okCallback
      })
  }
}
