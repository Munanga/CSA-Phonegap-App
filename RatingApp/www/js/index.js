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

// Test firebase database access
//var database = firebase.database();

// Results of function call are not actionable unless you call ".then()"
// This is because these calls return Promises, which can only be acted on
// Inside of a .then(function(whatever){}); call, as calling return inside
// this only returns another promise.
/*
database.ref('/restaurants/').once('value').then(function(snapshot) {
    imgPath = snapshot.child('chicksOnTheSquare').child('menuURL').val();

    // Test firebase storage access
    var storage = firebase.storage();
    var storageRef = storage.ref(imgPath + 'square-menu-appetizers-2017.jpg');
    storageRef.getDownloadURL().then(function(url) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element:
        var img = document.getElementById('myimg');
        img.src = url;
    }).catch(function(error) {
        console.error("Failed to get image");
    });
});*/

firebase.database().ref('/tags/').once('value').then(function(snapshot) {
    updateTagList(snapshot.val());
});

//Creates tagList 
function updateTagList(snapshot) {
	
    for (var i in snapshot) {
        console.log(i);
        var tag = create("<h4>" + i + "</h4>");
        var tagList = document.getElementById('tagList').appendChild(tag);
		var div = "<div id='"+ i + "'></div>";
		document.getElementById('tagList').appendChild(create(div));
		
		firebase.database().ref('/tags/' + i).once('value').then(function(snapshot){
			//Accesses the children of i
			snapshot.forEach(function(childSnapshot){
				
				//Gets access to the restautant info for the current child of i  
				firebase.database().ref('restaurants/' + childSnapshot.val()).once('value').then(function(restSnapshot){
					console.log(i);
					document.getElementById(i).appendChild(create("<a>" + restSnapshot.child("name").val() + "</a>"));
				});
			});
		});
		

    }
	$('#tagList').accordion({collapsible: true, active: false, heightStyle: "content"});
	
}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}






	