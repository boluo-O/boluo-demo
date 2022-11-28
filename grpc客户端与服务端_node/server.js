const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

class GRPCService {
	constructor() {
		this.server = new grpc.Server()
	}

	addService(protoPath, packageName, serviceName, serviceMethodMap) {
		// 加载proto文件
		const PROTO_PATH = path.join(__dirname, protoPath)
		const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
			keepCase: true,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true,
		})
		const protoFile = grpc.loadPackageDefinition(packageDefinition)
		this.server.addService(
			protoFile[packageName][serviceName].service,
			serviceMethodMap
		)
	}

	_start() {
		this.server.start()
		console.log('grpc server started success!')
	}

	start(port) {
		// server.bind 会报错 Not implemented. Use bindAsync() instead
		this.server.bindAsync(
			`localhost:${port}`,
			grpc.ServerCredentials.createInsecure(),
			this._start.bind(this)
		)
	}
}

const __main = () => {
	const grpc = new GRPCService()

	grpc.addService('demo.proto', 'demo', 'DemoService', {
		TestRPC: (call, callback) => {
			console.log('call.request', call.request)
			callback(null, {
				resStr: '响应啦啦啦',
				resNum: 12346,
			})
		},
	})

	grpc.addService('demo.proto', 'demo', 'StreamService', {
		TestStream: (call) => {
			let count = 1
			const interval = setInterval(() => {
				call.write({ message: `第${count}次` })
				if (a > 9) {
					call.end()
					clearInterval(interval)
				}
				count++
			}, 1000)
		},
	})

	grpc.start('8888')
}

__main()
