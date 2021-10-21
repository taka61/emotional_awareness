const Enquirer = require('enquirer')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
require('date-utils')

const dt = new Date()
let format = dt.toFormat('YYYY年MM月DD日')

const Feeling = [
    '😄',
    '🙂',
    '🙁',
    '😩'
]


const displayRandomPhrases = () => {
    let words = fs.readFileSync(`quotes/a.txt`, 'utf-8')
    let word = words.split('/')
    let phrases = word.slice(0, 14)
    let x = Math.floor(Math.random() * phrases.length)
    setTimeout(() => console.log(phrases[x]), 1000)
}

const choseMyFeeling = () => {
    (async () => {
        const question1 = {
            type: 'select',
            name: 'feeling',
            message: '今日の気分は？',
            choices: Feeling
        };
        const answer1 = await Enquirer.prompt(question1)
        console.log(`なるほど！今日は${answer1.feeling}な気分なんだね〜`)
        console.log('そんなあなたに今日の言葉を届けます〜👀')

        if (`${answer1.feeling}` === '😄') {
            displayRandomPhrases()
        } else if (`${answer1.feeling}` === '🙂') {
            let words = fs.readFileSync(`quotes/b.txt`, 'utf-8')
            displayRandomPhrases()
        } else if (`${answer1.feeling}` === '🙁') {
            let words = fs.readFileSync(`quotes/c.txt`, 'utf-8')
            displayRandomPhrases()
        } else {
            let words = fs.readFileSync(`quotes/d.txt`, 'utf-8')
            displayRandomPhrases()
        }
    })();
}

const saveMyFeeling = () => {
    (async () => {
        const question2 = {
            type: 'select',
            name: 'feeling',
            message: '保存したい気分は？',
            choices: Feeling
        };
        const answer2 = await Enquirer.prompt(question2);
        fs.writeFileSync(`${format}.txt`, `${format}の気分: ${answer2.feeling}`)

        const question3 = {
            type: 'select',
            name: 'confirmation',
            message: '何か一言メモを残したい？',
            choices: ['Yes', 'No']
        };
        const answer3 = await Enquirer.prompt(question3);
        if (`${answer3.confirmation}` === 'Yes') {
            console.log(`OK！${answer3.confirmation}なら1行メモを残そう！入力をどうぞ！`)
            process.stdin.resume();
            process.stdin.setEncoding('utf8')

            let reader = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
            reader.on('line', (input) => {
                fs.appendFile(`${format}.txt`, '\n' + input, (err) => {
                    if (err) throw err
                    console.log(`『${input}』を保存しました`)
                })
            })
        } else {
            console.log('また今度〜👋')
        }
    })();
}

if (argv.save) {
    saveMyFeeling()
} else {
    choseMyFeeling()
}
