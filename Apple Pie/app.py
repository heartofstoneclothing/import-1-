from flask import Flask, render_template

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Fractal-Animation')
def fractal_animation():
    return render_template('FractalAnimation.html')

@app.route('/svg-rendering')
def svg_rendering():
    return render_template('SVGRendering.html')

@app.route('/webgl-animation')
def webgl_animation():
    return render_template('WebGLAnimationWithShaders.html')

if __name__ == "__main__":
    app.run(debug=True)
