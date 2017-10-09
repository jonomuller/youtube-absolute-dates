function onClientLoad() {
  console.log('onClientLoad');
  gapi.client.load('youtube', 'v3', function() {
    gapi.client.setApiKey(config.API_KEY);
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('clientLoaded');
  });
}

function handleMessage(event) {
  console.log('received message');
  switch (event.name) {
    case 'searchByID':
      search(event);
      break;
    default:
      break;
  }
}

function search(event) {
  console.log(gapi);
  console.log("test");

  var request = gapi.client.youtube.search.list({
    part: 'id'
  });

  request.execute(function(response) {
    var responseString = JSON.stringify(response, '', 2);
    console.log(responseString);
    event.target.page.dispatchMessage('videoDetails', 300);
  });
}

safari.application.addEventListener('message', handleMessage, false);