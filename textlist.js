

var TextModel = Backbone.Model.extend({
    defaults : {"value" : ""},
    replace : function (str) {
      this.set("value", str);
    }
});

var ERBView = Backbone.View.extend({
    render: function () {
        var textVal = this.model.get("value");
        var btn = '<button id=clear>Clear</button>';
        var btn2 = '<button id=delbutton>Remove last</button>';
        var input = '<input type="text" value="' + textVal + '" />';
        template: _.template('The <%=subj%> <%=verb%>s the <%=adj%> <%=obj%>'),
        render: function() {
            this.$el.html(this.template(data));
            $(document.body).append(this.$el);
    }
        this.$el.html(textVal+"<br><div>" + input + btn + btn2 + "</div>");
    },
    initialize: function () {
        this.model.on("change", this.render, this);
        // last argument 'this' ensures that render's
        // 'this' means the view, not the model
    },
    events : {
        "click #clear" : "clear",
        "delete button" : "delete",
        "keypress input" : "updateOnEnter"
    },
    replace : function () {
        var str = this.$el.find("input").val();
        this.model.replace(str);
    },
    clear: function () {
        this.model.replace("");
    },

    updateOnEnter: function (e){
        if(e.keyCode == 13) {
            this.replace();
        }
    }
});

var TextCollection = Backbone.Collection.extend({
    model : TextModel
});

var newArr = [];    
var TextCollectionView = Backbone.View.extend({
    render : function () {
        var btn = '<button id="addbutton">Add Text</button>';
        var div = '<div id="text-list"></div>';
        this.$el.html(div + btn);
        for(var i=0; i < newArr.length; i++) {
            newArr[i].render();
            this.$("#text-list").append(newArr[i].$el);
        }
    },
    initialize : function () {
        this.listenTo(this.collection, 'add', this.addView);
        this.listenTo(this.collection, 'remove', this.delView);
    },
    events : {
        "click #addbutton" : "addModel",
        "click #delbutton" : "delete"
    },
    addModel : function () {
        this.collection.add({});
        // collection adds a model, fires add event, then listener calls this.addView(model)
    },
    
    addView : function (newModel) {
        newModel.set("value","Talk");
        var view = new TextView({model : newModel});
        console.log(newArr);
        newArr.push(view);
        this.render();
    },
    
    delete : function () {
        console.log('Gone');
        var lastItem = newArr.pop();
        lastItem.remove();
    },
//    NEW REMOVE (MODEL ONLY)
    remove: function () {
        this.remove();
    },   
});

$(document).ready( function () {

var textCollection = new TextCollection();

var textCollectionView = new TextCollectionView({ collection : textCollection});

textCollectionView.render();

$("#listdiv").append(textCollectionView.$el);

});
