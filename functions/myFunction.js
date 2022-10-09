// function/myFunction.js

async function handleRequest(request) {
    return new Response("Hello Azion!")
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request))
})
