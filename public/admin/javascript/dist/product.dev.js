"use strict";

// Thay doi trang thai cua san pham va gui ve database
var buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length) {
  var formChangeStatus = document.querySelector("#form-change-status");
  var dataPath = formChangeStatus.getAttribute("data-path"); // console.log(dataPath);

  buttonChangeStatus.forEach(function (button) {
    button.addEventListener("click", function () {
      var dataId = button.getAttribute("data-id");
      var dataStatus = button.getAttribute("data-status");
      var newStatus = dataStatus == "active" ? "inactive" : "active";
      var action = "".concat(dataPath, "/").concat(newStatus, "/").concat(dataId, "?_method=PATCH");
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
} // Click vao nut xoa se xoa 


var buttonsDelete = document.querySelectorAll("[button-delete");

if (buttonsDelete.length) {
  var formDeleteItem = document.querySelector("#form-delete-item");

  var _dataPath = formDeleteItem.getAttribute("data-path");

  buttonsDelete.forEach(function (button) {
    button.addEventListener("click", function () {
      dataId = button.getAttribute("data-id");
      var action = "".concat(_dataPath, "/").concat(dataId, "?_method=DELETE");
      formDeleteItem.action = action;
      formDeleteItem.submit();
    });
  });
}