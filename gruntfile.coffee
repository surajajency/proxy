module.exports = (grunt) ->

	require("load-grunt-tasks") grunt

	grunt.initConfig

		coffee :
			options :
				bare : true
			compile :
				files :
					"tmp/restproxy.js" : "src/restproxy.coffee"
					"tmp/restproxy.spec.js" : "spec/restproxy.spec.coffee"
			
		jasmine:
			test:
				options:
					specs: 'tmp/restproxy.spec.js'
				src: [
					'bower_components/jquery/dist/jquery.js'
					'bower_components/notifyjs/dist/notify.js'
					'bower_components/offline/offline.min.js'
					'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
					'bower_components/jasmine-ajax/lib/mock-ajax.js'
					'tmp/restproxy.js'
				]

		watch:
			options:
				spawn: false
				interrupt: true
			source:
				files: [
					"src/*.coffee"
					"spec/*.coffee"
				]
				tasks: ["coffee:compile", "jasmine:test"]


	grunt.registerTask "dev","Start development", [
		"coffee:compile"
		"jasmine:test"
		"watch"
	]

