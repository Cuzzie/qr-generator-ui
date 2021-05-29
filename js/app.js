const generated = document.querySelector(".generated")
const canvas = document.querySelector("canvas")
const textInput = document.querySelector("input#text")

document.addEventListener("DOMContentLoaded", () => {
  if (generated && textInput && canvas) {
    textInput.addEventListener("keyup", () => {
      const val = textInput.value.trim()
      if (val) {
        generated.style.display = "block"
        QRCode.toCanvas(canvas, val, { toSJISFunc: QRCode.toSJIS }, (err) => {
          if (err) {
            console.error(err)
          }
        })
      } else {
        // Clear the canvas
        const context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
        generated.style.display = "none"
      }
    })

    canvas.addEventListener("click", (e) => {
      const data = e.target.toDataURL()
      const elem = document.createElement("a")
      elem.href = data
      elem.download = `qr_${Date.now()}.png`
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    })
  }
})
