/**
 * Simple Ajax Validation
 *
 * Copyright (c) 2011 
 * @author undsoft - http://blog.undsoft.com/
 * 
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 */

(function($) {

	var methods = {
		/**
		 * Initializes everything
		 */
		init : function(options) {
	
			var settings = {
				validationUrl: null, // If null - the url will taken from the form element.
				method: null, // If null - determined from form element or GET 
				mode: 'change', // {'change'|'submit'}
				
				waitForValidation: false, // Usefull for mode = change. Forbids form submission until validation response is received. Consider this auto on for mode=submit
				
				filter: ':input', // Selector for elements to be validated.
				sendAttr: 'class', // Attribute to be passed in a query with form element value.
					
				badClass: 'bad', // Keep in mind that those classes will be applied to containers of the validated elements
				goodClass: 'good',
				waiterClass: 'waiter',
				
				resultSelector: '.validationSummary', // The summary selector used to show validation errors and other messages.
					
				/* Callbacks */
				beforeValidate: function(query, form){}, // You may use this callback to overwrite query that is send to server
				afterValidate: function(hasError, message){}, // Return false to prevent default behaviour or string to be placed instead of message
				onError: function(message){}
			};
			
			return this.each(function(){
				var $this = $(this);
				var data, scope;
					
				if(options){
					$.extend(settings, options);
				}
				
				if(!settings.validationUrl){ // Get validation URL from form
					settings.validationUrl = $this.attr('action');
				}
				
				if(!settings.method){ // Get method from form
					settings.method = $this.attr('method');
				}
				
				if(settings.mode == 'change'){
					scope = $this.find(settings.filter);
				}
				else if(settings.mode == 'submit'){
					scope = $this;
				}
			
				data = scope.data('ajaxValidation');
				
				// I've been here, I've seen this before
				if(!data){
					scope.bind(settings.mode, methods.makeQuery);
					
					$this.data('ajaxValidation', settings);
				}
			});
		},
		
		/**
		 *	Validates specific elements
		*/
		validate : function(filter){
			form = $(this);
			if(filter){
				el = $(filter, form);
			
				methods.makeQuery.call(el);
			}
			else{
				methods.makeQuery.call(this);
			}
		},
		
		/**
		 *	Unties plugin from element
		*/
		destroy: function(){
			var data = $(this).data('ajaxValidation');
			
			if(data.mode == 'submit'){
				$(this).unbind('submit', methods.makeQuery);
			}
			else{
				$(this).find(data.filter).unbind('change', methods.makeQuery);
			}
						
			if(data.waitForValidation){
				$(this).unbind('submit', false);
			}
			
			$(this).removeData('ajaxValidation');
		},
		
		
		/**
		 *	Sending query to a server. Usually you don't need to invoke this
		 */
		makeQuery : function(e, skipValidation){
			if(skipValidation)
				return;
			
			var form = $(this);
			var scope = $(this);
			
			if(!$(this).is('form')){ // For mode = change
				form = $(this).parents('form');

				scope = $(this).parent();
			}
					
			var settings = form.data('ajaxValidation');
			
			var query = methods.prepareQuery(settings.filter, scope, settings.sendAttr);
			
			var new_query = settings.beforeValidate.call(this, query, form);
			
			if(new_query)
				query = new_query;
			else if(new_query === false)
				return false;
			
			var t = query;
			query = {};
			query[form.attr('name')] = t;
			
			scope.removeClass(settings.badClass).removeClass(settings.goodClass);
			scope.find(settings.resultSelector).html("");
			
			$.ajax({
				  url: settings.validationUrl,
				  data: query,
				  type: settings.method,
				  context: $(this),
				  success: methods.handleResponse,
				  dataType: 'json'
			});
			
			scope.addClass(settings.waiterClass);
			
			if(settings.waitForValidation || settings.mode == 'submit'){
				form.bind('submit', false);
				form.find(':submit').attr('disabled', 'disabled');
			}
			
			if(settings.mode == 'submit')
				return false;
		},
		
		/**
		 * Prepares string for a query
		 */
		prepareQuery: function(filter, scope, sendAttr){
			if(!scope)
				scope = $(this);
			
			if(!sendAttr){
				sendAttr = $(filter, scope).parents('form').data('ajaxValidation').sendAttr;
			}
			
			// Some freakin' array magic
			// Basically it creates object of objects (object composed of name, value, attr)
			// Then it is wrapped into another object.
			// Don't use array for that as jQuery won't serialize it properly
			var t = {};
			$(filter, scope).map(function(){
				return{
					name: $(this).attr('name'),
					value: $(this).attr('value'),
					attr: $(this).attr(sendAttr)
				};
			}).each(function(i){
				t[this.name] = this;		
			});
			
			return t;
		},
		
		/**
		 * Handles the response
		 */
		handleResponse: function(data, textStatus){
			var form = $(this);
			var scope = $(this);
			
			if(!$(this).is('form')){
				form = $(this).parents('form');
				scope = $(this).parent();
			}
					
			var settings = form.data('ajaxValidation');
			
			var r = settings.afterValidate.call(this, data.hasError, data.message);
			
			scope.removeClass(settings.goodClass).removeClass(settings.waiterClass).removeClass(settings.badClass);
			
			if(r !== false){
				if(typeof r == 'string'){
					// Change the message
					data.message = r;
				}

				if(data.hasError){ // Has Error
					r = null;
					r = settings.onError.call(this, data.message);
					
					if(r !== false){
						if(typeof r == 'string'){
							// Change the message
							data.message = r;
						}
						
						scope.addClass(settings.badClass);
						scope.find(settings.resultSelector).html(data.message);
					}
				}
				else{ // Error free
					scope.addClass(settings.goodClass);
					
					if(data.message)
						scope.find(settings.resultSelector).html(data.message);
					else
						scope.find(settings.resultSelector).html("");
					
					if(settings.waitForValidation || settings.mode == 'submit'){
						// See if anyone has pending queries
						if($('.' + settings.waiterClass, form).length == 0 && $('.' + settings.badClass, form).length == 0){
							form.unbind('submit', false);
							form.find(':submit').removeAttr('disabled');
						}
					}
					
					if(settings.mode == 'submit'){
						// Just do it
						form.trigger('submit',[true]);
					}
				}
			
			}			
			
			if(settings.mode == 'submit'){
				form.unbind('submit', false);
				form.find(':submit').removeAttr('disabled');
			}
		}
	};

	$.fn.ajaxValidation = function(method) {
    
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}else{
			$.error('Oh no! ' +  method + ' does not exist on jQuery.ajaxValidation');
	    }
	};
	
})(jQuery);