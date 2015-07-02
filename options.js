var MyView = Backbone.View.extend({
    props: function() {
        return Object.keys(this).join(' ');
    }
});

// Subclasses (inherit props):
var MyView2 = MyView.extend({
    initialize: function(opts) {
        // grab particular options
        if (opts)
            this.special = opts.special;
            this.a = opts.a; //...
    }
});

var MyView3 = MyView.extend({
    initialize: function(opts) {
        // grab all options
        _.extend(this,opts); //means merge, not subclass
    }
});

var opts = {a:'a',b:'b',id:'id',model:'mod',special:'yay'};

var view0 = new MyView();
var view1 = new MyView(opts);
var view2 = new MyView2(opts);
var view3 = new MyView3(opts);

view0.props();
view1.props();
view2.props();
view3.props();