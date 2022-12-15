const __main = async () => {
	const adapter = await navigator.gpu.requestAdapter({
		powerPreference: 'high-performance',
	})
	const device = await adapter.requestDevice()
    console.log('device', device)
}

__main()
