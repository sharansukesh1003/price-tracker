window.onload = function () {
  document.getElementById("submit-data").onclick = async () => {
    let url = document.getElementById("urlField").value
    let userAgent = document.getElementById("userAgentField").value
    const data = {
      url,
      userAgent
    }
    const options = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('http://127.0.0.1:8000/', options)
  };
}