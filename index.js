#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');

const tmplDir = path.join(__dirname, 'templates');
const destDir = process.cwd();

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name'
    }
]).then(answer => {
    fs.readdir(tmplDir, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            ejs.renderFile(path.join(tmplDir, file), answer, (err, result) => {
                if (err) {
                    throw err;
                }
                fs.writeFileSync(path.join(destDir, file), result);
                console.log(result);
            })
        })
    })
})