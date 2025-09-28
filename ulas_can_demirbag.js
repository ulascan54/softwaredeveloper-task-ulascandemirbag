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
    setEvents(products)
  }

  const fetchProducts = async () => {
    try {
      const isCached = localStorage.getItem("products")
      if (isCached) {
        console.log("PRODUCTS FETCHED FROM LOCAL STORAGE")
        return JSON.parse(isCached)
      }

      const response = await fetch(ProdcutsUrl)
      if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`)
      const data = await response.json()

      localStorage.setItem("products", JSON.stringify(data))
      console.log("PRODUCTS FETCHED & CACHED TO LOCAL STORAGE")
      return data
    } catch (error) {
      console.log("FETCH ERROR: PRODUCTS NOT FOUND", error)
      return []
    }
  }

  const buildHTML = (products) => {
    const html = `
      <div class="carousel-container">
        <h2 class="title">Beğenebileceğinizi düşündüklerimiz</h2>
        <button class="arrow left">
          <i class="toys-icon toys-icon-arrow-left"></i>
        </button>
        <div class="product-container"></div>
        <button class="arrow right">
          <i class="toys-icon toys-icon-arrow-right"></i>
        </button>
      </div>
        `
    const targetElement = document.querySelector(".Section2A.has-components")
    if (targetElement) {
      targetElement.insertAdjacentHTML("afterbegin", html)

      // list products:
      const productContainer = document.querySelector(".product-container")
      products.forEach((product) => {
        let priceHtml = ""
        let originalHtml = ""
        //calculate discount amount
        if (product.price === product.original_price) {
          priceHtml = `
          <div class="price">
            <span class="price-main">${
              String(product.price).split(".")[0]
            }</span>
            <span class="price-decimal">,${
              String(product.price).split(".")[1] || "00"
            } TL</span>
          </div>
        `
        } else {
          const discount = Math.abs(
            Math.round(100 - (product.price / product.original_price) * 100)
          )

          originalHtml = `
          <div class="orginal-price">
            ${product.original_price} TL <span class="discount">%${discount}</span>
          </div>`

          priceHtml = `
          <div class="price-active">
            <span class="price-main">${
              String(product.price).split(".")[0]
            }</span>
            <span class="price-decimal">,${
              String(product.price).split(".")[1] || "00"
            } TL</span>
          </div>
        `
        }

        const productCard = `
          <div class="card" data-id="${product.id}">
            <div class="content">
              <div class="heart" data-id="${product.id}">♡</div>
              <img src="${product.img}" alt="${product.name}" class="product-img"/>
              <span class="brand">${product.brand} - </span>
              <span class="name">${product.name}</span>
            </div>
            <div class="footer">
                ${originalHtml}
                ${priceHtml}
            </div>
          </div>
        `
        productContainer.insertAdjacentHTML("beforeend", productCard)
      })
      let favorites = JSON.parse(localStorage.getItem("favorites")) || []
      favorites.forEach((id) => {
        const heart = document.querySelector(`.heart[data-id="${id}"]`)
        if (heart) {
          heart.classList.add("active")
          heart.textContent = "♥"
        }
      })
    } else {
      console.error("ERROR: (.Section2A.has-components) NOT FOUND")
    }
  }

  const buildCSS = () => {
    const css = `
      .carousel-container {
          position: relative;
          padding: 20px 15px;
          width: 100%;
          max-width: 1400px; 
          margin: 0 auto;
          box-sizing: border-box;
          overflow: hidden;
      }
      .carousel-container .title {
          font-family: Quicksand-semibold;
          font-size: 24px;
          font-weight: 500;
          text-transform: capitalize;
          color: #2b2f33;
          margin: 0 0 10px 0;
      }
      .carousel-container .product-container {
          padding: 20px 0;
          display: grid;
          grid-auto-flow: column;       
          grid-auto-columns: 19%;       
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          scrollbar-width: none;
      }
      .carousel-container .product-container::-webkit-scrollbar {
          display: none;
      }
      .carousel-container .product-container .card {
          position: relative;
          width: 100%;
          min-height: 360px;
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
          border: 1px solid #ccc;
      }
      .carousel-container .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border: #ccc solid 1px;
          background: #fff;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
      }
      .carousel-container .arrow i{
          width: 14px;
          height: 14px;
      }
      .carousel-container .arrow.left {
          left: 0px;
      }
      .carousel-container .arrow.right {
          right: 0px;
      }

      .carousel-container .heart {
          position: absolute;
          top: 3px;
          right: 3px;
          font-size: 15px;
          cursor: pointer;
          user-select: none;
          color: #ccc;
          transition: color 0.3s;
      }
      .carousel-container .heart:hover {
          color: orange;
      }
      .carousel-container .heart.active {
          color: orange;
      }

      .carousel-container .content {
          font-size: 12px;
          font-family: Quicksand-medium;
          text-align: left;
      }
      .carousel-container .brand {
          font-weight: bold;
      }
      .carousel-container .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          object-position: center;
      }
      .carousel-container .orginal-price {
          font-size: 12px;
          font-weight: 600;
          color: #A2B1BC;
          text-align: left;
      }
      .carousel-container .price {
          font-size: 20px;
          font-weight: 600;
          color: #2B2F33;
          text-align: left;
      }
      .carousel-container .price-active {
          font-size: 20px;
          font-weight: 600;
          color: #00A365;
          text-align: left;
      }
      .carousel-container .price-decimal {
          font-size: 14px;
      }
      .carousel-container .discount {
          font-size: 12px;
          font-weight: 500;
          background-color: #00A365;
          border-radius: 16px;
          color: #fff;
          padding: 0 4px;
          margin-left: 6px;
      }
      @media (max-width: 1200px) {
          .carousel-container .product-container {
              grid-auto-columns: 23%;
          }
      }
      @media (max-width: 992px) {
          .carousel-container .product-container {
              grid-auto-columns: 30%;
          }
      }
      @media (max-width: 768px) {
          .carousel-container .product-container {
              grid-auto-columns: 48%;
          }
          .carousel-container .arrow {
              width: 24px;
              height: 24px;
              top: 45%;
          }
          .carousel-container .arrow.left {
              left: 10px;
          }
          .carousel-container .arrow.right {
              right: 10px;
          }
          .carousel-container .arrow i {
              width: 12px;
              height: 12px;
          }
      }
    `

    const styles = document.createElement("style")
    styles.classList.add("carousel-style")
    styles.textContent = css
    document.head.appendChild(styles)
  }

  const setEvents = (products) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || []

    favorites.forEach((id) => {
      const heart = document.querySelector(`.heart[data-id="${id}"]`)
      if (heart) {
        heart.classList.add("active")
        heart.textContent = "♥"
      }
    })

    document.addEventListener("click", (e) => {
      const card = e.target.closest(".card")
      if (
        card &&
        !e.target.classList.contains("heart") &&
        !card.dataset.dragged
      ) {
        const product_id = card.getAttribute("data-id")
        const product = products.find((item) => item.id == product_id)
        if (product) {
          window.open(product.url, "_blank")
        }
      }

      const heart = e.target.closest(".heart")
      if (heart) {
        e.stopPropagation()
        const id = heart.getAttribute("data-id")
        if (heart.classList.contains("active")) {
          heart.classList.remove("active")
          heart.textContent = "♡"
          favorites = favorites.filter((fid) => fid != id)
        } else {
          heart.classList.add("active")
          heart.textContent = "♥"
          favorites.push(id)
        }
        localStorage.setItem("favorites", JSON.stringify(favorites))
      }
    })

    const productContainer = document.querySelector(".product-container")
    const previousButton = document.querySelector(".arrow.left")
    const nextButton = document.querySelector(".arrow.right")

    if (previousButton && nextButton && productContainer) {
      previousButton.addEventListener("click", () => {
        productContainer.scrollBy({ left: -260, behavior: "smooth" })
      })
      nextButton.addEventListener("click", () => {
        productContainer.scrollBy({ left: 260, behavior: "smooth" })
      })
    }

    let isMauseDown = false
    let startingPointX
    let scrollLeft
    let isTouch = false

    productContainer.addEventListener("mousedown", (e) => {
      isMauseDown = true
      isTouch = false
      startingPointX = e.pageX - productContainer.offsetLeft
      scrollLeft = productContainer.scrollLeft
    })

    productContainer.addEventListener("mouseleave", () => {
      isMauseDown = false
    })

    productContainer.addEventListener("mouseup", () => {
      isMauseDown = false
      setTimeout(() => {
        isTouch = false
      }, 50)
    })

    productContainer.addEventListener("mousemove", (e) => {
      if (!isMauseDown) return
      e.preventDefault()
      const currentX = e.pageX - productContainer.offsetLeft
      const distanceFromStart = (currentX - startingPointX) * 2
      if (Math.abs(distanceFromStart) > 10) {
        isTouch = true
        const card = e.target.closest(".card")
        if (card) card.dataset.dragged = true
      }
      productContainer.scrollLeft = scrollLeft - distanceFromStart
    })

    productContainer.addEventListener("click", (e) => {
      const card = e.target.closest(".card")
      if (card) {
        setTimeout(() => {
          delete card.dataset.dragged
        }, 100)
      }
    })
  }

  init()
})()
