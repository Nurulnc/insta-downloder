async function download() {
  const url = document.getElementById('url').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "Loading...";

  try {
    const formData = new FormData();
    formData.append("q", url);

    const response = await fetch("https://www.saveig.app/api/ajaxSearch", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
      let html = '';
      data.data.forEach(media => {
        html += `
          <a href="${media.url}" target="_blank" download>
            <img src="${media.thumbnail || media.url}" width="100%" style="margin-top:10px;" />
          </a>
        `;
      });
      resultDiv.innerHTML = html;
    } else {
      resultDiv.innerHTML = "❌ Media not found or invalid link.";
    }
  } catch (error) {
    resultDiv.innerHTML = "❌ Error: " + error.message;
  }
}
