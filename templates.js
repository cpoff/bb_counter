useMustacheTemplates(); //causes templates to use  format

var data = {verb:'jump', subj:'life', adj:'short', obj:'chair'};

var ERBView = Backbone.View.extend({
    template: _.template('The <%=subj%> <%=verb%>s the <%=adj%> <%=obj%>'),
    render: function() {
        this.$el.html(this.template(data));
        $(document.body).append(this.$el);
    }
})


var MustacheView = Backbone.View.extend({
    template: _.template('The  s the  '),
    render: function() {
        this.$el.html(this.template(data));
        $(document.body).append(this.$el);
    }
})

var erbView, mustView;
$(function() {
    erbView = new ERBView();
    mustView = new MustacheView();
})

function useMustacheTemplates() {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };
}