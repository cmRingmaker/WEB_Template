# Theme Toggle

The intended usage of this template is to utilize light-dark() in CSS as well as using an SVG toggle button to change colors of the theme.

theme.js does the primary heavy lifting when toggling between themes and saving states for returning visits.

This template includes HTML, CSS, and JS that serve one purpose: to toggle theme modes.
---

## HTML
DIV that holds the following:

**SPAN**

- When the toggle is hovered, the span is animated in and tells which theme mode the user will be switching to.

**INPUT [checkbox]**
- A checkbox that controls the state of the theme, Dark or Light, as well as the SVGs in the toggle.
- True = Light Mode | False = Dark Mode
- [(see JS)](#javascript) Checkbox state will be saved in Local Storage of the browser.
- [(see JS)](#javascript) If users first visit, use their system settings to determine theme choice.

**LABEL [for checkbox]**
- Contains an SVG with multiple elements for a toggle button, including a mask.
- [(see JS)](#javascript) Changes SVG based on theme state.
---

## CSS

Within the :root, a color-scheme is set to light dark to utilize CSS's light-dark()

**:root**
- color-scheme is set to light dark to utilize CSS's light-dark() to handle multiple theme colors.
- Using variables to define colors and then using light-dark() to use the already defined variables makes sure you only need to edit in one place to affect everything.
  color-scheme changes:
- [(see JS)](#javascript) On first visit, checkbox is set to indeterminate - neither true or false. This allows for initial load to respect system settings.
- If checkbox is false and not set to indeterminate, set to light theme.
- If checkbox is true, set to dark theme.

**THEME**
- Utilizing CSS nesting, everything within theme is contained so caring about specificity of selectors isn't as mandatory.
- Set all elements to the right side of the page and hide the checkbox.
- Add animations to span when hovering the label.
- Flex to label for centering purposes.
- SVG styles that aren't inline and animations for smooth transitions.

---

## JavaScript

- Assuming the user has a theme chosen already, load page with that theme every visit.
- If first initial visit, set checkbox to indeterminate.

**updateTogglePositions()**
- Depending checkbox state, set SVGs to their appropriate appearance using cx.

**setTheme(theme)**
- Checkbox is set to whichever value is in localstorage.
- Change SPAN text depending on checkbox.

**if(!savedTheme)**
- Runs only on first page load.
- setTimeout is used to delay getting the RGB value of background until initial page is loaded.
- getLightness function is to check the current preceived lightness of the RGB value of the background-color, if it's closer to black, set theme to dark. If it's closer to white, set theme to light.
