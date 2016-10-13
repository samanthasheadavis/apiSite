var biscuitCity = {

    generateTemplate: function(pageTemplate) {
        var source = $(pageTemplate).html();
        var template = Handlebars.compile(source);
        var context = {
            //context here
        };
        var html = template(context);
        $('#templates-container').fadeOut('fast', function() {
             $('#container').html('').prepend(html).fadeIn();
        });
        //
        // $('#templates-container').fadeOut('fast', function() {
        //  });
    },

    triggerTemplate: function() {

        $('#container').on('click', '.home', function(event) {
            biscuitCity.generateTemplate('#home-template');
        });
        $('#container').on('click', '.social', function(event) {
            biscuitCity.generateTemplate('#social-template');
            console.log('social');
        });
        $('#container').on('click', '.maps', function(event) {
            biscuitCity.generateTemplate('#maps-template');
            console.log('maps');
        });
        $('#container').on('click', '.recipe', function(event) {
            biscuitCity.generateTemplate('#recipe-template');
            console.log('recipes');
        });
    },
};

biscuitCity.triggerTemplate();
biscuitCity.generateTemplate('#home-template');
