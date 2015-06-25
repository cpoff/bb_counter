   
var GroceryModel = Backbone.Model.extend({
    defaults : {"name" : "item", "price" : "price", "quant":"quant"},
    initialize : function () {
        this.fetch();
    },    
    replace : function (str) {
        this.set("value", str);
        this.save();
    }
});

var GroceryView = Backbone.View.extend({
    render: function () {      
        var valName = this.model.get("name");
        var valPrice = this.model.get("price");
        var valQuant = this.model.get("quant");
        var btn2 = '<button id=clear>Clear line</button>';
        var btn = '<button id=delete>Remove last</button>';
        var inputName = '<input type="text" class="inputName" value="' + valName + '" />';
        var inputPrice = '<input type="number" value="' + valPrice + '" />';
        var inputQuant = '<input type="number" value="' + valQuant + '" />';
        this.$el.html("<div>" + inputName + inputPrice + inputQuant + btn2 + btn + "</div>");
    },
    
    initialize: function () {
        this.model.on("change", this.render, this);
    },
    
    events : {
        "click #delete" : "delete",
        "keypress input" : "updateOnEnter",
        "click #clear" : "clear"
    },

//    replace : function () {
//        var str = this.$el.find("input").val();
//        this.model.replace(str);
//    },

    nameReplace : function (str) {
        this.model.set('name', str);
        this.model.save();
    },

    priceReplace : function (str) {
        this.model.set('price', str);
        this.model.save();
    },

    quantReplace : function (str) {
        this.model.set('quant', str);
        this.model.save();
    },

    clear: function () {
        this.model.replace("");
        this.model.save();
    },

    delete : function () {
    console.log('Goner');
    var lastItem = newArr.pop();
    lastItem.remove();
    console.log(newArr);
    },  
    
    updateOnEnter: function (e){
        if(e.keyCode == 13) {
            this.nameReplace(this.$el.find(".inputName").val());
        }
    }
});

var GroceryCollection = Backbone.Collection.extend({
    model : GroceryModel,
    url : "/groceries",
    initialize: function () {
        this.fetch();
    }
});

var idCount = 0;
var newArr = [];    

var GroceryCollectionView = Backbone.View.extend({
    render : function () {
        var btn = '<button id="addbutton">Add New</button>';
        var div = '<div id="grocery-list"></div>';
        this.$el.html(div + btn);
        for(var i=0; i < newArr.length; i++) {
            newArr[i].render();
            this.$("#grocery-list").append(newArr[i].$el);
        }
    },
            
    initialize : function () {
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'remove', this.delete);
    },
    events : {
        "click #addbutton" : "addCollection",
        "click #delete" : "delete"
    },
    addOne : function (model) {
        console.log('Added');
//        model.set("value","Talk");
        var view = new GroceryView({model : model});
        newArr.push(view);
        view.render();
        this.$("#grocery-list").append(view.$el);
    },
    addCollection : function () {
        this.collection.create({id : idCount});
        idCount = idCount+1;
    },

});
    
var groceryCollection, groceryCollectionView;
$(document).ready( function () {
 
groceryCollection = new GroceryCollection();
groceryCollectionView = new GroceryCollectionView({ collection : groceryCollection});

groceryCollectionView.render();

$("#grocerydiv").append(groceryCollectionView.$el);

});
