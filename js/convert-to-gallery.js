function convertAndAddToGallery() {
  const input = document.getElementById('imageInput');
  if (!input.files.length) {
    alert("Selecciona una imagen primero.");
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const base64 = e.target.result;
    const img = new Image();

    img.onload = function () {
      const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">
  <image href="${base64}" width="${img.width}" height="${img.height}"/>
</svg>`;

      const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);

      const gallery = document.getElementById("output_svgs");
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `<a href="${svgUrl}" download="${file.name.replace(/\.\w+$/, '.svg')}" title="Descargar SVG">
                         <img src="${svgUrl}" alt="icon">
                       </a>`;
      gallery.appendChild(div);
    };

    img.src = base64;
  };

  reader.readAsDataURL(file);
}
