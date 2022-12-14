
const DictBd = require("../models/DictionaryModel")
const MiniSearch = require("minisearch")


let mode = "pt"
let searchResult = []
exports.search = async (req, res,next) => {
        const s_mode = req.params.data
        console.log(s_mode)
        const word = req.body.searchword.toLowerCase()
        const dictionary = new DictBd(word)
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOkEEEEEEy")
        async function searchPtUb(word_list, word) {
                let miniSearch = new MiniSearch({
                        idField: 'portuguese',
                        fields: ["portuguese", "umbundu"],
                        storeFields: ["portuguese", "umbundu"]
                })
                miniSearch.addAll(word_list)

                let results = await miniSearch.search(word)
                return results

        }
        async function searchUbPt(word_list, word) {
                let miniSearch = new MiniSearch({
                        idField: 'umbundu',
                        fields: ["portuguese", "umbundu"],
                        storeFields: ["portuguese", "umbundu"]
                })
                miniSearch.addAll(word_list)

                let results = await miniSearch.search(word)
                return results

        }

        if (s_mode === "pt") {
                console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOkEEEEEEy2")
                let result = await dictionary.search(s_mode, searchPtUb)
                console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOkEEEEEEy3")
                if (dictionary.errors.length > 0) {
                        req.flash('errors', dictionary.errors)
                        req.session.save(() => {
                                res.redirect("/")
                                return
                        })
                        return
                }
                result["0"].language = "pt"
                // await req.flash('result', result)
                console.log(result.match)
                searchResult = result
                
               return  res.redirect("/")
                // res.send({result})
                // req.session.save(() => {
                //         res.redirect("/")
                //         return
            
                // })
     

        }
        else {
                let result = await dictionary.search(s_mode, searchPtUb)
                if (dictionary.errors.length > 0) {
                        req.flash('errors', dictionary.errors)
                        req.session.save(() => {
                                res.redirect("/")
                                return
                        })
                        return
                }
                console.log(result)
                result["0"].language = "ub"
                searchResult = result
                return  res.redirect("/")
                // req.flash('result', result)
                // mode = "ub"
                // req.session.save(() => {
                //         res.redirect("/")
                // })

        }

}
exports.index = async (req, res) => {
        
        let data ={searchResult,mode}
        console.log(data)
        res.render("index", { data })

}
exports.ads = async (req, res) => {
        var path = require('path');
        var options = {
                root:path.join(__dirname, '../', '../'),
        };
        var fileName = 'ads.txt';
        res.sendFile(fileName, options)

}


