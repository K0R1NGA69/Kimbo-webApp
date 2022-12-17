export function changeSearchLangue() {
    let selectLangue = document.querySelector(".search-mode");
    const searchForm = document.querySelector(".search-form")
    let selected = selectLangue.value;
    data = {mode:selected}
    searchForm.action = `/search/${data}`
    selectLangue.addEventListener("change", (event) => {
        selected = selectLangue.value;
        if (selected == "pt") {
            searchForm.action = `/search/${data}`
        } else if(selected=="ub") {
            searchForm.action = `/search/${data}`
        }
    })

}

