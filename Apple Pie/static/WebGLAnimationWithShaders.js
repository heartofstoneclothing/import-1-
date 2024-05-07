// Function to animate the Koch snowflake
function animateKochSnowflake() {
    const canvas = document.getElementById('webglCanvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        console.error('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    // Define the vertices for the Koch snowflake
    const vertices = [
        -0.5, Math.sqrt(3) / 6,
        0.5, Math.sqrt(3) / 6,
        0, -Math.sqrt(3) / 3
    ];

    // Initialize the buffer object
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex shader program
    const vsSource = `
        attribute vec2 aVertexPosition;
        void main() {
            gl_Position = vec4(aVertexPosition, 0.0, 1.0);
        }
    `;

    // Fragment shader program
    const fsSource = `
        void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color
        }
    `;

    // Initialize the shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Get the attribute location and enable it
    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the Koch snowflake with animation
    let currentIteration = 0;
    const maxIterations = 10; // Total iterations over 10 seconds
    const animationDuration = 1000; // 1 second per iteration

    function drawFrame(timestamp) {
        const progress = Math.min((timestamp / animationDuration), 1);
        currentIteration = Math.floor(progress * maxIterations);

        // Clear canvas
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Draw snowflake
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

        if (progress < 1) {
            setTimeout(() => {
                requestAnimationFrame(drawFrame);
            }, animationDuration); // Wait for 1 second before rendering next frame
        }
    }

    requestAnimationFrame(drawFrame);
}

// Call the function to start animating the Koch snowflake
animateKochSnowflake();
