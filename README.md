frontend-build-system
=====================

A base setup for my frontend projects. Coffeescript and LESS are used in this setup meaning no dependancy on Ruby.

    npm install

In one terminal tab or window run `grunt http-server:dev` then in in another one run `grunt watch`.  Add .coffee and .less files to the src directory and they will be compiled into the build directory.  The http-server will serve files from inside the build directory along with the documentation directory.

Documentation is built using yuidocs.

