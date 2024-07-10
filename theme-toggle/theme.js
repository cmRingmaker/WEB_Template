const themeToggle = document.getElementById('theme-toggle')
const savedTheme = localStorage.getItem('theme')
const themeText = document.getElementById('theme-text')
// SVGs
const leftCircle = document.querySelector('.toggle-unchecked')
const rightCircle = document.querySelector('.toggle-checked')

// Save state of checkbox based on current theme chosen
if (savedTheme) {
	setTheme(savedTheme)
	updateTogglePositions()
} else {
	// Set the state of checkbox to be neither true or false for first page load
	themeToggle.indeterminate = true
}

themeToggle.addEventListener('change', () => {
	setTheme(themeToggle.checked ? 'Dark' : 'Light')
	updateTogglePositions()
})

function updateTogglePositions() {
	if (themeToggle.checked) {
		leftCircle.setAttribute('cx', 8)
		rightCircle.setAttribute('cx', 70)
	} else {
		leftCircle.setAttribute('cx', -22)
		rightCircle.setAttribute('cx', 40)
	}
}

function setTheme(theme) {
	themeToggle.checked = theme === 'Dark'
	localStorage.setItem('theme', theme)
	// Set theme-text span to display opposite theme mode (that you will be changing to)
	themeText.textContent = `${theme === 'Dark' ? 'Light' : 'Dark'} Mode`
}

// Only runs on users first page load!
// This was the only way I could solve a bug that forced system darkmode users to click the checkbox twice.
// The intention is for the users VERY FIRST load, set the theme and checkbox accordingly.
if (!savedTheme) {
	setTimeout(() => {
		// Get the preceived lightness of an RGB value
		const getLightness = (color) => {
			const [r, g, b] = color.match(/\d+/g).map((n) => n / 255)
			// Using WCAG 2 formula to get Relative luminance of how bright the current background is on users first page load
			return 0.2126 * r + 0.7152 * g + 0.0722 * b
		}

		// Get the background color of the body and set
		const bgColor = window.getComputedStyle(document.body).backgroundColor
		const isDark = getLightness(bgColor) < 0.5
		setTheme(isDark ? 'Dark' : 'Light')
	}, 5)
}
