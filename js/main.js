// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
   

    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.
        
        
$(document).on('ready', function() {
    // Create a function called `searchImages()` that accepts a string value called `tags` as an argument:
    function searchImages(tags) {
        // define location of the Flickr API:
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        // construct `$.getJSON()` call where you send a request object
        // including the tags the user submitted
        $.getJSON( flickerAPI, {
            tags: tags,
            tagmode: "any",
            format: "json"
        })
        
        // construct a `done()` handler that displays images and accompanying info
        .done(function( data ) {
            $.each( data.items, function( i, item ) {
                $( "#loading").hide();
                var li = $("<li>").addClass("image-block"); //add new li for each new photo
                
                /* $( "<img>" ).attr( "src", item.media.m ).appendTo( li ); */
                var dl = $( "<dl>"); // create definition list to display data to accompany each photo
                // Add 'Title' and the photo's title
                $("<dt>").html("Title").appendTo(dl);
                $("<dd>").html(item.title).appendTo(dl);
                // Add 'Date Taken' and the photo's date taken
                $("<dt>").html("Date Taken").appendTo(dl);
                $("<dd>").html(item.date_taken).appendTo(dl);
                // Add 'Author' and the photo's author
                $("<dt>").html("Author").appendTo(dl);
                $("<dd>").html(item.author).appendTo(dl);
                
                // I noticed when I added the description below, it adds the photo (photo is part of the description information) 
                // so I didn't need to add the image above myself 
                $("<dt>").html("Description").appendTo(dl);
                $("<dd>").html(item.description).appendTo(dl);
                // Add 'Link' and a link to take user to the Flickr page of photo
                $("<dt>").html("Link").appendTo(dl);
                $("<dd>").html( "<a href='" + item.link + "' >View on Flickr</a>").appendTo(dl);
                dl.appendTo(li);
                li.appendTo("#images");
            });  // end .each function
        });  // end .done function
    }; // end searchImages function
    
    
        // TODO: When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.
    
     // Attach an event to the search button (`button.search`) to execute the
    // search when clicked:
    $( "#search-form" ).on('submit', function( event ) {
        event.preventDefault();
        /* Here's my thought process to guide me in creating the steps below:
        *  1. grab text in search bar
        *  2. make sure it's not empty
        *  3. if emtpy, display error message to user
        *  4. clear out any previous content
        *  5. show loading icon
        *  6. run searchImages function
        *  7. clear out search bar
        */
        var tags = $( "#search-input");
        var images = $( "#images" );
        images.html("");
        if (tags.val() === "") {
            $("<li>").html("Please type word into search bar").addClass("error").appendTo(images);
            return;
        }
        $( "#loading").show();
        searchImages(tags.val());
        tags.val("");
    });  //end .on submit function
    
    
}); //end .on ready function







