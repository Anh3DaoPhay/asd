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
    productName: "Mainboard Gigabyte Z790",
    productPrice: 4000000,
    productImage: "mb1",
    state: 0,
  },
  {
    productName: "Mainboard Z890 AORUS ELITE ICE",
    productPrice: 5990000,
    productImage: "mb2",
    state: 1,
  },
  {
    productName: "Mainboard X870 GAMING WIFI6",
    productPrice: 8000000,
    productImage: "mb3",
    state: 1,
  },
  {
    productName: "MZ890 GIGABYTE WIFI6E",
    productPrice: 3200000,
    productImage: "mb4",

    state: 1,
  },
  {
    productName: "GIGABYTE H610M D3W DDR4",
    productPrice: 100000,
    productImage: "mb5",
    state: 0,
  },
  {
    productName: "GIGABYTE A620M SH20",
    productPrice: 4000000,
    productImage: "mb6",
    state: 0,
  },
  {
    productName: "AORUS Gen5 AIC Adaptor",
    productPrice: 5990000,
    productImage: "14",
    state: 1,
  },
  {
    productName: "GIGABYTE Memory 8GB (1x8GB) 2666MHz",
    productPrice: 15000000,
    productImage: "13",
    state: 1,
  },
  {
    productName: "AORUS C700 GLASS",
    productPrice: 30000000,
    productImage: "5",
    state: 0,
  },
  {
    productName: "AORUS C300 GLASS",
    productPrice: 12000000,
    productImage: "6",
    state: 1,
  },
  {
    productName: "AORUS RGB Memory DDR4 16GB (2x8GB) 3733MT/s (With Demo Kit)",
    productPrice: 5000000,
    productImage: "7",
    state: 1,
  },
  {
    productName: "Radeon™ RX 6800 XT GAMING OC PRO 16G",
    productPrice: 15000000,
    productImage: "c1",
    state: 0,
  },
  {
    productName: "GeForce RTX™ 4080 SUPER",
    productPrice: 4000000,
    productImage: "c2",
    state: 1,
  },
  {
    productName: "AORUS Radeon™ RX 7900 XTX ELITE 24G",
    productPrice: 5000000,
    productImage: "c3",

    state: 1,
  },
  {
    productName: "Radeon™ RX 7900 XTX GAMING OC 24G",
    productPrice: 10000000,
    productImage: "c4",
    productDescription: "",
    state: 1,
  },
  {
    productName: "GV-R9NANO-4GD-B",
    productPrice: 20000000,
    productImage: "c6",
    state: 0,
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
];

$(document).ready(function () {
  const productDetail = JSON.parse(localStorage.getItem("currentProduct"));
  $(".main__productInfo__productImageWrapper img").attr(
    "src",
    `../assets/imgs/products/${productDetail.productImage}.png`
  );
  $(".main__productInfo__info__productName").text(productDetail.productName);
  $(".main__productInfo__info__state").text(
    productDetail.state === 1 ? "Còn hàng" : "Hết hàng"
  );
  $(".main__productInfo__info__productPrice").text(
    moneyFormat.format(productDetail.productPrice) + "₫"
  );
  $(".main__productDescription__des").text(productDetail.productDescription);

  $(".main__productInfo__info__addCart").on("click", function () {

    console.log("press")
    productData.find((item) => {
      if (item.productName === productDetail.productName) {
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
  });
});
