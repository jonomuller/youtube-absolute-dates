// function onClientLoad() {
//   console.log('onClientLoad');
//   gapi.client.load('youtube', 'v3', function() {
//     gapi.client.setApiKey(config.API_KEY);
//     safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('clientLoaded');
//   });
// }

function handleMessage(event) {
  console.log('received message');
  switch (event.name) {
    case 'searchByID':
      search(event);
      break;
    case 'formatDate':
      formatDate(event);
    default:
      break;
  }
}

function formatDate(event) {
  var dict = JSON.parse(event.message);
  dict.date = moment(dict.date).format('DD/MM/YY');
  event.target.page.dispatchMessage('dateFormatted', JSON.stringify(dict));
}

// function search(event) {
//   var element = JSON.parse(event.message);
//   var xmlHttp = new XMLHttpRequest();

//   xmlHttp.onreadystatechange = function() { 
//       if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//         var response = JSON.parse(xmlHttp.responseText);
//         console.log(response.items);
//         var date = response.items[0].snippet.publishedAt;
//         console.log(date);
//         var newElement = {
//           selector: element.selector,
//           date: date
//         }
//         event.target.page.dispatchMessage('videoDetails', JSON.stringify(newElement));
//       }
//   }

//   var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + element.id + '&key=' + config.API_KEY;
//   xmlHttp.open("GET", url, true); // true for asynchronous 
//   xmlHttp.send(null);
// }

safari.application.addEventListener('message', handleMessage, false);