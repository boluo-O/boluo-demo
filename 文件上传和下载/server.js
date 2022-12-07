const http = require('http')
const formidable = require('formidable')
const fs = require('fs')

http.createServer((req, res) => {
	//  设置cors跨域
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	res.setHeader('Content-Type', 'application/json')
	console.log('req.url', req.url)
	//  保存和重命名文件
	if (req.method === 'POST' && req.url === '/upload') {
		const form = new formidable.IncomingForm()
		form.uploadDir = './myDir'
		form.keepExtensions = true

		form.on('field', (field, value) => {
			console.log('on field')
			console.log('field', field)
			console.log('value', value)
		})

		form.on('end', () => {
			console.log('on end')
			res.end('上传完成!')
		})

		form.on('file', (name, file) => {
			console.log('on file')
			fs.renameSync(file.filepath, './myDir/' + file.originalFilename)
		})

		form.on('error', (err) => {
			console.log('err', err)
			res.statusCode = 500
			res.end('服务器内部错误!')
		})

		form.parse(req)
	} else if (req.method === 'GET' && req.url === '/getFile') {
		fs.readFile('./myDir/test.txt', 'utf-8', (err, data) => {
			res.statusCode = 200
			res.end(data)
		})
	} else if (req.method === 'OPTIONS') {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.statusCode = 200
		res.end()
	}
}).listen(8844, '127.0.0.1')
