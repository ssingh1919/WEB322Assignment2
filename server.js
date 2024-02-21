/********************************************************************************

* WEB322 – Assignment 03

*

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

*

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

*

* Name: Sukhpreet Singh Student ID: 140337221 Date:19-02-2024

*

* Published URL: 

*

********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require('express');
const app = express();
const port=3000;

app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/home.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname+'/views/about.html');
});

app.get('/lego/sets', (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then((sets) => {
                res.json(sets);
            })
            .catch((error) => {
                res.status(404).send('Error: ' + error.message);
            });
    } else {
        legoData.getAllSets()
            .then((sets) => {
                res.json(sets);
            })
            .catch((error) => {
                res.status(404).send('Error: ' + error.message);
            });
    }
});

app.get('/lego/sets/:num', (req, res) => {
    const setNum = req.params.num;
    legoData.getSetByNum(setNum)
        .then((set) => {
            if (set) {
                res.json(set);
            } else {
                res.status(404).send('Lego set not found.');
            }
        })
        .catch((error) => {
            res.status(404).send('Error: ' + error.message);
        });
});

app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
