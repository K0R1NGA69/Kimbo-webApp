
const DictBd = require("../models/DictionaryModel")
const MiniSearch = require("minisearch")


let mode = "pt"

exports.search = async (req, res) => {
        const s_mode = req.params.mode
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
                req.flash('result', result)
                console.log(result)
                
                req.session.save(() => {
                        res.redirect("/")
            
                })
                

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
                req.flash('result', result)
                mode = "ub"
                req.session.save(() => {
                        res.redirect("/")
                })

        }

}
exports.index = async (req, res) => {
        res.render("index", { mode })

}
exports.ads = async (req, res) => {
        var path = require('path');
        var options = {
                root:path.join(__dirname, '../', '../'),
        };
        var fileName = 'ads.txt';
        res.sendFile(fileName, options)

}


