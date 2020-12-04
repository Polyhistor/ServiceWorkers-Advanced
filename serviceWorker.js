// version 0.0.1
console.log('we are the service worker');

try {
  importScripts('events.js');
} catch (e) {}


self.addEventListener('fetch' , event => {
  console.log(`fetch event fired ${event.request.url}`)
  const body = `
  <!doctype html>
  <title>Service worker HTML generation</title>
  <h1>
  The URL is ${event.request.url}
  </h1>
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