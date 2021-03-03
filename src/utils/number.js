// main
const IsNumberKeyWithoutDecimal = (value) => {
	const regExp = /^([0-9]|,|\.)$/gi
	return value.match(regExp)
}

// export
// eslint-disable-next-line import/prefer-default-export
export { IsNumberKeyWithoutDecimal }
