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
    productName: "GeForce RTX™ 4080 SUPER",
    productPrice: 4000000,
    productImage: "c1",
    state: 0,
  },
  {
    productName: "GIGABYTE Gen4 4000E SSD 1TB",
    productPrice: 1000000,
    productImage: "2",
    state: 0,
  },
  {
    productName: "Mainboard Gigabyte Z790",
    productPrice: 4000000,
    productImage: "mb1",
    state: 1,
  },
  {
    productName: "AORUS Radeon™ RX 7900 XTX ELITE 24G",
    productPrice: 5000000,
    productImage: "c3",
    state: 1,
  },
];

const topSaleData = [
  {
    productName: "GeForce RTX™ 4080 SUPER",
    productPrice: 4000000,
    productImage: "c1",
  },
  {
    productName: "Mainboard Gigabyte Z790",
    productPrice: 4000000,
    productImage: "mb1",
  },
  {
    productName: "GIGABYTE Gen4 4000E SSD 1TB",
    productPrice: 1000000,
    productImage: "2",
    state: 0,
  },
  
  {
    productName: "AORUS Radeon™ RX 7900 XTX ELITE 24G",
    productPrice: 5000000,
    productImage: "c3",
    state: 1,
  },


];

$(document).ready(function () {
  let productList = "";
  topSaleData.forEach((item) => {
    productList += `<div class="main__product__item m-3">
         <div class="main__product__item__top">
             <img class="main__product__item__top--image" src="../assets/imgs/products/${
               item.productImage
             }.png">z
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
  });
  $(".main__product").html(productList);
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
      console.log("press")
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
});
