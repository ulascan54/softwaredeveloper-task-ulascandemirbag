//Ulaş Can Demirbağ
;(() => {
  const ProdcutsUrl =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"

  const init = async () => {
    const products = await fetchProducts()
    console.log("Products:", products)

    buildHTML()
    buildCSS()
    setEvents()
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch(ProdcutsUrl)
      if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Ürünler alınamadı:", error)
      return {}
    }
  }

  const buildHTML = () => {
    const html = `
      <div class="carousel-container">
        <h2 class="title">Beğenebileceğinizi düşündüklerimiz</h2>
      </div>
        `
    const targetElement = document.querySelector(".Section2A.has-components")
    if (targetElement) {
      targetElement.insertAdjacentHTML("afterbegin", html)
    } else {
      console.error("Hedef element (.Section2A.has-components) bulunamadı.")
    }
  }

  const buildCSS = () => {
    const css = `
      .carousel-container {
        padding: 20px 15px;
      }
      .carousel-container .title {
        font-family: Quicksand-semibold;
        font-size: 24px;
        font-weight: 500;
        text-transform: capitalize;
        color: #2b2f33;
        margin: 0;
      }
    `

    const styles = document.createElement("style")
    styles.classList.add("carousel-style")
    styles.textContent = css
    document.head.appendChild(styles)
  }

  const setEvents = () => {}

  init()
})()
