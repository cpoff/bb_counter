var Counter = Backbone.Model.extend({
    defaults: {
        "value": ''
    }
});

var CounterView = Backbone.View.extend({
    render: function () {
        var val = this.model.get("value");
        var btn1 = '<button id=plus>Concatenate</button>';
//        var btn2 = '<button id=minus>Minus</button>';
//        var btn3 = '<button id=clear>Clear</button>';
        this.$el.html('<p>' + val + '</p>' + btn1);
    }
});

var counterModel, counterView;
$(document).ready(function () {

    counterModel = new Counter();

    counterView = new CounterView({
        model: counterModel
    });
    counterView.render();

    counterModel.on("change", function () {
        counterView.render();
    });

    //    counterView.$el.on("click", "btn1", function () {
    //        var mod = counterView.model;
    //        var currVal = mod.get("value");
    //        mod.set("value", currVal + 1);
    //    });

    counterView.$el.on("click", "#plus", function () {
        var mod = counterView.model;
        var currVal = mod.get("value");
        mod.set("value", currVal + 1);
    });

    counterView.$el.on("click", "#minus", function () {
        var mod = counterView.model;
        var currVal = mod.get("value");
        if (currVal > 0) {
            mod.set("value", currVal - 1);
        }
    });

    counterView.$el.on("click", "#clear", function () {
        var mod = counterView.model;
        var currVal = mod.set("value");
        mod.set("value", 0);
    });

    $("#concatdiv").append(counterView.$el);

});