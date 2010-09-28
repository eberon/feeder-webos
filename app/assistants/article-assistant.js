var ArticleAssistant = Class.create(BaseAssistant, {
  initialize: function($super, article) {
    $super()
    this.article = article
  },
  
  setup: function($super) {
    $super()
    this.controller.listen("starred", Mojo.Event.tap, this.setStarred.bind(this))
    this.controller.listen("shared", Mojo.Event.tap, this.setShared.bind(this))
    this.controller.listen("read", Mojo.Event.tap, this.setRead.bind(this))
    this.controller.listen("sendto", Mojo.Event.tap, this.sendTo.bind(this))
  },
  
  cleanup: function($super) {
    $super()
    this.controller.stopListening("starred", Mojo.Event.tap, this.setStarred)
    this.controller.stopListening("shared", Mojo.Event.tap, this.setShared)
    this.controller.stopListening("read", Mojo.Event.tap, this.setRead)
    this.controller.stopListening("sendto", Mojo.Event.tap, this.sendTo)
  },
  
  ready: function($super) {
    $super()
    this.controller.get("title").update(this.article.title)
    this.controller.get("author").update(this.article.author ? "by " + this.article.author : this.article.origin)
    this.controller.get("summary").update(this.article.summary)

    if(this.article.isRead) {
      this.controller.get("read").addClassName("on")
    }
    
    if(this.article.isStarred) {
      this.controller.get("starred").addClassName("on")
    }

    if(this.article.isShared) {
      this.controller.get("shared").addClassName("on")
    }
    
    if(!this.article.isRead) {
      this.toggleState(this.controller.get("read"), "Read")
    }
  },
  
  setStarred: function(event) {
    this.toggleState(event.target, "Star")
  },

  setShared: function(event) {
    this.toggleState(event.target, "Share")
  },

  setRead: function(event) {
    this.toggleState(event.target, "Read")
  },

  toggleState: function(target, state) {
    if(!target.hasClassName("working")) {
      target.addClassName("working")
      target.toggleClassName("on")

      this.article["turn" + state + (target.hasClassName("on") ? "On" : "Off")](function() {
        target.removeClassName("working")
      })      
    }
  },
  
  sendTo: function(event) {
    
  }
})