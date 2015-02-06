class Service

	get : (url, options = {})-> 
		defaults = 
			dataType : 'json'	
			url : url
			type : 'GET'

		$.extend options, defaults

		$.ajax options

	create : (url, options)-> 
		defaults = 
			dataType : 'json'	
			url : url
			type : 'POST'

		$.extend options, defaults

		$.ajax options

	update : (url, options)-> 

	delete : (url, options)-> 

	run : (methodName, url, options)->
		methodName = methodName.toUpperCase()
		
		if methodName is 'POST'
			xhr = @create url, options
	
		if methodName is 'GET'
			xhr = @get url, options

		if methodName is 'PUT'
			xhr = @update url, options

		if methodName is 'DELETE'
			xhr = @delete url, options

		xhr


class ServicesContainer

	services : {}

	getService : (name)->
		console.log name
		serviceName = @_getServiceName name
		if not @services[serviceName]
			return false

		return @services[serviceName]

	_getServiceName : (name)->
		name.toLowerCase() + 'service'


	addService : (name, service)->
		if (service instanceof Service) isnt true
			throw new Error 'Invalid service instance'

		@services[name] = service


class RestProxy

	baseUrl : ''

	setBaseUrl : (url)->
		@baseUrl = url

	constructor : (options = {})->
		{@servicesContainer} = options
		@notify = $.notify
		@offline = window.Offline

	_verifyMethodName : (methodName)->
		methodNames = ['POST', 'PUT', 'GET', 'DELETE']
		methodName = methodName.toUpperCase()
		methodNames.indexOf(methodName) isnt -1

	_generateUrl : (url)->
		"#{@baseUrl}/#{url}"

	makeCall : (methodName, url, resource, options)->
		
		if @_verifyMethodName(methodName) is false
			throw new Error 'Invalid request method name'

		service = @servicesContainer.getService resource

		if service is false
			throw new Exception 'Service not defined'

		url = @_generateUrl url

		serviceDeferred = service.run methodName, url, options

		deferred = new $.Deferred()

		serviceDeferred

			.done (response, xhr, textStatus)=>
				args = @beforeResolvePromise response, xhr, textStatus
				deferred.resolve response, xhr

			.fail ( jqXHR, textStatus )=>
				args = @beforeRejectPromise jqXHR, textStatus
				deferred.reject jqXHR, textStatus

		deferred.promise()

	beforeResolvePromise : (response, textStatus ,xhr)=>
		if xhr.status is 200
			@notify 'Something created', 'success'



	beforeRejectPromise : (xhr, textStatus)=>
		if xhr.status is 404
			@notify 'Requested entity was not found', 'error'
		else
			@notify xhr.responseText, 'error'




