"use strict";

// Thay doi trang thai cua san pham va gui ve database
var buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.lenth) {
  console.log(buttonChangeStatus);
  buttonChangeStatus.forEach(function (button) {
    button.addEventListener("click", function () {
      var dataId = button.getAttribute("data-id");
      var dataStatus = button.getAttribute("data-status");
      console.log("".concat(dataId, " ").concat(dataStatus));
    });
  });
}