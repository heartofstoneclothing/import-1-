const canvas = document.getElementById('webglCanvas');
const gl = canvas.getContext('2d');

const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V6h8v2z"/>
    </svg>
`;

const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
const svgUrl = URL.createObjectURL(svgBlob);

const img = new Image();
img.onload = function() {
    // Draw the image onto the canvas
    gl.drawImage(img, 0, 0);
};
img.src = svgUrl;
