/**
 * Created by jevazquez on 13/03/2015.
 */
module.exports = function(grunt) {

    /*Plugins*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');


    /*Tasks*/
    grunt.registerTask('release', ['clean', 'html2js', 'uglify', 'jshint', 'concat:index', 'cssmin:css', 'copy:assets']);


    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });


    grunt.initConfig({
        distdir: 'dist',

        pkg: grunt.file.readJSON('package.json'),

        banner:  '/** My Awesome Project\n' +
        ' * Created at <%= grunt.template.today("dd-mm-yyyy") %>\n' +
        ' */',

        src: {
            js: ['app/**/*.js'],
            jsTpl: ['<%= distdir %>/templates/**/*.js'],
            html: ['app/index.html'],
            tpl: {
                app: ['app/js/**/*.html']
            }
        },

        clean: ['<%= distdir %>/*'],

        copy: {
            assets: {
                files: [{
                    dest: '<%= distdir %>',
                    src : '**',
                    expand: true,
                    cwd: 'app/img/' }]
            }
        },

        html2js: {
            app: {
                options:{
                    base: 'app/js'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.js'
            }
        },

        concat:{
            dist:{
                options:{
                    banner: "<%= banner %>"
                },
                src:['<%= src.js %>', '<%= src.jsTpl %>'],
                dest: '<%= distdir %>/<%= pkg.name %>.js'
            },
            index: {
                src: ['app/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            },

            /*librerias*/
            jquery:{
                src:['bower_components/jquery/dist/jquery.min.js'],
                dest: '<%= distdir %>/lib/jquery.min.js'
            },
            angular:{
                src:['bower_components/angular/angular.js'],
                dest: '<%= distdir %>/lib/angular.js'
            },
            bootstrap:{
                src:['bower_components/bootstrap/dist/js/bootstrap.js'],
                dest: '<%= distdir %>/lib/bootstrap.js'
            },
            uiBootstrap:{
                src:['bower_components/angular-bootstrap/ui-bootstrap.js'],
                dest: '<%= distdir %>/lib/ui-bootstrap.js'
            },
            uiBootstrapTpls:{
                src:['bower_components/angular-bootstrap/ui-bootstrap-tpls.js'],
                dest: '<%= distdir %>/lib/ui-bootstrap-tpls.js'
            },
            angularSanitize:{
                src:['bower_components/angular-sanitize/angular-sanitize.js'],
                dest: '<%= distdir %>/lib/angular-sanitize.js'
            }/*,

            bootstrapCss:{
                src:['bower_components/bootstrap/dist/css/bootstrap.css'],
                dest: '<%= distdir %>/css/bootstrap.css'
            },
            bootstrapTheme:{
                src:['bower_components/bootstrap/dist/css/bootstrap-theme.css'],
                dest: '<%= distdir %>/css/bootstrap-theme.css'
            }*/

        },

        cssmin : {
            css:{
                src: [
                    'app/css/*'
                ],
                dest: '<%= distdir %>/css/combined.min.css'
            }
        },

        uglify: {
            dist:{
                options: {
                    banner: "<%= banner %>"
                },
                src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
                dest:'<%= distdir %>/<%= pkg.name %>.js'
            },

            /*librerias*/
            jquery:{
                src:['<%= concat.jquery.src %>'],
                dest: '<%= distdir %>/lib/jquery.min.js'
            },
            angular:{
                src:['<%= concat.angular.src %>'],
                dest: '<%= distdir %>/lib/angular.js'
            },
            bootstrap:{
                src:['<%= concat.bootstrap.src %>'],
                dest: '<%= distdir %>/lib/bootstrap.js'
            },
            uiBootstrap:{
                src:['<%= concat.uiBootstrap.src %>'],
                dest: '<%= distdir %>/lib/ui-bootstrap.js'
            },
            uiBootstrapTpls:{
                src:['<%= concat.uiBootstrapTpls.src %>'],
                dest: '<%= distdir %>/lib/ui-bootstrap-tpls.js'
            },
            angularSanitize:{
                src:['<%= concat.angularSanitize.src %>'],
                dest: '<%= distdir %>/lib/angular-sanitize.js'
            }/*,
            bootstrapCss:{
                src:['<%= concat.bootstrapCss.src %>'],
                dest: '<%= distdir %>/css/bootstrap.css'
            },
            bootstrapTheme:{
                src:['<%= concat.bootstrapTheme.src %>'],
                dest: '<%= distdir %>/css/bootstrap-theme.css'
            }*/
        },
        watch:{
            all:{
                files:['<%= src.js %>', '<%= src.tpl.app %>', '<%= src.html %>'],
                tasks:['default','timestamp']
            },
            build: {
                files:['<%= src.js %>', '<%= src.tpl.app %>', '<%= src.html %>'],
                tasks:['build','timestamp']
            }
        },
        jshint:{
            files:['GruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>']
        }
    });
};