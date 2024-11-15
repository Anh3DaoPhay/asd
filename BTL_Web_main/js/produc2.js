const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});
const moneyFormat = Intl.NumberFormat("es-ES");
const productData = [
  {
    productName: "Radeon™ RX 6800 XT GAMING OC PRO 16G",
    productPrice: 15000000,
    productImage: "c1",
    state: 0,
  },
  
  {
    productName: "Radeon™ RX 7900 XTX GAMING OC 24G",
    productPrice: 10000000,
    productImage: "c4",
    productDescription: "",
    state: 1,
  },
  {
    productName: "AI TOP 100E SSD 1TB",
    productPrice: 20000000,
    productImage: "1",
    state: 0,
  },
  {
    productName: "GIGABYTE Gen4 4000E SSD 1TB",
    productPrice: 15000000,
    productImage: "2",
    state: 0,
  },
  {
    productName: "AORUS ELITE P850W 80+ Platinum Modular PCIe 5.0",
    productPrice: 25000000,
    productImage: "3",
    state: 0,
  },
  {
    productName: "AORUS C300 GLASS",
    productPrice: 12000000,
    productImage: "6",
   state: 1,
  },
  {
    productName: "AORUS MOUSE M9",
    productPrice: 20000000,
    productImage: "mouse",
    state: 0,
  },
  {
    productName: "AORUS KEYBOARD M16E",
    productPrice: 20000000,
    productImage: "bp",
    state: 0,
  },
];

$(document).ready(function () {
  let productList = "";
  productData.forEach((item) => {
    productList += `<div class="main__product__item m-4">
         <div class="main__product__item__top">
             <img class="main__product__item__top--image" src="../assets/imgs/products/${
               item.productImage
             }.png">
         </div>
         <div class="main__product__item__bottom">
             <span class="main__product__item__bottom__productName">${
               item.productName
             }</span>
             <span class="main__product__item__bottom__productPrice">${moneyFormat.format(
               item.productPrice
             )}₫</span>
             <span class="main__product__item__bottom__addProduct"> Add to Cart
         </div>
     </div>`;
    $(".main__product").html("");
    $(".main__product").html(productList);

    
  });
  
  $(".main__product").on("click", ".main__product__item__top", function () {
    productData.find((item) => {
      if (
        item.productName ===
        $(this)
          .parent()
          .find(".main__product__item__bottom__productName")
          .text()
      ) {
        localStorage.setItem("currentProduct", JSON.stringify(item));
        window.location.href = "productDetail.html";
      }
    });
  });
  $(".main__product").on(
    "click",
    ".main__product__item__bottom__addProduct",
    function () {
      productData.find((item) => {
        if (
          item.productName ===
          $(this)
            .parent()
            .find(".main__product__item__bottom__productName")
            .text()
        ) {
          const cartCount = localStorage.getItem("cartCount");
          const newCartCount = cartCount ? parseInt(cartCount) + 1 : 1;
          const cart = localStorage.getItem("cartList");
          let newCart = cart ? JSON.parse(cart) : [];
          const foundItem = newCart.find(
            (element) => item.productName === element.productName
          );
          if (foundItem === undefined) {
            Toast.fire({
              icon: "success",
              title: "Đã thêm sản phẩm vào giỏ hàng!",
            });
            localStorage.setItem("cartCount", newCartCount);
            $(".header__iconBox__cartCount").text(newCartCount);
            newCart.push(item);
            localStorage.setItem("cartList", JSON.stringify(newCart));
          } else {
            Toast.fire({
              icon: "error",
              title: "Sản phẩm đã có trong giỏ hàng!",
            });
          }
        }
      });
    }
  );

  const searchValue = localStorage.getItem("searchValue");
  if (searchValue) {
    $(".main__product__item__bottom__productName").each(function () {
      if ($(this).text().toLowerCase().includes(searchValue.toLowerCase())) {
        $(this).parent().parent().show();
      } else {
        $(this).parent().parent().hide();
      }
    });
    localStorage.removeItem("searchValue");
  }
});
