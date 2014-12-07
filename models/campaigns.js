var mongoose = require('mongoose');

var CampaignsSchema = mongoose.Schema({
	name: String
});

CampaignsSchema.methods.greet = function(){
	var greeting = this.name ? "I'm " + this.name : "unknown";
	console.log(greeting);
}
var Campaigns = mongoose.model('Campaign', CampaignsSchema);