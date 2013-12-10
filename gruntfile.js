module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: "base" // Change this to your project
            }
        },

        //- Uglify concatenated and other JS files
        uglify: {
            main : {
                files: {
                    'assets/js/main.min.js': ['build/js/main.js']
                }
            }
        },

        //- Compile SASS
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

        // Minify CSS
        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'assets/css/',
                ext: '.min.css'
            },
        },

        //- Notify when task is complete
        notify: {
            app_change: {
                options: {
                    title: 'Javascript',  // optional
                    message: 'Concatenatated and minifed successfully', //required
                }
            },
            css_complete: {
                options: {
                    title: 'SASS -> CSS',  // optional
                    message: 'Compiled, prefixed, and moved successfully', //required
                }
            },
        },

        //- Watchers
        watch: {
            grunt: { 
                files: ['gruntfile.js'],
                tasks: ['default'], 
            },
            sass: {
                files: ['build/scss/**/*.scss'],
                tasks: ['sass_change']
            },
            css: {
                files: [/*'drupal/sites/all/themes/theme_name/css/*.css',*/ 'css/*.css'],
                tasks: ['notify:css_complete', 'css_prefixed', 'css_min']
            }/*,
            js: {
                files: ['<%= concat.app.src %>', 'js/main.js'],
                tasks: ['notify:app_change','app_change']                
            }*/
        }
    });
    //- REGISTER ALL OUR GRUNT TASKS
    grunt.task.run('notify_hooks');
    grunt.registerTask('default', ['cssmin','sass','uglify', 'watch']);
    grunt.registerTask('app_change', ['uglify:main']);
    grunt.registerTask('sass_change', ['sass']);
    grunt.registerTask('css_min', ['cssmin']);
    //grunt.registerTask('sync_files', ['sync']);
};
