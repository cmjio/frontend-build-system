frontend-build-system
=====================

A base setup for my frontend projects. Coffeescript and LESS are used in this setup meaning no dependancy on Ruby. If you wisth to to use SASS or SCSS then make sure to swap out `grunt-contrib-less` for `grunt-contrib-sass` and change the configuration to suit.

    npm install

In one terminal tab or window run `grunt http-server:dev` then in in another one run `grunt watch`.  Add .coffee and .less files to the src directory and they will be compiled into the build directory on every save.  The http-server will serve files from inside the build directory along with the documentation directory.  Create your html in the build directory. If you create an `index.html` at the root of the build directory then you can visit it at `http://127.0.0.1:1234/`.

Documentation is built using yuidocs and can be found at `http://127.0.0.1:1234/docs`

