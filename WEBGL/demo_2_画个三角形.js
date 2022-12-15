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

const initVertexBuffer = (gl, shaderField) => {
	const n = 3
	const vertexs = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5])

	const vertexBuffer = gl.createBuffer() // 创建buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer) // 绑定buffer
	gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW) // buffer 写入数据
	gl.vertexAttribPointer(shaderField, 2, gl.FLOAT, false, 0, 0) // buffer数据分配给shader变量
	gl.enableVertexAttribArray(shaderField) // 开启变量
	return n
}

// demo-1 画三个点
const drawPoint_three = (gl) => {
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
	const a_Position = gl.getAttribLocation(shaderProgram, 'a_Position')
	initVertexBuffer(gl, a_Position)
	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.drawArrays(gl.POINTS, 0, 3)
}

// demo-1 画三角形
const drawTriangle = (gl) => {
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
	initVertexBuffer(gl, a_Position)
	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)

	// gl.drawArrays(gl.POINTS, 0, 3)		//	画点
	// gl.drawArrays(gl.LINES, 0, 3)		// 	画线
	// gl.drawArrays(gl.LINE_STRIP, 0, 3)	//	画线段
	// gl.drawArrays(gl.LINE_LOOP, 0, 3)	//	画闭环线
	gl.drawArrays(gl.TRIANGLES, 0, 3)		//	画三角形
}

const __main = () => {
	/** @type {HTMLCanvasElement} */
	const canvas = document.querySelector('#id-canvas-webgl')
	const gl = canvas.getContext('webgl')

	// drawPoint_three(gl)
	drawTriangle(gl)
}

__main()
