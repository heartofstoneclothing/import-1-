// MandelbrotSetFractalSnippet.js

// Function to render Mandelbrot set fractal
function renderMandelbrotSetFractal() {
    const canvas = document.getElementById('webglCanvas');
    const gl = canvas.getContext('2d');

    // Set up resolution
    const resolution = { x: canvas.width, y: canvas.height };

    // Iterate over each pixel in the canvas
    for (let x = 0; x < resolution.x; x++) {
        for (let y = 0; y < resolution.y; y++) {
            // Map pixel coordinates to Mandelbrot set coordinates
            const cx = (x / resolution.x) * 3.5 - 2.5;
            const cy = (y / resolution.y) * 2.0 - 1.0;

            let iter = 0;
            let zx = 0;
            let zy = 0;

            // Perform Mandelbrot set iteration
            while (iter < 100 && zx * zx + zy * zy < 4) {
                const temp = zx * zx - zy * zy + cx;
                zy = 2 * zx * zy + cy;
                zx = temp;
                iter++;
            }

            // Set pixel color based on iteration count
            const intensity = iter / 100; // Normalize iteration count
            const color = 255 * intensity;
            const rgbaColor = `rgba(${color}, ${color}, ${color}, 1.0)`;

            // Draw pixel on canvas
            gl.fillStyle = rgbaColor;
            gl.fillRect(x, y, 1, 1);
        }
    }
}

// Call the function to start rendering the Mandelbrot set fractal
renderMandelbrotSetFractal();
