import words from './dictionary.json'

window.onload = (event) => {
  var input = document.getElementsByTagName("input")[0]
  var main  = document.getElementsByTagName("main")[0]
  input.focus()
  input.onkeyup = (event) => {
    if (input.value.length) {
      const term    = input.value.toLowerCase()
      const format  = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      const pattern = new RegExp("^" + format)

      const result = words.filter((word) => {
        const meanings = word.meaning.split(" ").reduce((result, meaning) => {
          return result || pattern.test(meaning)
        }, false)
        const sources = word.sources.reduce((result, source) => {
          return result || pattern.test(source.source)
        }, false)
        return pattern.test(word.value) ||
          meanings ||
          sources
      })

      main.innerHTML = result.reduce((words, word) => {
        const sources = word.sources.sort((source_a, source_b) => {
          return source_a.language > source_b.language
        }).reduce((sources, source) => {
          return sources +
            "<li class=\"" + source.language + "\">" +
              source.source +
            "</li>"
        }, "")
        const meaning = word.meaning.replace(/x([1-5])/g, "x<sub>$1</sub>")
        return words + "<div class=\"word\">" +
          "<h4>" + word.value + "</h4>" +
          "<ul>" + sources + "</ul>" +
          "<div class=\"meaning\">" + meaning + "</div>" +
        "</div>"
      }, "")
    } else {
      main.innerHTML = ""
    }
  }
}
