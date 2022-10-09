# 🐺 Edge Functions

Write, Test and Deploy your Edge Functions with `Azion Funks`

![](/assets/mascote.png)

---

## How to install

```
npm i -g azion-funks
```

```
yarn add -g azion-funks
```

## How to works - 4 Steps


**1. Create project**

```
azion new <PROJECT_NAME>
```

Then edge-azion will automatically create a project with the following:

```
functions/
    helloworld.js

azion.config
```

**3. Write your Function**

```javascript
// functions/myFunction.js

async function handleRequest(request) {
    return new Response("Hello, Azion!");
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request))
})
```

**3. Setup your Edge Applications**

```yaml
# ./azion.config
azion:
  user: "user@domain.com"
  password: "password"

  domain:
    name: "My domain"

  application:
    name: "My Application"

  function:
    name: "My Function"
    file: "myFunction.js"
```

**[see complete config documentation](https://github.com/olivmath/edge-azion/docs/config.yaml)**

**4. Deploy it**

```
azion deploy
```
