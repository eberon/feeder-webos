var ItemAssistant = Class.create(BaseAssistant, {
  initialize: function($super, google, feed, item) {
    $super()
    this.google = google
    this.feed = feed
    this.item = item
  },
  
  ready: function($super) {
    $super()
    this.controller.get("header").update(this.item.title)
    this.controller.get("summary").update(this.cleanUp(this.item.summary.content))
  },
  
  cleanUp: function(content) {
    var cleaned = content.replace(/<script.*?<\/script.*?>/g , "")
    cleaned = cleaned.replace(/<iframe.*?<\/iframe.*?>/g , "")
    cleaned = cleaned.replace(/<object.*?<\/object.*?>/g , "")
    return cleaned
  }
})