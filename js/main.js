// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.

    

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.

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
    
    function searchImages(tags) {
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON( flickerAPI, {
            tags: tags,
            tagmode: "any",
            format: "json"
        })
        .done(function( data ) {
            $.each( data.items, function( i, item ) {
                $( "#loading").hide();
                var li = $("<li>").addClass("image-block");
                
                //$( "<img>" ).attr( "src", item.media.m ).appendTo( li );
                var dl = $( "<dl>");
                $("<dt>").html("Title").appendTo(dl);
                $("<dd>").html(item.title).appendTo(dl);
                $("<dt>").html("Date Taken").appendTo(dl);
                $("<dd>").html(item.date_taken).appendTo(dl);
                $("<dt>").html("Author").appendTo(dl);
                $("<dd>").html(item.author).appendTo(dl);
                
                /* I noticed when I added the description below, it adds the photo so I didn't need to add the image above myself */
                $("<dt>").html("Description").appendTo(dl);
                $("<dd>").html(item.description).appendTo(dl);
                $("<dt>").html("Link").appendTo(dl);
                $("<dd>").html( "<a href='" + item.link + "' >View on Flickr</a>").appendTo(dl);
                dl.appendTo(li);
                li.appendTo("#images");
            });
        });
    };
    
    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.
    
    $( "#search-form" ).on('submit', function( event ) {
        event.preventDefault();
        /* Here's my thought process to guide me:
        *  1. grab text in search bar
        *  2. make sure it's not empty
        *  3. if emtpy, display error message to user
        *  4. clear out any previous content
        *  5. show loading icon
        *  6. searchImages function
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
    });
    
    
});







