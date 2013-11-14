module.exports = function(grunt){

  var fs = require('fs'),
    util = require('util'),
    version = grunt.option('version') || '0.0.1';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src:'src/',
      build:'build/',
      package:'build/'
    },
    watch: {
      coffee:{
        files: ['<%= dirs.src %>**/*.coffee', '<%= dirs.src %>**/*.less'],
        tasks:['coffee:package', 'yuidoc']
      }
    },
    coffee: {
      compile: {
        files:[{
          expand:true,
          flatten:true,
          cwd:'<%= dirs.src %>coffee',
          src:'**/*.coffee',
          dest:'<%= dirs.build %>js/',
          ext:'.js'
        }]
      },
      package:{
        options: {
          sourceMap: false
        },
        files:{
          '<%= dirs.build %>js/<%= pkg.name %>.js': ['<%= dirs.src %>coffee/**/*.coffee']
        }
      }
    },
    uglify: {
      my_target: {
        options: {
          banner: '/*! <%= pkg.author %> - <%= pkg.name %> (<%= pkg.version %>) <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          '<%= dirs.build %>js/<%= pkg.name %>.min.js': ['<%= dirs.build %>js/<%= pkg.name %>.js']
        }
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: '<%= dirs.build %>js/',
          themedir: '',
          outdir: '<%= dirs.build %>docs/'
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["less"]
        },
        files: {
          "<%= dirs.build %>css/<%= pkg.name %>.css": "<%= dirs.src %>less/application.less"
        }
      }
    },
    groundskeeper: {
      compile: {
        options: {
          console: false
        },
        files: {
          '<%= dirs.build %>js/<%= pkg.name %>.build.min.js': '<%= dirs.build %>js/<%= pkg.name %>.min.js'
        }
      },
      options: {
        console: false,
        debugger: false,
        pragmas: ['development', 'validation'],
        namespace: ['App.logger'],
        replace: '"0"'
      }
    },
    copy: {
      main: {
        files:[{
          expand: true,
          cwd:'<%= dirs.build %>',
          src: '**/*',
          dest: '<%= dirs.build %>'
        }]
      }
    },
    'http-server':{
      dev: {
        root: '<%= dirs.build %>',
        port: 1234,
        host: "127.0.0.1",
        cache: 0,
        showDir : true,
        autoIndex: true,
        defaultExt: "html",
        runInBAckground: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-groundskeeper');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-http-server');


  // Default task.
  grunt.registerTask('default', 'coffee');

  grunt.registerTask('package',
    'Packages the latest files to be used in production and builds the release',
    [
      'coffee:package',
      'uglify',
      'groundskeeper'
    ]);

}
