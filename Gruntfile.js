
module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                preserveComments: false,
                report: 'gzip',

                files: {
                    '_site/js/jquery.min.js': '_site/js/jquery.min.js',
                    '_site/js/main.js': '_site/js/main.js'
                }
            }
        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '_site/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '_site/'
                }]
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    collapseBooleanAttributes: true,
                    removeOptionalTags: true
                },
                files: {
                    '_site/es/home.html': '_site/es/home.html',
                    '_site/es/contact.html': '_site/es/contact.html',
                    '_site/es/projects.html': '_site/es/projects.html',

                    '_site/en/home.html': '_site/en/home.html',
                    '_site/en/contact.html': '_site/en/contact.html',
                    '_site/en/projects.html': '_site/en/projects.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', [
        'uglify',
        'imagemin',
        'htmlmin'
    ]);
};
