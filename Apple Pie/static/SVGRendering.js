// Function to animate the Julia set fractal
function animateJuliaSetFractal() {
    const canvas = document.getElementById('webglCanvas');
    const ctx = canvas.getContext('2d'); // Using '2d' context for 2D rendering

    // Set up resolution
    const resolution = { x: canvas.width, y: canvas.height };

    // Initialize variables for iteration and maximum iterations
    let maxIterations = 100;
    let currentIteration = 0;

    // Julia set parameters (you can adjust these for different Julia sets)
    const cRe = -0.7;
    const cIm = 0.27015;

    // Function to render each frame of the animation
    function renderFrame() {
        // Create an ImageData object to manipulate pixel data directly
        const imageData = ctx.createImageData(resolution.x, resolution.y);
        const data = imageData.data;

        // Iterate over each pixel in the canvas
        for (let x = 0; x < resolution.x; x++) {
            for (let y = 0; y < resolution.y; y++) {
                // Map pixel coordinates to Julia set coordinates
                let zx = 3 * (x - resolution.x / 2) / (0.5 * resolution.x);
                let zy = 3 * (y - resolution.y / 2) / (0.5 * resolution.y);

                let iter = 0;
                let tempZx, zx2, zy2;

                // Perform Julia set iteration
                while (iter < currentIteration && zx * zx + zy * zy < 4) {
                    zx2 = zx * zx - zy * zy + cRe;
                    zy2 = 2 * zx * zy + cIm;
                    zx = zx2;
                    zy = zy2;
                    iter++;
                }

                // Set pixel color based on iteration count
                const intensity = iter / maxIterations; // Normalize iteration count to a range of 0 to 1
                const color = Math.floor(255 * intensity);
                const pixelIndex = (x + y * resolution.x) * 4; // Calculate pixel index in the ImageData array

                // Set RGBA values for the pixel
                data[pixelIndex] = color; // Red
                data[pixelIndex + 1] = color; // Green
                data[pixelIndex + 2] = color; // Blue
                data[pixelIndex + 3] = 255; // Alpha (fully opaque)
            }
        }

        // Put the modified ImageData back onto the canvas
        ctx.putImageData(imageData, 0, 0);

        // Increase currentIteration if it's less than maxIterations
        if (currentIteration < maxIterations) {
            currentIteration++;
        }

        // Check if the animation duration has elapsed (10 seconds), and stop the animation
        if (currentIteration <= maxIterations) {
            // Schedule the next frame using requestAnimationFrame for smoother animation
            requestAnimationFrame(renderFrame);
        }
    }

    // Calculate the animation duration in milliseconds (10 seconds)
    const animationDuration = 10 * 1000;

    // Calculate the number of iterations per millisecond
    const iterationsPerMillisecond = maxIterations / animationDuration;

    // Calculate the initial number of iterations based on the duration
    const initialIterations = 0;

    // Start rendering frames
    currentIteration = initialIterations;
    renderFrame();
}

// Call the function to start animating the Julia set fractal over 10 seconds
animateJuliaSetFractal();
