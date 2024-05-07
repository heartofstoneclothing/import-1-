function animateMandelbrotSetFractal() {
    const canvas = document.getElementById('webglCanvas');
    const gl = canvas.getContext('2d');

    // Set up resolution
    const resolution = { x: canvas.width, y: canvas.height };

    // Initialize variables for iteration and maximum iterations
    let maxIterations = 100;
    let currentIteration = 0;

    // Function to render each frame of the animation
    function renderFrame() {
        // Clear the canvas
        gl.clearRect(0, 0, resolution.x, resolution.y);

        // Iterate over each pixel in the canvas
        for (let x = 0; x < resolution.x; x++) {
            for (let y = 0; y < resolution.y; y++) {
                // Map pixel coordinates to Mandelbrot set coordinates
                const cx = (x / resolution.x) * 3.5 - 2.5;
                const cy = (y / resolution.y) * 2.0 - 1.0;

                let iter = 0;
                let zx = 0;
                let zy = 0;

                // Perform Mandelbrot set iteration (limited to maxIterations)
                while (iter < currentIteration && zx * zx + zy * zy < 4) {
                    const temp = zx * zx - zy * zy + cx;
                    zy = 2 * zx * zy + cy;
                    zx = temp;
                    iter++;
                }

                // Set pixel color based on iteration count
                const intensity = iter / maxIterations; // Normalize iteration count to a range of 0 to 1
                const color = 255 * intensity;
                const rgbaColor = `rgba(${color}, ${color}, ${color}, 1.0)`;

                // Draw pixel on canvas
                gl.fillStyle = rgbaColor;
                gl.fillRect(x, y, 1, 1);
            }
        }

        // Increase currentIteration if it's less than maxIterations
        if (currentIteration < maxIterations) {
            currentIteration++;
        }

        // Request next frame
        requestAnimationFrame(renderFrame);
    }

    // Start rendering frames
    renderFrame();

    // Increment the iteration every second
    setInterval(() => {
        if (currentIteration < maxIterations) {
            currentIteration++;
        }
    }, 1000);
}

// Call the function to start animating the Mandelbrot set fractal
animateMandelbrotSetFractal();