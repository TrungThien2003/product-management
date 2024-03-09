"use strict";

// console.log("Pham Trung Thien 2003")
// Tim theo kieu : Tat ca, hoat dong, dung hoat dong
var buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  var _url = new URL(window.location.href);

  buttonStatus.forEach(function (button) {
    button.addEventListener("click", function () {
      var status = button.getAttribute("button-status");

      if (status) {
        _url.searchParams.set("status", status);

        console.log(status);
      } else {
        _url.searchParams["delete"]("status");
      }

      window.location.href = _url.href; // console.log(url);
    });
  });
} //end button status
// form search


var formSearch = document.querySelector("#form-search");

if (formSearch) {
  // console.log("Thien ne ban");
  var _url2 = new URL(window.location.href);

  formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    var keyword = e.target.elements.keyword.value;

    if (keyword) {
      // console.log(keyWord)
      _url2.searchParams.set("keyword", keyword);
    } else {
      _url2.searchParams["delete"]("keyword");
    }

    window.location.href = _url2.href;
  });
} // Pagination


var buttons = document.querySelectorAll("[button-pagination]"); // console.log(buttons);

var url = new URL(window.location.href);
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var currentPage = button.getAttribute("button-pagination");
    console.log(currentPage);
    url.searchParams.set("page", currentPage);
    window.location.href = url.href;
  });
}); // lấy ra table có chứa dữ liệu và nút check all

var checkboxMulti = document.querySelector("[checkbox-multi]"); // console.log(checkboxMulti);

var checkAll = checkboxMulti.querySelector("input[name='checkall']"); // console.log(checkAll)

if (checkboxMulti) {
  var buttonsId = document.querySelectorAll("input[name='id']");
  checkAll.addEventListener("click", function () {
    buttonsId.forEach(function (button) {
      button.checked = checkAll.checked ? true : false;
    });
  });
  buttonsId.forEach(function (button) {
    button.addEventListener("click", function () {
      var countClicked = checkboxMulti.querySelectorAll("input[name='id']:checked");

      if (countClicked.length == buttonsId.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
} // Bắt sự kiện cho ô áp dụng 


var formChangeMulti = document.querySelector("[form-change-multi]");

if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", function (e) {
    e.preventDefault();
    var checkboxMulti = document.querySelector("[checkbox-multi]");
    var inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked"); // console.log(inputChecked.length)

    var type = e.target.elements.type.value;

    if (type == "delete-all") {
      var isConfirm = confirm("Bạn co chac chan muon xoa tat ca hay khong");

      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked) {
      var ids = [];
      var inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach(function (input) {
        var id = input.value;

        if (type == "change-position") {
          // Lấy ra position mới và id của sản phẩm để cập nhật lại 
          var position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push("".concat(id, "-").concat(position));
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(",");
      formChangeMulti.submit(); // const type = e.target.elements.type.value;
      // console.log(type);
    }
  });
} // Nhớ mở mongodb compass để có database kết nối 
// Nhớ mở mongodb compass để có thể kết nối tới database


var showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  var dataTime = showAlert.getAttribute("data-time");
  setTimeout(function () {
    showAlert.classList.add("alert-hidden");
  }, dataTime);
}