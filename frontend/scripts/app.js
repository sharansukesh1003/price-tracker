async function sendRequest() {
  let url = document.getElementById("urlField").value
  let userAgent = document.getElementById("userAgentField").value
  const data = { url, userAgent }
  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(data)
  }
  const response = await fetch('http://127.0.0.1:8000/', options)
}
  