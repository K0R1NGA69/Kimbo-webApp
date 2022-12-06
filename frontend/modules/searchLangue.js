export function changeSearchLangue() {
    let selectLangue = document.querySelector(".search-mode");
    const searchForm = document.querySelector(".search-form")
    let selected = selectLangue.value;
    searchForm.action = `/search/${selected}`
    selectLangue.addEventListener("change", (event) => {
        selected = selectLangue.value;
        if (selected == "pt") {
            searchForm.action = "/search/pt"
        } else if(selected=="ub") {
            searchForm.action = "/search/ub"
        }
    })

}

