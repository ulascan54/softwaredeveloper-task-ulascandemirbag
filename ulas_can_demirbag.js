//Ulaş Can Demirbağ
;(() => {
  const ProdcutsUrl =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"

  const init = async () => {
    if (window.location.pathname !== "/") {
      console.log("wrong page")
      return
    }

    const products = await fetchProducts()
    console.log("Products:", products)

    buildHTML(products)
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
      console.log("FETCH ERROR: PRODUCTS NOT FOUND", error)
      return {}
    }
  }

  const buildHTML = (products) => {
    const html = `
      <div class="carousel-container">
        <h2 class="title">Beğenebileceğinizi düşündüklerimiz</h2>
        <div class="product-container"></div>
      </div>
        `
    const targetElement = document.querySelector(".Section2A.has-components")
    if (targetElement) {
      targetElement.insertAdjacentHTML("afterbegin", html)

      // list products:
      const productContainer = document.querySelector(".product-container")
      products.forEach((product) => {
        const productCard = `
          <div class="card" data-id="${product.id}">
            <div class="content">
              <img src="${product.img}" alt="${
          product.name
        }" class="product-img"/>
              <span class="brand">${product.brand} - </span>
              <span class="name">${product.name}</span>
            </div>
            <div class="footer">
              <div class="orginal-price">${product.original_price} TL</div>
              <div class="price">
                <span class="price-main">${
                  String(product.price).split(".")[0]
                }</span>
                <span class="price-decimal">,${
                  String(product.price).split(".")[1] || "00"
                } TL</span>
              </div>
            </div>
          </div>
        `
        productContainer.insertAdjacentHTML("beforeend", productCard)
      })
    } else {
      console.error("ERROR: (.Section2A.has-components) NOT FOUND")
    }
  }

  const buildCSS = () => {
    const css = `
      .carousel-container {
          padding: 20px 15px;
          overflow: hidden;
          width: fit-content;
      }
      .carousel-container .title {
          font-family: Quicksand-semibold;
          font-size: 24px;
          font-weight: 500;
          text-transform: capitalize;
          color: #2b2f33;
          margin: 0;
      }
      .carousel-container .product-container {
          display: flex;
          gap: 16px;
          overflow-x: auto;
      }
      .carousel-container .product-container .card {
          width: 243px;
          height: 383px;
          border: 1px solid #eee;
          border-radius: 6px;
          padding: 10px;
          cursor: pointer;
          text-align: center;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
      }

      .carousel-container .product-container .card:hover {
          border: 1px solid #c2c2c2ff;
      }

      .carousel-container .product-container .content {
          font-size: 12px;
          font-family: Quicksand-medium;
          text-align: left;
      }

      .carousel-container .product-container .brand {
          font-weight:bold;
      }

      .carousel-container .product-container .card img {
          width: 223px;
          height: 203px;
          object-fit: cover;
          object-position: center;
      }
      .carousel-container .product-container .orginal-price {
          font-size: 12px;
          font-weight: 600;
          color: #A2B1BC;
          text-align: left;
      }

      .carousel-container .product-container .price {
          font-size: 20px;
          font-weight: 600;
          color: #2B2F33;
          text-align: left;
      }

      .carousel-container .product-container .price-decimal {
          font-size: 14px;
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
