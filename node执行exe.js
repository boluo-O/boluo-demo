const exec = require('child_process').execFile

// 注意path参数中路径分隔符 \ 转义 \\
const runExe = (path) => {
	exec(path, (err, data) => {
		console.log('err', err)
		console.log('data', data)
	})
}

const __main = () => {
	runExe(
		'C:\\Users\\boluo\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe'
	)
}

__main()
