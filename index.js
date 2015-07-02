var GroceryModel = Backbone.Model.extend({
    defaults : {"name":'', "price":'', "quant":''},
    initialize : function () {
        this.fetch();
    },    
    replace : function (str) {
        this.set("value", str);
        this.save();
    }
});

var idCount = 0;
var viewArr = [];    
var view;

var GroceryView = Backbone.View.extend({
    render: function () {      
        var valName = this.model.get("name");
        var valPrice = this.model.get("price");
        var valQuant = this.model.get("quant");
//        var btn2 = '<button id=clear>Clear line</button>';
        var btn = '<button id=delete>Remove</button>';
        var inputName = '<input type="text" class="inputName" value="' + valName + '" />';
        var inputPrice = '<input type="number" class="inputPrice" value="' + valPrice + '" />';
        var inputQuant = '<input type="number" class="inputQuant" value="' + valQuant + '" />';
        this.$el.html("<div>" + inputName + inputPrice + inputQuant + btn + "</div>");
    },
    
    initialize: function () {
        this.model.on("change", this.render, this);
    },
    
    events : {
        "keypress input" : "updateOnEnter",
        "click #delete" : "delete",
        "click #clear" : "clear"
    },

//    replace : function () {
//        var str = this.$el.find("input").val();
//        this.model.replace(str);
//    },

    delete : function () {
        console.log('Goner');
        viewArr.pop();
        this.model.destroy();
        this.remove();
        console.log(viewArr);
    },  
 
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
        console.log(viewArr);
        this.model.save();
    },

    clear: function () {
        this.model.replace("");
        this.model.save();
    },
//
//    delete : function () {
//    console.log('Goner');
//    var lastItem = viewArr.pop();
//    lastItem.model.destroy();
//    console.log(viewArr);
//    },  

    updateOnEnter: function (e){
        if(e.keyCode == 13) {
            this.nameReplace(this.$el.find(".inputName").val());
            this.priceReplace(this.$el.find(".inputPrice").val());
            this.quantReplace(this.$el.find(".inputQuant").val());
//            console.log(this.$el.find(".inputName").val());
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

var GroceryCollectionView = Backbone.View.extend({
    render : function () {
        var btn = '<button id="addbutton">Add New</button>';
        var div = '<div id="grocery-list"></div>';
        this.$el.html(div + btn);
        for(var i=0; i < viewArr.length; i++) {
            viewArr[i].render();
            this.$("#grocery-list").append(viewArr[i].$el);
        }
    },
            
    initialize : function () {
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'destroy', this.delete);
    },
    
    events : {
        "click #addbutton" : "addCollection"
    },
    
    addOne : function (model) {
        console.log('model added to collection');
//        model.set("value","Here's where you type something...");
        view = new GroceryView({model : model});
        viewArr.push(view);
        view.render();
        var models = this.collection.models ;
        for(var i=0; i < models.length; i++) {
            models[i].save();  
        }
        this.$("#grocery-list").append(view.$el);
        console.log(this.collection.models);
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