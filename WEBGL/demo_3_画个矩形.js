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
	gl.useProgram(shaderProgram)
	return shaderProgram
}

const initVertexBuffer = (gl, shaderField, shaderFieldValue, size) => {
	const vertexBuffer = gl.createBuffer() // 创建buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer) // 绑定buffer
	gl.bufferData(gl.ARRAY_BUFFER, shaderFieldValue, gl.STATIC_DRAW) // buffer 写入数据
	gl.vertexAttribPointer(shaderField, size, gl.FLOAT, false, 0, 0) // buffer数据分配给shader变量
	gl.enableVertexAttribArray(shaderField) // 开启变量
}

const drawRect = (gl) => {
	const vertex_shader_source = `
	attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
		gl_PointSize = 30.0;
    }
`
	const fragment_shader_source = `
	void main() {
		gl_FragColor = vec4(0, 1, 1, 1);
	}
`
	const shaderProgram = initShaderProgram(
		gl,
		vertex_shader_source,
		fragment_shader_source
	)
	const a_Position = gl.getAttribLocation(shaderProgram, 'a_Position')
	const vertexs = new Float32Array([
		-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5,
	])
	const size = 2
	const vertexNum = vertexs.length / size
	
	initVertexBuffer(gl, a_Position, vertexs, size)
	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexNum)
	// gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexNum)
}

const __main = () => {
	/** @type {HTMLCanvasElement} */
	const canvas = document.querySelector('#id-canvas-webgl')
	const gl = canvas.getContext('webgl')

	drawRect(gl)
}

__main()
