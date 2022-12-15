const loadShader = (gl, type, source) => {
	const shader = gl.createShader(type)
	gl.shaderSource(shader, source)
	gl.compileShader(shader)
	return shader
}

const initShaderProgram = (gl, vsSource, fsSource) => {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
	const shaderProgram = gl.createProgram()
	gl.attachShader(shaderProgram, vertexShader)
	gl.attachShader(shaderProgram, fragmentShader)
	gl.linkProgram(shaderProgram)
	return shaderProgram
}

// demo-1 用黑色清空画布颜色
const drawBlack = (gl) => {
	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)
}

// demo-2 画一个点
const drawPoint = (gl) => {
	const vertex_shader_source = `
    void main() {
        gl_Position = vec4(0, 0, 0, 1);
        gl_PointSize = 30.0;
    }
`

	const fragment_shader_source = `
    void main() {
        gl_FragColor = vec4(1, 1, 1, 1);
    }
`

	const shaderProgram = initShaderProgram(
		gl,
		vertex_shader_source,
		fragment_shader_source
	)

	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.useProgram(shaderProgram)
	gl.drawArrays(gl.POINTS, 0, 1)
}

// demo-3 画一个点
const drawPointParams = (gl, location) => {
	const vertex_shader_source = `
	attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 30.0;
    }
`

	const fragment_shader_source = `
    void main() {
        gl_FragColor = vec4(1, 1, 1, 1);
    }
`

	const shaderProgram = initShaderProgram(
		gl,
		vertex_shader_source,
		fragment_shader_source
	)

	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.useProgram(shaderProgram)

	const a_Position = gl.getAttribLocation(shaderProgram, 'a_Position')
	gl.vertexAttrib3f(a_Position, location[0], location[1], location[2])

	gl.drawArrays(gl.POINTS, 0, 1)
}

const __main = () => {
	/** @type {HTMLCanvasElement} */
	const canvas = document.querySelector('#id-canvas-webgl')
	const gl = canvas.getContext('webgl')

	// drawBlack(gl)
	// drawPoint(gl)
	drawPointParams(gl, [0, 0, 0])
}

__main()
