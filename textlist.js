var TextModel = Backbone.Model.extend({
    defaults: {
        "value": ""
    },
    replace: function(str) {
        this.set("value", str);
    }
});
var counter = [];
var TextView = Backbone.View.extend({
    render: function() {
        var textVal = this.model.get("value");
        var btn = '<button id=clear>Clear</button>';
        var btn2 = '<button id=delbutton>Remove last</button>';
        var input = '<input type="text" value="' + textVal + '" />';
        this.$el.html(textVal + "<br><div>" + input + btn + btn2 + "</div>" + ' Has             been edited ' + counter.length + ' times.');
    },
    initialize: function() {
        this.model.on("change", this.render, this);
        // last argument 'this' ensures that render's
        // 'this' means the view, not the model
    },
    events: {
        "click #clear": "clear",
        "delete button": "delete",
        "keypress input": "updateOnEnter"
    },
    replace: function() {
        var str = this.$el.find("input").val();
        this.model.replace(str);
    },
    clear: function() {
        this.model.replace("");
        counter.push(3);
        console.log('Clear pushed to new counter.')
        this.render();
    },
    updateOnEnter: function(e) {
        if (e.keyCode == 13) {
            this.replace();
        }
    }
});

var TextCollection = Backbone.Collection.extend({
    model: TextModel
});
var newArr = [];
var TextCollectionView = Backbone.View.extend({
    render: function() {
        var btn = '<button id="addbutton">Add Text</button>';
        var div = '<div id="text-list"></div>';
        this.$el.html(div + btn);
        for (var i = 0; i < newArr.length; i++) {
            newArr[i].render();
            this.$("#text-list").append(newArr[i].$el);
        }
    },
    initialize: function() {
        this.listenTo(this.collection, 'add', this.addView);
        this.listenTo(this.collection, 'remove', this.delView);
    },
    events: {
        "click #addbutton": "addModel",
        "click #delbutton": "delete"
    },
    addModel: function() {
        this.collection.add({});
        // collection adds a model, fires add event, then listener calls this.addView(model)
    },
    addView: function(newModel) {
        newModel.set("value", "Talk");
        var view = new TextView({
            model: newModel
        });
        counter.push(1);
        newArr.push(view);
        this.render();
        console.log(newArr);
        console.log(counter.length);
    },
    delete: function() {
        console.log('Gone');
        var lastItem = newArr.pop();
        lastItem.remove();
        counter.push(2);
    },
    //    NEW REMOVE (MODEL ONLY)
    remove: function() {
        this.remove();
    },
});
$(document).ready(function() {
    var textCollection = new TextCollection();
    var textCollectionView = new TextCollectionView({
        collection: textCollection
    });
    textCollectionView.render();
    $("#listdiv").append(textCollectionView.$el);
});