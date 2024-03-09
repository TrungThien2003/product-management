// Thay doi trang thai cua san pham va gui ve database
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length) {

    const formChangeStatus = document.querySelector("#form-change-status");
    const dataPath = formChangeStatus.getAttribute("data-path");
    // console.log(dataPath);

    buttonChangeStatus.forEach(button => {

        button.addEventListener("click", () => {
            const dataId = button.getAttribute("data-id");
            const dataStatus = button.getAttribute("data-status")

            let newStatus = dataStatus == "active" ? "inactive" : "active";
            const action = `${dataPath}/${newStatus}/${dataId}?_method=PATCH`;

            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// Click vao nut xoa se xoa 
const buttonsDelete = document.querySelectorAll("[button-delete");
if (buttonsDelete.length) {
    const formDeleteItem = document.querySelector("#form-delete-item")
    const dataPath = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            dataId = button.getAttribute("data-id")
            const action = `${dataPath}/${dataId}?_method=DELETE`;
            formDeleteItem.action = action;
            formDeleteItem.submit();

        })
    })
}