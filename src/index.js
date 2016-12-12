'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var speechResponse = "";
var cardResponse = "";
var repromptResponse = "...If you want, you can try another request now...";

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "Welcome to built in book.  This is a skill for Alexa developers to test how the built-in intents for the Book object behave.  What would you like to try?", "You can search for a book, get specific details about a book, add and remove books on your reading list, and even give commands for audio books like play, resume, and stop.");
    },
    'AMAZON.SearchAction<object@Book>': function () {
        var slotArray = ["object.name", "object.sort", "object.type", "object.author.name", "sourceCollection.owner.name", "object.owner.name", "object.genre", "object.readBy.name", "object.contentSource"];
        console.log("ADDING RESPONSES FOR AMAZON.SearchAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Search Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.SearchAction<object@Book>", cardResponse);
    },
    'AMAZON.AddAction<object@Book,targetCollection@ReadingList>': function () {
        var slotArray = ["object.name", "object.sort", "targetCollection.audience.name", "object.type", "object.author.name", "targetCollection.owner.name", "object.genre", "targetCollection.name", "object.audience.name", "object.partOfSeries.name", "object.inLanguage.type", "targetCollection.type"];
        console.log("ADDING RESPONSES FOR AMAZON.AddAction<object@Book,targetCollection@ReadingList>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Add Action", ", with a target collection of reading list");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.AddAction<object@Book,targetCollection@ReadingList>", cardResponse);
    },
    'AMAZON.ChooseAction<object@Book,sourceCollection@ReadingList>': function () {
        var slotArray = ["object.select", "object.type", "sourceCollection.type"];
        console.log("ADDING RESPONSES FOR AMAZON.ChooseAction<object@Book,sourceCollection@ReadingList>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Choose Action", ", with a source collection of reading list");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.ChooseAction<object@Book,sourceCollection@ReadingList>", cardResponse);
    },
    'AMAZON.ChooseAction<object@Book>': function () {
        var slotArray = ["object.name", "object.select", "object.type", "object.author.name"];
        console.log("ADDING RESPONSES FOR AMAZON.ChooseAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Choose Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.ChooseAction<object@Book>", cardResponse);
    },
    'AMAZON.DeleteAction<object@Book,sourceCollection@ReadingList>': function () {
        var slotArray = ["object.sort", "object.type", "sourceCollection.type", "object.author.name", "object.owner.name", "object.genre", "sourceCollection.name", "object.version.type", "object.name", "object.select", "sourceCollection.owner.name", "object.translator.name", "object.inLanguage.type"];
        console.log("ADDING RESPONSES FOR AMAZON.DeleteAction<object@Book,sourceCollection@ReadingList>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Delete Action", ", with a source collection of reading list");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.DeleteAction<object@Book,sourceCollection@ReadingList>", cardResponse);
    },
    'AMAZON.PlaybackAction<object@Book>': function () {
        var slotArray = ["object.name", "object.partOfBookSeries.name", "object.sort", "object.select", "object.type", "object.brand.type", "object.author.name", "object.owner.name", "object.contentSource", "object.partOfSeries.name", "object.bookNumber"];
        console.log("ADDING RESPONSES FOR AMAZON.PlaybackAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Playback Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.PlaybackAction<object@Book>", cardResponse);
    },
    'AMAZON.RateAction<object@Book>': function () {
        var slotArray = ["object.name", "object.select", "object.partOfSeries.type", "object.type", "rating.ratingValueUnit", "rating.ratingValue", "object.partOfSeries.name", "rating.bestRating"];
        console.log("ADDING RESPONSES FOR AMAZON.RateAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Rate Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.RateAction<object@Book>", cardResponse);
    },
    'AMAZON.RestartAction<object@Book>': function () {
        var slotArray = ["object.name", "object.select", "object.type", "object.author.name", "object.owner.name"];
        console.log("ADDING RESPONSES FOR AMAZON.RestartAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Restart Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.RestartAction<object@Book>", cardResponse);
    },
    'AMAZON.ResumeAction<object@Book>': function () {
        var slotArray = ["object.name", "object.type", "object.contentSource.owner.name", "object.brand.type", "object.owner.name", "object.contentSource", "object.bookNumber"];
        console.log("ADDING RESPONSES FOR AMAZON.ResumeAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Resume Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.ResumeAction<object@Book>", cardResponse);
    },
    'AMAZON.SearchAction<object@Book[datePublished]>': function () {
        var slotArray = ["object.type", "object.datePublished.type"];
        console.log("ADDING RESPONSES FOR AMAZON.SearchAction<object@Book[datePublished]>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Search Action", ", with a parameter for date published");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.SearchAction<object@Book[datePublished]>", cardResponse);
    },
    'AMAZON.SearchAction<object@Book[numberOfSections]>': function () {
        var slotArray = ["object.numberOfSections.type", "object.numberOfSections", "object.type", "object.hasPart.type"];
        console.log("ADDING RESPONSES FOR AMAZON.SearchAction<object@Book[numberOfSections]>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Search Action", ", with a parameter for number of sections");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.SearchAction<object@Book[numberOfSections]>", cardResponse);
    },
    'AMAZON.SearchAction<object@Book[position]>': function () {
        var slotArray = ["object.type"];
        console.log("ADDING RESPONSES FOR AMAZON.SearchAction<object@Book[position]>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Search Action", ", with a parameter for position");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.SearchAction<object@Book[position]>", cardResponse);
    },
    'AMAZON.StopAction<object@Book>': function () {
        var slotArray = ["object.name", "object.type", "object.owner.name"];
        console.log("ADDING RESPONSES FOR AMAZON.StopAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Stop Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.StopAction<object@Book>", cardResponse);
    },
    'AMAZON.SuspendAction<object@Book>': function () {
        var slotArray = ["object.type", "object.owner.name", "duration.name"];
        console.log("ADDING RESPONSES FOR AMAZON.SuspendAction<object@Book>");
        addResponses(slotArray, this);
        if (speechResponse !== "") addResponseWrapper("Amazon dot Suspend Action", "");
        this.emit(':askWithCard', speechResponse, repromptResponse, "AMAZON.SuspendAction<object@Book>", cardResponse);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'MuCustomIntent': function (){
        this.emit(':tell', "baby, don't hurt me");
    },
    'AMAZON.NoIntent': function () {
        this.emit(':tell', "OK, goodbye!");
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "OK, goodbye!");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "OK, goodbye!");
    },
    'Unhandled': function () {
        this.emit(':tell', "I had an unhandled request!");
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function addResponses(slotArray, data)
{
    speechResponse = "";
    cardResponse = "";
    
    for (var i = 0;i<slotArray.length;i++)
    {
        console.log("CHECKING VALUE FOR " + slotArray[i]);
        if (data.event.request.intent.slots[slotArray[i]].value !== undefined)
        {
            speechResponse = speechResponse + slotArray[i] + " was " + data.event.request.intent.slots[slotArray[i]].value + "...";
            cardResponse = cardResponse + "this.event.request.intent.slots[\"" + slotArray[i] + "\"].value = \"" + data.event.request.intent.slots[slotArray[i]].value + "\";\n";
            console.log("FOUND VALUE FOR " + slotArray[i] + " = " + data.event.request.intent.slots[slotArray[i]].value);
        }
    }
}

function addResponseWrapper(speech, collection)
{
    speechResponse = "I received an " + speech + " request for a Book object" + collection + ".  Here are the slot values I received: " + speechResponse + "...I wrote your results to a card in the Alexa app" + repromptResponse;
    cardResponse = "Here are the slot values I received:\n" + cardResponse + "\n";
}
