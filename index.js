const keycode = require('keycode')
const assert = require('assert')

module.exports = function searchWithYourKeyboard (inputSelector, hitsSelector) {
  assert(typeof inputSelector === 'string', 'inputSelector should be a string')
  assert(typeof hitsSelector === 'string', 'hitsSelector should be a string')

  let activeIndex = 0
  const targetEventCodes = ['up', 'down', 'enter', '/', 'esc']
  const input = document.querySelector(inputSelector)

  // deactivate any active hit when search input is focused by a mouse click
  input.addEventListener('focus', () => {
    activeIndex = 0
    deactivateHits()
  })

  // deactivate any active hit when typing in search box
  input.addEventListener('keydown', event => {
    if (!targetEventCodes.includes(event.code)) {
      activeIndex = 0
      deactivateHits()
    }
  })

  document.addEventListener('keydown', event => {
    // bail early if key code is not one that we're explicity expecting
    if (!event || !event.code || !targetEventCodes.includes(keycode(event))) return

    const hits = getCurrentHits()
    const queryExists = Boolean(input && input.value && input.value.length > 0)

    // If we on `input` element we skip all events, if not
    // we accept all events described bottom.
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return false

    switch (keycode(event)) {
      case 'esc':
        input.focus()
        input.select()
        input.value = ''
        return

      case '/':
        // when the input is focused, `/` should have no special behavior
        if (event.target !== input) {
          input.focus()
          input.select()
          event.preventDefault() // prevent slash from being typed into input
        }
        break

      case 'up':
        if (!queryExists) return

        // search input is the zero index (don't go beyond it)
        if (activeIndex > 0) {
          activeIndex--
          event.preventDefault() // prevent window scrolling
        }
        updateActiveHit()
        break

      case 'down':
        if (!queryExists) return

        // last hit is the last index (don't go beyond it)
        if (activeIndex < hits.length) {
          activeIndex++
          event.preventDefault() // prevent window scrolling
        }
        updateActiveHit()
        break

      case 'enter':
        // look for a link in the given hit, then visit it
        if (activeIndex > 0) {
          const hit = hits[activeIndex - 1]
          if (!hit) return
          const link = hit.querySelector('a')
          if (!link) return
          const href = link.getAttribute('href')
          if (!href) return

          // If `ctrlKey` is pressed, opens page in new window.
          // In all other cases, we open the page in the same window.
          if (event.ctrlKey) {
            window.open(href, '_blank')
            // NOTE: The `window.focus()` method not work correctly
            // on some browser or OS. It don't focus window in
            // Chrome browser.
            window.focus()
          } else {
            window.location = href
          }
        }
        break
    }
  })

  function deactivateHits () {
    Array.from(document.querySelectorAll(hitsSelector)).forEach(hit => {
      hit.classList.remove('active')
    })
  }

  function getCurrentHits () {
    return Array.from(document.querySelectorAll(hitsSelector)).filter(el => {
      return el.style.display !== 'none' && el.offsetParent !== null // element is visible
    })
  }

  function updateActiveHit () {
    deactivateHits()

    if (activeIndex === 0) {
      input.focus()
      input.select()
    } else {
      const hits = getCurrentHits()
      hits[activeIndex - 1].classList.add('active')
      input.blur()
    }
  }
}
