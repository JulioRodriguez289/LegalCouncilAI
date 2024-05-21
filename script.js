// global variables for map, 

let map; // holds a refrence to a google maps javascript api map object 

// holds a reference to a PlacesService object 
//The object is associated with the specified map (map in this case) and is used to send requests for place-related information.
//var service; 

 function initMap() 
{
    // Your map initialization code goes here
    console.log('Initializing map...');

    // Use the geolocation API to get the current position
    navigator.geolocation.getCurrentPosition(function (position) 
    {
        console.log('Geolocation successful:', position);
        // The callback function receives a 'position' object with latitude and longitude
        // Create a google.maps.LatLng object using the obtained coordinates
        let currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
        console.log(currentPosition);
        map = new google.maps.Map(document.getElementById('map'),
        {

            center: currentPosition,
            zoom: 15

        });
    
    

        // object , that stores key value pairs 
        var request = 
        {
            // defines the geographical location of where we want to perform out search using a google.maps.latLang object 
            // define latLang object/ call html5 geolocation method to get user lat and long without having to prompt 
            location: currentPosition,
            radius:'50000', // set to maximum allowed radius size, in meters 
            // array containing the specified type of the establishments that we want to search for 
            // restricts results to places matching the specified type
            type: ['lawyer']
        };


         // Create a PlacesService object associated with the map
        let service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request,callBack);

    });
} 


// place results returned in the form of an array of placeResult objects 
// iterate through array and print place results 



// method passed to the nearbySearch method handle to place results object array returned by the nearbySearch functioin 

function callBack(results, status){

// check if the api request was succesfully fulfilled by 

    if (status == google.maps.places.PlacesServiceStatus.OK)
    {
        // bugs: improper establishment types being returned
        // fix: going through results array and parsing out improper establishment types 


        // iterate through placeResult objects array 
        for (var i =0; i< results.length; i++)
        {

            console.log(results[i]);
             // for each place found, make a marker for it on the map
             createMarker(results[i]);
            // for purpose of debugging 
           


            // createInfoWindow(results[i]);

            // check if the establisment type is of the specified type
            // if it is not
                 
        }

    }
    else 
    { 
        // error message indicating that search returned np succesful results 
        // prob print this to screen instead of concole 
        console.log('Nearby search failed:', status);

    }

}

// fucntion that creates a marker on the map for each place returned from the nearbySearch function call
// passing a placeResults object to the function
function createMarker(place)
{


    // checking to see if 
    if (!place.geometry || !place.geometry.location) return;

    // Creating an instance of a google maps marker 
    const marker = new google.maps.Marker
    ({ 
        
        // specifies the map on which to place the marker on     
        map, 
        position : place.geometry.location,

    });

    // set the content of the window, defined as a string of text

    // name, rating , address , opening hours 


    const infoWindowContent =  place.name;

    

    console.log(infoWindowContent);


     // define the window to be opened whem the marker is clicked by user 
    // create an info window instance for each marker created 

    const infoWindow = new google.maps.InfoWindow ({ 


        // set the content 

        content: infoWindowContent,

        maxWidth: 800

    }); 


    // infoWindow is not automatcially opened after creation, add event listener to open window 


    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });



    // infoWindows reamin open after, event listener to 

    infoWindow.addListener( 'closeclick',  function(){

    infoWindow.close();


    });
}

