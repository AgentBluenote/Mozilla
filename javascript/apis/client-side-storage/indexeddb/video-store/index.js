window.onload = function() {
  // Create constants
  const section = document.querySelector('section');
  const videos = [
    { 'name' : 'crystal' },
    { 'name' : 'elf' },
    { 'name' : 'frog' },
    { 'name' : 'monster' },
    { 'name' : 'pig' },
    { 'name' : 'rabbit' }
  ];
  // Create an instance of a db object for us to store our database in
  let db;

  function init() {
    // Loop through the video titles one by one
    for(let i = 0; i < videos.length; i++) {
      // Open transaction, get object store, and get() the video by name
      let objectStore = db.transaction('videos').objectStore('videos');
      let request = objectStore.get(videos[i].name);
      request.onsuccess = function() {
        // If the result exists/is not undefined
        if(request.result) {
          console.log('taking videos from IDB');
          displayVideo(request.result.mp4, request.result.webm, request.result.name);
        } else {
          fetchVideoFromNetwork(videos[i]);
        }
      };
    }
  }

  // Define the fetchVideoFromNetwork() function
  function fetchVideoFromNetwork(video) {
    console.log('fetching videos from network');
    // Fetch the MP4 and WebM version of the video using fetch() function
    let mp4Blob = fetch('videos/' + video.name + '.mp4').then(response =>
      response.blob()
    );
    let webmBlob = fetch('videos/' + video.name + '.webm').then(response =>
      response.blob()
    );;

    // Only run the next code when both promises have fulfilled
    Promise.all([mp4Blob, webmBlob]).then(function(values) {
      displayVideo(values[0], values[1], video.name);
      storeVideo(values[0], values[1], video.name);
    });
  }

  function storeVideo(mp4Blob, webmBlob, name) {
    let objectStore = db.transaction(['videos'], 'readwrite').objectStore('videos');
    let record = {
      mp4 : mp4Blob,
      webm : webmBlob,
      name : name
    }
    let request = objectStore.add(record);

    request.onsuccess = function() {
      console.log('Record addition attempt finished');
    }

    request.onerror = function() {
      console.log(request.error);
    }

  };

  // Define the displayVideo() function
  function displayVideo(mp4Blob, webmBlob, title) {
    // Create object URLs out of the blobs
    let mp4URL = URL.createObjectURL(mp4Blob);
    let webmURL = URL.createObjectURL(webmBlob);

    // Create DOM elements to embed video in the page
    let article = document.createElement('article');
    let h2 = document.createElement('h2');
    h2.textContent = title;
    let video = document.createElement('video');
    video.controls = true;
    let source1 = document.createElement('source');
    source1.src = mp4URL;
    source1.type = 'video/mp4';
    let source2 = document.createElement('source');
    source2.src = webmURL;
    source2.type = 'video/webm';

    // Embed DOM elements into page
    section.appendChild(article);
    article.appendChild(h2);
    article.appendChild(video);
    video.appendChild(source1);
    video.appendChild(source2);
  }

  // Open our database; it is created if it doesn't already exist
  // (see onupgradeneeded below)
  let request = window.indexedDB.open('videos', 1);

  // onerror handler signifies that the database didn't open successfully
  request.onerror = function() {
    console.log('Database failed to open');
  };

  // onsuccess handler signifies that the database opened successfully
  request.onsuccess = function() {
    console.log('Database opened succesfully');

    // Store the opened database object in the db variable. This is used a lot below
    db = request.result;
    init();
  };

  // Setup the database tables if this has not already been done
  request.onupgradeneeded = function(e) {

    // Grab a reference to the opened database
    let db = e.target.result;

    // Create an objectStore to store our notes in (basically like a single table)
    // including a auto-incrementing key
    let objectStore = db.createObjectStore('videos', { keyPath: 'name' });

    // Define what data items the objectStore will contain
    objectStore.createIndex('mp4', 'mp4', { unique: false });
    objectStore.createIndex('webm', 'webm', { unique: false });

    console.log('Database setup complete');
  };
};
