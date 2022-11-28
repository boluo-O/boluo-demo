const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

// 初步封装grpcRequest
const grpcRequest = (protoPath, packageName, serviceName, port) => {
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
	// 添加和启动服务
	const client = new protoFile[packageName][serviceName](
		`localhost:${port}`,
		grpc.credentials.createInsecure()
	)
	return client
}

const testRPC = () => {
	const client = grpcRequest('demo.proto', 'demo', 'DemoService', '8888')
	client.TestRPC(
		{
			haha: '哈哈哈哈',
			hehe: '呵呵呵呵',
			num: 1111111,
		},
		(err, res) => {
			console.log('client.TestRPC err', err)
			console.log('client.TestRPC res', res)
		}
	)
}

const testStream = () => {
	const client = grpcRequest('demo.proto', 'demo', 'StreamService', '8888')
	client
		.TestStream({})
		.on('err', (err) => {
			console.log('grpc stream err', err)
		})
		.on('data', (data) => {
			console.log('grpc stream data', data)
		})
		.on('status', (status) => {
			console.log('grpc stream status', status)
		})
		.on('end', () => {
			console.log('grpc stream end')
		})
}

const main = async () => {
	testRPC()
	testStream()
}

main()
