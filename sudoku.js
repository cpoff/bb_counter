
var SqModel = Backbone.Model.extend({
    defaults : {num:0}
});

var SqCollection = Backbone.Collection.extend({
    model : SqModel
});

var coll = new SqCollection();
    
for (i = 0; i < 81; i++){
    coll.add([{num:i}])
};

//
//
//----------------
//var TextModel = Backbone.Model.extend({
//    defaults : {"model" : "SqModel"},
//    replace : function (str) {
//      this.set("value", str);
//    }
//});
//
//var TextView = Backbone.View.extend({
//    render: function () {
////        DISPLAY ENTIRE GAME BOARD.
//    }
////        this.$el.html(textVal+"<br><div>" + input + btn + btn2 + "</div>");
//    },
//    initialize: function () {
////        this.model.on("change", this.render, this);
////       RENDER INITIAL STRING ENTRY.
//    },
//        
//    events : {
//        "click #clear" : "clear",
//        "insert button" : "insert",
//        "keypress input" : "updateOnEnter"
//    },
//    replace : function () {
////        var str = this.$el.find("input").val();
////        this.model.replace(str);
////       REPLACE EXISTING VALUE WITH NEW INPUT VALUE.
//    },
//    clear: function () {
//        this.model.replace("");
////       RETURN SQUARE VALUE TO ORIGINAL STATE.
//    },
//
////    updateOnEnter: function (e){
////        if(e.keyCode == 13) {
////            this.replace();
////        }
////    }
//});
//
//var TextCollection = Backbone.Collection.extend({
//    model : TextModel
//});
//
//var newArr = [];    
//var TextCollectionView = Backbone.View.extend({
//    render : function () {
//        var btn = '<button id="addbutton">Add Text</button>';
//        var div = '<div id="text-list"></div>';
//        this.$el.html(div + btn);
//        for(var i=0; i < newArr.length; i++) {
//            newArr[i].render();
//            this.$("#text-list").append(newArr[i].$el);
//        }
//    },
//    initialize : function () {
//        this.listenTo(this.collection, 'add', this.addView);
//        this.listenTo(this.collection, 'remove', this.delView);
//    },
//    events : {
//        "click #addbutton" : "addModel",
//        "click #delbutton" : "delete"
//    },
//    addModel : function () {
//        this.collection.add({});
//        // collection adds a model, fires add event, then listener calls this.addView(model)
//    },
//    
//    addView : function (newModel) {
//        newModel.set("value","Talk");
//        var view = new TextView({model : newModel});
//        console.log(newArr);
//        newArr.push(view);
//        this.render();
//    },
//    
//    delete : function () {
//        console.log('Gone');
//        var lastItem = newArr.pop();
//        lastItem.remove();
//    },
////    NEW REMOVE (MODEL ONLY)
//    remove: function () {
//        this.remove();
//    },   
//});
//
//$(document).ready( function () {
//
//var textCollection = new TextCollection();
//
//var textCollectionView = new TextCollectionView({ collection : textCollection});
//
//textCollectionView.render();
//
//$("#gamediv").append(textCollectionView.$el);
//
//});
