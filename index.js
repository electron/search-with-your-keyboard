const keycode = require('keycode')
const assert = require('assert')

module.exports = function searchWithYourKeyboard (inputSelector, hitsSelector) {
  assert(typeof inputSelector === 'string', 'inputSelector should be a string')
  assert(typeof hitsSelector === 'string', 'hitsSelector should be a string')

  let activeIndex = 0
  const targetEventCodes = ['up', 'down', 'enter', '/', 'esc']
  const input = document.querySelector(inputSelector)
  const hits = document.querySelector(hitsSelector)

  // assert(input, `no element found for inputSelector: ${inputSelector}`)
  // assert(hits, `no element found for hitsSelector: ${hitsSelector}`)

  // deactivate any active hit when search input is focused by a mouse click
  input.addEventListener('focus', () => {
    activeIndex = 0
    deactivateHits()
  })

  // deactivate any active hit when typing in search box
  input.addEventListener('keydown', () => {
    if (!targetEventCodes.includes(event.code)) {
      activeIndex = 0
      deactivateHits()
    }
  })

  document.addEventListener('keydown', event => {
    // bail early if key code is not one that we're explicity expecting
    if (!event || !event.code || !targetEventCodes.includes(keycode(event))) return

    const hits = Array.from(document.querySelectorAll(hitsSelector))

    switch(keycode(event)) {
      case 'esc':
        input.focus()
        input.select()
        input.value = ''
        return
        break

      case '/':
        // when the input is focused, `/` should have no special behavior
        if (event.target !== input) {
          input.focus()
          input.select()
          return
        }
        break

      case 'up':
        // search input is the zero index (don't go beyond it)
        if (activeIndex > 0) {
          activeIndex--
          event.preventDefault() // prevent window scrolling
        }
        updateActiveHit()
        break

      case 'down':
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
          window.location = href
        }
        break
    }  
  })


  function deactivateHits () {
    Array.from(document.querySelectorAll(hitsSelector)).forEach(hit => {
      hit.classList.remove('active')
    })
  }

  function updateActiveHit() {
    deactivateHits()

    if (activeIndex === 0) {
      input.focus()
      input.select()
    } else {
      const hits = Array.from(document.querySelectorAll(hitsSelector))
      hits[activeIndex - 1].classList.add('active')
      input.blur()
    }
  }
}