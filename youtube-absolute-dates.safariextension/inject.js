var els = [];

function showResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById('response').innerHTML += responseString;
}

function replace() {
  console.log('searching...');
  var selectors = document.querySelectorAll('div[data-context-item-id]');
  
  for (var key in selectors) {
    var s = selectors[key];
  
    if (!s.attributes || !s.getAttribute('data-context-item-id')) {
      continue;
    }

    var el = s.querySelector('.yt-lockup-meta-info').getElementsByTagName('li')[1];
    els.push(el);

    search(s.getAttribute('data-context-item-id'), els.indexOf(el), formatDate);
  }
}

function search(id, el, callback) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var response = JSON.parse(xmlHttp.responseText);
        var date = response.items[0].snippet.publishedAt;
        callback(el, date);
      }
  }

  var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=AIzaSyDUWwvXRNPNsS4drumeJ3ewz_3dJLXCBSI';
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

function formatDate(selector, date) {
  var dict = {
    selector: selector,
    date: date
  }
  safari.self.tab.dispatchMessage('formatDate', JSON.stringify(dict));
}

function displayDate(selector, date) {
  console.log(selector);
  els[selector].innerHTML = date;
}

function handleMessage(event) {
  switch (event.name) {
    case 'videoDetails':
      var element = JSON.parse(event.message);
      var selector = element.selector;
      console.log(element.date);
      console.log(selector);
      selector.getElementsByClassName('yt-lockup-meta-info')[0].getElementsByTagName('li')[1].innerHTML = element.date;
      break;
    case 'dateFormatted':
      var dict = JSON.parse(event.message);
      displayDate(dict.selector, dict.date);
      break;
    default:
      break;
  }
}

safari.self.addEventListener('message', handleMessage, false);
replace();