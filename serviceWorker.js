// version 0.0.1
console.log('we are the service worker');

try {
  importScripts('events.js');
} catch (e) {}


self.addEventListener('fetch' , event => {
  console.log(`fetch event fired ${event.request.url}`)
  const parsedUrl = new URL(event.request.url);
  console.log(event)
  console.log(parsedUrl)

  if (parsedUrl.pathname === "/") {
    return;
  }

  const body = `
  <!doctype html>
  <title>Service worker HTML generation</title>
  <h1>
  The URL is ${event.request.url}
  </h1>
  <ul>
    <li>Cache: ${event.request.cache}</li>
    <li>Credentials: ${event.request.credential}</li>
    <li>Destination: ${event.request.destination}</li>
    <li>Method: ${event.request.method}</li>
    <li>Referrer: ${event.request.referrer}</li>
  </ul>
  `

  // the response constructure takes a few parameters, the first one is body, second status, then status text, and then headers
  const response = new Response(body, {
    status: 200, 
    statusText:"Ok", 
    headers: {
      'Content-Type': 'text/html'
    }
  })

  event.respondWith(response)

  // event.respondWith(new Promise((resolve, reject)=>{
  //     fetch('/').then(response => {
  //       const clonedResponse = response.clone(); 
  //       resolve(response)
  //     })
  // }))
})