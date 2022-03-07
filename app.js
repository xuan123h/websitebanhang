$(document).ready(function () {
  $(".image-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false, // ko chuyen qua dc
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><box-icon name='skip-previous' ></box-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><box-icon name='skip-next'></box-icon></button>`,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          infinite: false,
        },
      },
    ],
  });
});

// infinite = true la no se chay vo tan

// Dialog
const addressbtn = document.querySelector("#address-form");
const addressclose = document.querySelector("#address-close");
addressbtn.addEventListener("click", function () {
  document.querySelector(".address-form").style.display = "flex";
});
addressclose.addEventListener("click", function () {
  document.querySelector(".address-form").style.display = "none";
});
// Filter
function changeProductList(type, element) {
  let tabs = document.getElementsByClassName("tab-item");
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.background = "#b14c38";
  }
  element.style.background = "#ee4d2d";
  document.getElementById(type).style.display = "block";
  switch (type) {
    case "trend":
      document.getElementById("new").style.display = "none";
      document.getElementById("best-sell").style.display = "none";
      document.getElementById("all").style.display = "none";
      break;
    case "new":
      document.getElementById("trend").style.display = "none";
      document.getElementById("best-sell").style.display = "none";
      document.getElementById("all").style.display = "none";
      break;
    case "best-sell":
      document.getElementById("new").style.display = "none";
      document.getElementById("trend").style.display = "none";
      document.getElementById("all").style.display = "none";
      break;
    case "all":
      document.getElementById("new").style.display = "none";
      document.getElementById("trend").style.display = "none";
      document.getElementById("best-sell").style.display = "none";
      break;
  }
}

// // test
const btn = document.querySelectorAll("button");
// console.log(btn)
btn.forEach(function (button, index) {
  // console.log(button,index)
  button.addEventListener("click", function (event) {
    var btnItem = event.target;
    var product = btnItem.parentElement;
    // console.log(product)
    var productImg = product.querySelector("img").src;
    var productName = product.querySelector("h3").innerText;
    var productPrice = product.querySelector("span").innerText;
    addcart(productPrice, productImg, productName);
    // console.log(productPrice,productName,productImg)
  });
});
function addcart(productPrice, productImg, productName) {
  var addtr = document.createElement("tr");
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".title");
    if (productT[i].innerHTML == productName) {
      alert(" Sản phẩm của bạn đã có trong giỏ hàng ");
      return;
    }
  }
  var trcontent =
    ' <tr><td style="display: flex;align-items: center;width:200px"><img style="width: 70px;" src="' +
    productImg +
    '" alt=""><span class="title">' +
    productName +
    '</span> </td><td><p><span class="prices" style="width:150px">' +
    productPrice +
    '</span><sup> đ </sup></p></td><td><input style=" width: 150px ;outline:none" type="number" value="1" min="1" ></td> <td style="cursor: pointer;"><span class="cart-delete"> Xóa</span></td><tr>';
  addtr.innerHTML = trcontent;
  var cartTable = document.querySelector("tbody");
  // console.log(cartTable)
  cartTable.append(addtr);
  deleteCart();
  carttotal();
}
// // totalprice
function carttotal() {
  var cartItem = document.querySelectorAll("tbody tr");
  var totalC = 0;
  // console.log(cartItem.length)
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input").value;
    // console.log(inputValue)
    var productPrice = cartItem[i].querySelector(".prices").innerHTML;
    // console.log(productPrice)
    //  inputValue*productPrice*1000
    totalC = totalC + inputValue * productPrice * 1000;
    // console.log(totalC)
  }
  var cartTotalA = document.querySelector(".price-total span");
  cartTotalA.innerHTML = totalC.toLocaleString("de-DE");
  inputchange();
}
// deletecart
function deleteCart() {
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".cart-delete");
    // console.log(productT)
    productT[i].addEventListener("click", function (event) {
      var cartDelete = event.target;
      var cartitemR = cartDelete.parentElement.parentElement;
      cartitemR.remove();
      carttotal();
      // console.log(cartitemR)
    });
  }
}
// số lượng thay đổi thì tiền thay đổi
function inputchange() {
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input");
    inputValue.addEventListener("change", function () {
      carttotal();
    });
  }
}
