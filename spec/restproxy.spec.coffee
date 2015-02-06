describe 'Service', ->

	beforeEach ->
		class MenuItemService extends Service

		@mService = new MenuItemService
		spyOn @mService, 'get'
		spyOn @mService, 'update'
		spyOn @mService, 'delete'
		spyOn @mService, 'create'



	it 'must call the create function ', ->
		@mService.run 'POST', 'url', {}
		expect(@mService.create).toHaveBeenCalled()

	it 'must call the get function ', ->
		@mService.run 'GET', 'url', {}
		expect(@mService.get).toHaveBeenCalled()

	it 'must call the update function ', ->
		@mService.run 'PUT', 'url', {}
		expect(@mService.update).toHaveBeenCalled()

	it 'must call the delete function ', ->
		@mService.run 'DELETE', 'url', {}
		expect(@mService.delete).toHaveBeenCalled()


	  
  
describe 'RestProxy', ->

	beforeEach ->
		@serviceDetector = jasmine.createSpyObj 'serviceDetector', ['getService']
		@restProxy = new RestProxy 
							serviceDetector : @serviceDetector

	describe 'constructor', ->

		it 'must have reference to notify reference', ->
			expect(@restProxy.notify).toEqual $.notify

		it 'must have reference to Offline reference', ->
			expect(@restProxy.offline).toEqual window.Offline
			
		it 'must have reference to serviceDetector reference', ->
			expect(@restProxy.serviceDetector).toEqual @serviceDetector


	describe '_verifyMethodName', ->

		it 'must return true', ->
			$.each ['post', "GET", "DELETE", 'put'], (index, method)=>	
				expect(@restProxy._verifyMethodName method).toBeTruthy()
	
		it 'must return false', ->
			$.each ['posts', "GEaT", "DELETEsss", ''], (index, method)=>	
				expect(@restProxy._verifyMethodName method).toBeFalsy()

	
	describe 'makeCall', ->

		describe 'valid call', ->

			beforeEach ->
				service = callMethod : -> return $.Deferred()

				class ServicesContainer
					getService : ->

				spyOn(ServiceDetector::, 'getService').and.callFake -> service

				@result = @restProxy.makeCall 'post', 'url', 'resource', {}
			  
			xit 'must return a deferred object', ->
				expect(@result.done).toEqual jasmine.any Function

			xit 'must call getService function of service detector', ->
				expect(@serviceDetector.getService).toHaveBeenCalledWith 'resource'	 