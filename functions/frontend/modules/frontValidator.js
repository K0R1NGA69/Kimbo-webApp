
// Example starter JavaScript for disabling form submissions if there are invalid fields
export default function validator(formClass) {
    
    const form = document.querySelector(formClass)
    const feedback = document.querySelector(".feedback")
    const searchbox = document.querySelector(".searchword")
    const messages = []

    function checkValid() {
        console.log()
        if (searchbox.value.length < 2 || searchbox.value.length > 20) {
            messages.push("Por favor insira uma palvra válida")
            searchbox.style.borderColor = "red"
            feedback.style.color="red"
            return false
        }else{
            return true
        }
    }


    form.addEventListener('submit', function(event) {
        
        if (!checkValid()) {
            console.log("ok")
            event.preventDefault()
            event.stopPropagation()
            messages.forEach((error)=>{
                feedback.innerHTML = error 
            })
            return
        }
        console.log("error")
        
    }, false)
  
   
       
}












// export default class Validator {
//     constructor(formClass) {
//         this.form = document.querySelector(formClass)
//         this.feedback = document.querySelector(".feedback")
//         this.searchbox = document.querySelector(".searchbox")
//         this.messages = []
//     }




//     init(){
//         this.events()
//     }
//     checkValid() {

//         if (this.searchbox.length < 2 || this.searchbox.length>20) {
//             this.messages.push("Por favor insira uma palvra válida")
//             return false
//         }else{
//             return true
//         }
//     }



//     events(){
//         //const isValid = this.checkValid()
//         this.messages
//         this.form.addEventListener('submit', function(event) {
            
//             if (true) {
//                 console.log("ok")
//                 event.preventDefault()
//                 event.stopPropagation()
//                 this.messages.forEach((error)=>{
//                     this.feedback.innerHTML += error 
//                 })
                
//             }
    
            
            
//         }, false)
//     }
   
       
// }
