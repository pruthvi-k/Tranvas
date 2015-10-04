var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix.sass('app.scss');

    mix.scripts(['app.js']);

    mix.copy('resources/assets/js/user/templates', 'public/ng_templates/users');
    mix.copy('resources/assets/js/utils/templates', 'public/ng_templates/utils');

    mix.scripts(['utils/modalModule.js'], 'public/js/utils.js');

    mix.scripts([
        'user/userApp.js',
        'user/userFact.js',
        'user/userManagerController.js'
    ], 'public/js/userModule.js');

    mix.version(['js/all.js', 'js/userModule.js', 'js/utils.js']);
});
