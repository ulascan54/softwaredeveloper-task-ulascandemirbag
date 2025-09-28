//Ulaş Can Demirbağ
;(() => {
  const ProdcutsUrl =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"

  const init = async () => {
    const products = await fetchProducts()
    console.log("Products:", products)

    // self.buildHTML()
    // self.buildCSS()
    // self.setEvents()
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
            <div class="container">
                <h1></h1>
            </div>
        `
    $(`.product-detail`).append(html)
  }

  const buildCSS = () => {
    const css = `
      .container{
        backgorund-color: red;
        height: 100px;
        width: 100px;
      }
    `
    $(`<style>`).addClass(`carousel-style`).html(css).appendTo(`head`)
  }

  const setEvents = () => {
    $(``).on(`click`, () => {
      console.log("clicked")
    })
  }

  init()
})()
