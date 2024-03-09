"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Product = require("../../models/product.model");

var filterStatusHelpers = require("../../helpers/statusFilter");

var searchHelper = require("../../helpers/search");

var paginationHelpers = require("../../helpers/pagination.js");

var systemConfig = require("../../config/system.js");

module.exports.indexProduct = function _callee(req, res) {
  var find, countProducts, filterStatus, searchObject, objPagination, products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req);
          find = {
            deleted: false
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(Product.estimatedDocumentCount(find));

        case 4:
          countProducts = _context.sent;
          // Tu tao ra cac trang thai cua san pham
          filterStatus = filterStatusHelpers(req.query);
          searchObject = searchHelper(req); // Tim theo tu khoa

          if (req.query.status) {
            find.status = req.query.status;
          }

          if (searchObject.regex) {
            find.title = searchObject.regex;
          } // let keyword ="";
          // if(req.query.keyword){
          //     keyword = req.query.keyword;
          //     const regex = new RegExp(keyword,"i");
          //     find.title = regex;
          // }
          // Phan trang cho website


          objPagination = {
            currentPage: 1,
            limitItems: 4
          };
          paginationHelpers(objPagination, countProducts, req.query); // if(req.query.page){
          //     objPagination.currentPage = parseInt(req.query.page);
          // }
          // objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;
          // const countProducts = await Product.estimatedDocumentCount(find);
          // const totalPage = Math.ceil(countProducts/objPagination.limitItems);
          // objPagination.totalPage = totalPage;
          // console.log(totalPage);

          console.log(countProducts);
          _context.next = 14;
          return regeneratorRuntime.awrap(Product.find(find).limit(objPagination.limitItems).skip(objPagination.skip));

        case 14:
          products = _context.sent;
          // console.log(products);
          res.render("admin/pages/product/index", {
            products: products,
            filterStatus: filterStatus,
            keyword: searchObject.keyword,
            pagination: objPagination
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}; //PATCH : /admin/product/change-status/:status/:id


module.exports.changeStatus = function _callee2(req, res) {
  var status, id;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // res.send(`Hello Thie ${req.params.id} ${req.params.status}`)
          // console.log(req.params.id)
          // console.log(req.params.status)
          status = req.params.status;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, {
            status: status
          }));

        case 4:
          req.flash("success", "Cập nhật thành công");
          currentPage = parseInt(req.query.page); // res.send(typeof currentPage)

          res.redirect('back');

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // PATCH : change multi products


module.exports.changeMulti = function _callee3(req, res) {
  var type, ids, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, _item$split, _item$split2, id, position, newPos;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          type = req.body.type; // console.log(req.boy.type)

          ids = req.body.ids.split(",");
          _context3.t0 = type;
          _context3.next = _context3.t0 === "active" ? 6 : _context3.t0 === "inactive" ? 9 : _context3.t0 === "delete-all" ? 12 : _context3.t0 === "change-position" ? 15 : 44;
          break;

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: ids
            }
          }, {
            status: "active"
          }));

        case 8:
          return _context3.abrupt("break", 44);

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: ids
            }
          }, {
            status: "inactive"
          }));

        case 11:
          return _context3.abrupt("break", 44);

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(Product.updateMany({
            _id: {
              $in: ids
            }
          }, {
            deleted: true
          }));

        case 14:
          return _context3.abrupt("break", 44);

        case 15:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 18;
          _iterator = ids[Symbol.iterator]();

        case 20:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 29;
            break;
          }

          item = _step.value;
          _item$split = item.split("-"), _item$split2 = _slicedToArray(_item$split, 2), id = _item$split2[0], position = _item$split2[1];
          newPos = parseInt(position);
          _context3.next = 26;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, {
            position: newPos
          }));

        case 26:
          _iteratorNormalCompletion = true;
          _context3.next = 20;
          break;

        case 29:
          _context3.next = 35;
          break;

        case 31:
          _context3.prev = 31;
          _context3.t1 = _context3["catch"](18);
          _didIteratorError = true;
          _iteratorError = _context3.t1;

        case 35:
          _context3.prev = 35;
          _context3.prev = 36;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 38:
          _context3.prev = 38;

          if (!_didIteratorError) {
            _context3.next = 41;
            break;
          }

          throw _iteratorError;

        case 41:
          return _context3.finish(38);

        case 42:
          return _context3.finish(35);

        case 43:
          return _context3.abrupt("break", 44);

        case 44:
          res.redirect('back');

        case 45:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[18, 31, 35, 43], [36,, 38, 42]]);
};

module.exports.deleteItem = function _callee4(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Product.deleteOne({
            _id: id
          }));

        case 3:
          res.redirect('back');

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.createProduct = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render("admin/pages/product/create", {
            titlePage: "Thêm mới sản phẩm"
          });

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.createPost = function _callee6(req, res) {
  var countProduct, product;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          req.body.price = parseInt(req.body.price);
          req.body.discountPercentage = parseInt(req.body.discountPercentage);
          req.body.stock = parseInt(req.body.stock);

          if (!(req.body.position == "")) {
            _context6.next = 10;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(Product.countDocuments());

        case 6:
          countProduct = _context6.sent;
          req.body.position = countProduct + 1;
          _context6.next = 11;
          break;

        case 10:
          req.body.position = parseInt(req.body.position);

        case 11:
          req.body.thumbnail = "/uploads/".concat(req.file.filename); // console.log(req.body)

          product = new Product(req.body);
          _context6.next = 15;
          return regeneratorRuntime.awrap(product.save());

        case 15:
          res.redirect("".concat(systemConfig.prefixAdmin, "/product"));

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports.edit = function _callee7(req, res) {
  var find, product;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          // res.send("Hello world");
          find = {
            deleted: false,
            _id: req.params.id
          };
          _context7.next = 3;
          return regeneratorRuntime.awrap(Product.findOne(find));

        case 3:
          product = _context7.sent;
          // console.log(product);
          res.render("admin/pages/product/edit", {
            product: product
          });

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};

module.exports.editPatch = function _callee8(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          // console.log(req.body);
          // res.send("elool");
          id = req.params.id;
          req.body.price = parseInt(req.body.price);
          req.body.stock = parseInt(req.body.stock);
          req.body.discountPercentage = parseInt(req.body.discountPercentage);
          req.body.position = parseInt(req.body.position);

          if (req.file) {
            req.body.thumbnail = "uploads/".concat(req.file.filename);
          }

          _context8.prev = 6;
          _context8.next = 9;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: id
          }, req.body));

        case 9:
          req.flash("success", "Cập nhật thành công");
          _context8.next = 15;
          break;

        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](6);
          req.flash("error", "Cập nhật thất bại");

        case 15:
          res.redirect('back');

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[6, 12]]);
};

module.exports.detail = function (req, res) {
  res.send("hello Thiện nè ");
};