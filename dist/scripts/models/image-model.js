var Picture = Backbone.Model.extend({
	defaults:{
		url: null,
		caption: null,
		comments:null
	},
	validate: function(attr, options) {
		if(attr.url.length === 0) {
			return 'You must enter a valid url';
		}
		if(attr.url.substring(0,7)!=='http://') {
			return 'You must enter a valid url';
		}
		if(attr.url.substring(0,8)!=='https://') {
			return 'You must enter a valid url';
		}

		if(attr.caption.length ===0) {
			return 'You must add a caption to the photo';
		}
		return false;
	},
	urlRoot: 'http://tiy-fee-rest.herokuapp.com/collections/here-you-go-logan',
	idAttribute: '_id'

});
