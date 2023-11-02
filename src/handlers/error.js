const handleError = (ERROR, STATE) => {
	STATE.LOADING = false
	STATE.ERROR.DISPLAY = true

	try {
		STATE.ERROR.CODE = ERROR.response.status
		STATE.ERROR.DESCRIPTION = ERROR.response.statusText.toLowerCase()
	} catch {
		STATE.ERROR.CODE = 'xxx'
		STATE.ERROR.DESCRIPTION = 'something went horrible wrong'
	}
}

export { handleError }
