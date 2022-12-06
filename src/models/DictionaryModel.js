const mongoose = require("mongoose")
const MiniSearch = require("minisearch")

const DictionarySchema = new mongoose.Schema({
    indice: { type: String, required: true },
    language: String,
    words: { type: Array }
})

const DictionaryModel = mongoose.model("Dictionary", DictionarySchema)



class DictBd {
    constructor(searchInput) {
        this.searchInput = searchInput
        this.errors=[]
    }

    async search(mode, callback) {
       
        if (mode === "pt") {
            this.validate()
            if (this.errors.length>0) return
            const indice =this.searchInput[0].toUpperCase()
            const result = await DictionaryModel.findOne({ indice: indice,"words.portuguese":this.searchInput })
            if(result===null){
                this.errors.push("Palavra não encontrada Por favor verifique se a palavra foi inserida correctamente")
                return
            }
            
            const word_list = result.words
            return callback(word_list, this.searchInput)
        }else if (mode === "ub"){
            this.validate()
            if (this.errors.length>0) return
            const result = await DictionaryModel.find({ "words.umbundu":this.searchInput})
            console.log(result)
            if(result.length<1){
                this.errors.push("Palavra não encontrada Por favor verifique se a palavra foi inserida correctamente")
                return
            }
            const word_list = result[0].words
            return callback(word_list, this.searchInput)
        }

       
    }
    validate(){
        if (this.searchInput.length > 20) return this.errors.push("Insira uma palavra válida")
        if (this.searchInput.length < 2) return this.errors.push("Insira uma palavra válida")
    }
    
}
module.exports = DictBd
