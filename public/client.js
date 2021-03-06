// client-side js
// run by the browser each time your view template is loaded
 document.addEventListener("DOM Loaded", function(){
    
  fetch('/search-track').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    
    //var trackName = $(
    //`<h3><a href="${data.external_urls.spotify}">${data.name}</a></h3>`
    //);  
    let h3 = document.createElement('h3');
    let link = document.createElement('a');
    link.innerText = data.name;
    link.setAttribute('href', data.external_urls.spotify);
    h3.append(link);
    //trackName.appendTo('#search-track-container');
    document.getElementById('search-track-container').append(h3);
    
    
    //Display the track artist
    
    var artists = '';
    data.artists.forEach(function(element){
      artists = artists + element.name + ' ';
    });
    
    //var artistName = $('<h3>' + artists + '</h3>');
    let h5 = document.createElement('h5');
    h5.innerText = artists;
    //artistName.appendTo('#search-track-container');
    document.getElementById('search-track-container').append(h5);
    
    
    // Display the album art
    
    //var img = $('<img/>');
    var img = document.createElement('img');
    //img.attr('src', data.album.images[0].url);
    img.setAttribute('src', data.album.images[0].url);
    //img.appendTo('#search-track-container');
    document.getElementById('search-track-container').append(img);
    
  });
  
  
  
  fetch('/category-playlists').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    //data.items.map(function(playlist, i) {
      //var img = $('<img class="cover-image"/>');
      //img.attr('src', playlist.images[0].url);
      //img.appendTo('#category-playlists-container');
    //});
    
     data
      .forEach((c) => {
      $('#category-playlists-container').append(`<br><h1>${c.name}</h1><br>`)
      c.data.playlists.items.map(function(playlist, i) {
      var img = $('<img class="cover-image"/>');
      img.attr('src', playlist.images[0].url);
      img.appendTo('#category-playlists-container');
    });
    })
    
    
  });
  
  
  
  fetch('/audio-features').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "tempo", "time_signature"] //added last 2 features
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
      }
    });
  });
  
  
  
  
  fetch('/artist').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
        
    // Display the artist's image
    //var img = $('<img class="circle-image" />');
    let img = document.createElement('img');
    //img.attr('src', data.images[0].url);
    img.setAttribute('src', data.images[0].url);
    //img.appendTo('#artist-container');
    document.getElementById('#artist-container').append(img);
    
    // Display the artist name
    var trackName = $('<h3>' + data.name + '</h3>');
    trackName.appendTo('#artist-container');
    
    // Display the artist's genres
    data.genres.map(function(genre, i) {
      var genreItem = $('<p>' + genre + '</p>');
      genreItem.appendTo('#artist-container');
    });
    
    //Display artist's popularity value
    var popularity = $('<br><p> Popularity Value: ' + data.popularity + '</p>');
    popularity.appendTo('#artist-container');
    
    //Display artist's popularity value
    var followers = $('<p> Followers: ' + data.followers.total + '</p>');
    followers.appendTo('#artist-container');
  });
  
  
  
  $.get('/artist-top-tracks', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the audio features
    data.map(function(track, i) {
      var trackName = $('<li>' + track.name + '</li>');
      trackName.appendTo('#top-tracks-container');
    });
  });

});
