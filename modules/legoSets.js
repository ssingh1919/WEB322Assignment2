/*********************************************************************************
*  WEB322 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Sukhpreet Singh
   Student ID: 140337221
   Date: 05-02-2024
*
********************************************************************************/
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = [];

initialize = () => {
    let i = 0;
    return new Promise((resolve, reject) => {
        setData.forEach((e) => {
            sets[i] = e;
            let themeObj = themeData.find(({id}) => id === sets[i].theme_id);
            if (themeObj) {
                sets[i].theme = themeObj.name;
            }
            i++;
        });
        if (sets) {
            resolve(sets)
        }
    })
}

getAllSets = () => {
    return new Promise((resolve, reject) => {
        if (sets) {
            resolve(sets)
        }
    })
}

getSetByNum = (setNum) => {
    return new Promise((resolve, reject) => {
        let set = sets.find((obj) => obj.set_num === setNum);
        if (set) {
            resolve(set);
        }
        else {
            reject("Set Not Found");
        }
    })
}

getSetsByTheme = (theme) => {
    return new Promise((resolve, reject) => {
        let set = sets.filter((e) => {
            return e.theme && e.theme.toLowerCase().includes(theme.toLowerCase());
        });
        if (set) {
            resolve(set)
        }
        else {
            reject("Set Not Found");
        }
    })
}

initialize();
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };