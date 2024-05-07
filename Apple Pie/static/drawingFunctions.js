// Get the WebGL context from the canvas
const canvas = document.getElementById('webglCanvas');
const gl = canvas.getContext('webgl');
if (!gl) {
    console.error('WebGL not supported');
}

// Define vertex shader source code
const vertexShaderSource = `
    attribute vec3 position;
    void main() {
        gl_Position = vec4(position, 1.0);
    }
`;

// Define fragment shader source code
const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 resolution;
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color
    }
`;

// Create vertex shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Error compiling vertex shader:', gl.getShaderInfoLog(vertexShader));
}

// Create fragment shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Error compiling fragment shader:', gl.getShaderInfoLog(fragmentShader));
}

// Create shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Error linking shader program:', gl.getProgramInfoLog(shaderProgram));
}

// Define grid vertices
const gridSize = 3;
const spacing = 1.0;
let gridVertices = [];
for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
            gridVertices.push(x * spacing, y * spacing, z * spacing);
        }
    }
}

// Create buffer and store grid data
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridVertices), gl.STATIC_DRAW);

// Get attribute location and enable it
const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

// Set clear color and clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Use shader program and draw grid
gl.useProgram(shaderProgram);
gl.drawArrays(gl.POINTS, 0, gridVertices.length / 3);
