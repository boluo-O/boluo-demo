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

// demo-1 平移
const drawTriangle_move = (gl) => {
	const vertex_shader_source = `
	attribute vec4 a_Position;
	uniform vec4 u_Translation;
    void main() {
        gl_Position = a_Position + u_Translation;
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

	const vertexs = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5])
	const size = 2
	const vertexNum = vertexs.length / size
	initVertexBuffer(gl, a_Position, vertexs, size)
	// 平移
	const u_Translation = gl.getUniformLocation(shaderProgram, 'u_Translation')
	gl.uniform4f(u_Translation, 0, 0.5, 0, 0)	// 平移距离 X, Y, Z, W

	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.drawArrays(gl.TRIANGLES, 0, vertexNum)
}

// demo-2 旋转	以Z轴为旋转轴，逆时针旋转
const drawTriangle_rotate = (gl) => {
	const vertex_shader_source = `
	attribute vec4 a_Position;
	uniform float u_CosB;
	uniform float u_SinB;
    void main() {
        gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
        gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
        gl_Position.z = a_Position.z;
        gl_Position.w = 1.0;
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

	const vertexs = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5])
	const size = 2
	const vertexNum = vertexs.length / size
	initVertexBuffer(gl, a_Position, vertexs, size)
	// 旋转
	const ANGLE = -90.0	// 旋转角度
	const radian = Math.PI * ANGLE / 180
	const cosB = Math.cos(radian)
	const sinB = Math.sin(radian)
	const u_CosB = gl.getUniformLocation(shaderProgram, 'u_CosB')
	const u_SinB = gl.getUniformLocation(shaderProgram, 'u_SinB')
	gl.uniform1f(u_CosB, cosB)
	gl.uniform1f(u_SinB, sinB)

	gl.clearColor(0, 0, 0, 1)
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.drawArrays(gl.TRIANGLES, 0, vertexNum)
}

const __main = () => {
	/**
	 * @global
	 * @type {HTMLCanvasElement}
	 * */
	const canvas = document.querySelector('#id-canvas-webgl')
	const gl = canvas.getContext('webgl')

	// drawTriangle_move(gl)
	drawTriangle_rotate(gl)
}

__main()
