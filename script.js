async function download() {
  const url = document.getElementById('url').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://api.igram.world/api/ig?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      let html = '';
      data.data.forEach(media => {
        html += `<a href="${media.url}" target="_blank" download><img src="${media.thumbnail}" width="100%" style="margin-top:10px;"></a>`;
      });
      resultDiv.innerHTML = html;
    } else {
      resultDiv.innerHTML = "Failed to fetch media. Check the URL.";
    }
  } catch (error) {
    resultDiv.innerHTML = "Error: " + error.message;
  }
}
