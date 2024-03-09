// console.log("Pham Trung Thien 2003")
// Tim theo kieu : Tat ca, hoat dong, dung hoat dong
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
                console.log(status)
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
            // console.log(url);
        });
    });
}
//end button status

// form search
const formSearch = document.querySelector("#form-search");

if (formSearch) {
    // console.log("Thien ne ban");
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            // console.log(keyWord)
            url.searchParams.set("keyword", keyword);

        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}

// Pagination
const buttons = document.querySelectorAll("[button-pagination]");
// console.log(buttons);
let url = new URL(window.location.href);
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const currentPage = button.getAttribute("button-pagination");
        console.log(currentPage);
        url.searchParams.set("page", currentPage);
        window.location.href = url.href;
    })
})


// lấy ra table có chứa dữ liệu và nút check all
// const checkboxMulti = document.querySelector("[checkbox-multi]");
// // console.log(checkboxMulti);
// const checkAll = checkboxMulti.querySelector("input[name='checkall']");
// // console.log(checkAll)
// if (checkboxMulti) {
//     const buttonsId = document.querySelectorAll("input[name='id']")
//     checkAll.addEventListener("click", () => {
//         buttonsId.forEach(button => {
//             button.checked = checkAll.checked ? true : false;
//         })
//     })
//     buttonsId.forEach(button => {
//         button.addEventListener("click", () => {
//             const countClicked = checkboxMulti.querySelectorAll("input[name='id']:checked")
        //     if (countClicked.length == buttonsId.length) {
        //         checkAll.checked = true;
        //     } else {
        //         checkAll.checked = false;
        //     }
        // })
//     })
// }

// Bắt sự kiện cho ô áp dụng 
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // console.log(inputChecked.length)
        const type = e.target.elements.type.value;
        if(type == "delete-all"){
            const isConfirm = confirm("Bạn co chac chan muon xoa tat ca hay khong");
            if(!isConfirm){
                return;
            }
        }
        if(inputChecked) {
            let ids = []
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputChecked.forEach(input => {
                const id = input.value;
                if(type == "change-position"){
                    // Lấy ra position mới và id của sản phẩm để cập nhật lại 
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }else{
                    ids.push(id);
                }
            });
            inputIds.value = ids.join(",");
            formChangeMulti.submit();
            // const type = e.target.elements.type.value;
            // console.log(type);
        }
    })
    }
    // Nhớ mở mongodb compass để có database kết nối 
    // Nhớ mở mongodb compass để có thể kết nối tới database

    const showAlert = document.querySelector("[show-alert]");
    if(showAlert){
        const dataTime = showAlert.getAttribute("data-time");
        setTimeout(()=>{
            showAlert.classList.add("alert-hidden");
        },dataTime);
    }

//upload image 
const uploadImage = document.querySelector("[upload-image]");

if(uploadImage){
    // console.log(uploadImage);
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    // console.log(uploadImagePreview);
    uploadImageInput.addEventListener("change",(e) => {
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
            // const a = document.createElement("div");
            // a.innerHTML = 'x';
            // uploadImageInput.appendChild(a);
        }
    });
}

// End upload image
