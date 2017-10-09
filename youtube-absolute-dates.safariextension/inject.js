function showResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById('response').innerHTML += responseString;
}



function search() {
  console.log('searching...');
  var selectors = document.querySelectorAll('div[data-context-item-id]');
  var ids = [];
  
  for (var key in selectors) {
    var s = selectors[key];
  
    if (!s.attributes || !s.getAttribute('data-context-item-id')) {
      continue;
    }

    var id = s.getAttribute('data-context-item-id');
    safari.self.tab.dispatchMessage('searchByID', id);
    ids.push(id);
  }
}

function handleMessage(event) {
  console.log('received message');
  switch (event.name) {
    case 'clientLoaded':
      search();
      break;
    case 'videoDetails':
      console.log(event.message);
      break;
    default:
      break;
  }
}

safari.self.addEventListener('message', handleMessage, false);