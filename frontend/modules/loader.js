export default function loading(div){
    var loader = document.getElementById(div)
    window.addEventListener("load",()=>{
        loader.style.display = "none"
    })
}
