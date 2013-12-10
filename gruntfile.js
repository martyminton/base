module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: "base"
            }
        },

        uglify: {
            main : {
                files: {
                    'assets/js/min.js': 'build/js/main.js'
                }
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'assets/css/main.css': 'build/scss/main.scss',
                    'assets/css/ie.css': 'build/scss/ie.scss'
                }        
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'assets/css/',
                ext: '.min.css'
            },
        },

        notify: {
            js_change: {
                options: {
                    title: 'Javascript',  
                    message: 'Concatenatated and minifed successfully',
                }
            },
            css_complete: {
                options: {
                    title: 'SASS -> CSS',  
                    message: 'Compiled, prefixed, and moved successfully', 
                }
            },
        },

        watch: {
            grunt: { 
                files: ['gruntfile.js'],
                tasks: ['default']
            },
            sass: {
                files: ['build/scss/**/*.scss'],
                tasks: ['sass_change']
            },
            css: {
                files: ['css/*.css'],
                tasks: ['notify:css_complete', 'css_prefixed', 'css_min']
            },
            js: {
                files: ['build/js/main.js'],
                tasks: ['notify:js_change','js_change']                
            }
        }
    });

    grunt.task.run('notify_hooks');
    grunt.registerTask('default', ['cssmin','sass','uglify', 'watch']);
    grunt.registerTask('js_change', ['uglify:main']);
    grunt.registerTask('sass_change', ['sass']);
    grunt.registerTask('css_min', ['cssmin']);
};
