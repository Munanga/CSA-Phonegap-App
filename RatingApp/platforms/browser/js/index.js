/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function click(id){
	console.log("Balls");
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBFx36R9V2DPfeaRtdXhZDI7gUAchSfVcw",
    authDomain: "macombfoodratings.firebaseapp.com",
    databaseURL: "https://macombfoodratings.firebaseio.com",
    projectId: "macombfoodratings",
    storageBucket: "macombfoodratings.appspot.com",
    messagingSenderId: "950556034085"
};
firebase.initializeApp(config);


firebase.database().ref('/tags/').once('value').then(function(snapshot) {
    snapshot.forEach(function(tagName){
		//Creates h4 tag for each tagName
        document.getElementById('tagList').appendChild(create("<h4>" + tagName.key + "</h4>"));
		//Creates a div tag with an id equal to the current tagName i.e. American
		//This is used for holding the restaurants associated with the tag
		document.getElementById('tagList').appendChild(create("<div id='"+ tagName.key + "'></div>"));
		
		firebase.database().ref('tags/' + tagName.key).once('value').then(function(snapshot){
			//Accesses the children of tagName
			snapshot.forEach(function(childSnapshot){
				//Gets access to the restautant info for the current child of tagName
				firebase.database().ref('restaurants/' + childSnapshot.val()).once('value').then(function(restSnapshot){
					//creates a button for each tag with an id equal to it's tag name i.e. chicksOnTheSquare.
					//This id will be used to refference which button was pressed so it's part in the database ('restaurants/buttonId').
					//From this we will get the data for rendering the specified restaurants page 
					document.getElementById(tagName.key).appendChild(create("<button type='button' class='button' id = \'"+ childSnapshot.val() +"\'>" 
					+ restSnapshot.child("name").val() + "</button>"));
				});
			});
		});
		
		
		
    });
	
	//Enable accordion
	$('#tagList').accordion({collapsible: true, active: false, heightStyle: "content"});

});

$(document).ready(function(){
	$('.button').click(function(){
		console.log($(this).attr('id'));
	});
	
});


function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}






	