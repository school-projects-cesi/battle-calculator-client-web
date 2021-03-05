export default {
	install: (app) => {
		const colorDefault = 'transparent'
		const values = { color: colorDefault }
		const elements = []

		// create a mixin
		app.config.globalProperties.$background = ({ color }) => {
			values.color = color
			elements.forEach((element) => {
				element.style.backgroundColor = values.color
			})
		}
		app.config.globalProperties.$background.reset = () => {
			values.color = colorDefault
			elements.forEach((element) => {
				element.style.backgroundColor = values.color
			})
		}

		app.directive('background', {
			mounted(el) {
				el.style.backgroundColor = values.color
				elements.push(el)
			},
		})
	},
}
