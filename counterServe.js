
$(document).ready( function () {

    var Counter = Backbone.Model.extend({
        defaults : {"value" : 0},
        urlRoot : "/counter"
    });
    
    var counterModel1 = new Counter({id : 1});
    var counterModel2 = new Counter({});

    Counter.prototype.inc = function () {
        var val = this.get("value");
        this.set("value", val+1);
        this.save();
    }      
    Counter.prototype.dec = function () {
        var val = this.get("value");
            if (val > 0) {
            this.set("value", val - 1);
        this.save();
            }  
    };

    counterModel1.fetch();

var CounterView = Backbone.View.extend({
        render: function () {
            var val = this.model.get("value");
            var btn1 = '<button id=inc>Plus</button>';
            var btn2 = '<button id=dec>Minus</button>';
            this.$el.html('<p> Hit me baby, '+val+' more times.</p>' + btn1 + btn2);
        },
        initialize: function () {
            this.model.on("change", this.render, this);
        },
        events : {
            "click #inc" : "increment",
            "click #dec" : "decrement"        
        },
        increment : function () {
            this.model.inc();
        },
        decrement : function () {
            this.model.dec();
        }
    });
    
    var counterView1 = new CounterView({model : counterModel1});
    
    counterView1.render();
    
    $("#counterdiv").append(counterView1.$el);
    
});
