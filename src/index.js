var AlexaSkill = require('./AlexaSkill')
  , Markov	   = require('./markov')
  , sourceText = require('./sourceText.json')
  , APP_ID	   = process.env.APP_ID;

var handleMarkovRequest = function(intent, session, response) {
	var order = intent.slots.order.value;
	
	if (typeof order == 'undefined') {
		order = 7;
	} else {
	    order = parseInt(order);
	}

	Markov.setupMarkov(sourceText.rawText, order);
	var text = Markov.markovIt(sourceText.rawText, 140, order);
	var cardText = text;
	heading = "Markov says...";

	response.tellWithCard(text, heading, cardText);
};

var MarkovSkill = function() {
	AlexaSkill.call(this, APP_ID);
};

MarkovSkill.prototype = Object.create(AlexaSkill.prototype);
MarkovSkill.prototype.constructor = MarkovSkill;

MarkovSkill.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
	var output = "Welcome to Markov Bot! Ask for a sentence.";

	response.ask(output);
};

MarkovSkill.prototype.intentHandlers = {
	MarkovIntent: function(intent, session, response) {
		handleMarkovRequest(intent, session, response);
	},

	HelpIntent: function(intent, session, response) {
		var output = "Ask me for a sentence.";

		response.ask(output);
	}
};

exports.handler = function(event, context) {
	var skill = new MarkovSkill();
	skill.execute(event, context);
};
