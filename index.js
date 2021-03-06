#!/usr/bin/env node

const Enquirer = require('enquirer')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const userHome = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
require('date-utils')

const dt = new Date()
const format = dt.toFormat('YYYYๅนดMMๆDDๆฅ')

const Feeling = [
  '๐',
  '๐',
  '๐',
  '๐ฉ'
]

const choseMyFeeling = () => {
  (async () => {
    const question1 = {
      type: 'select',
      name: 'feeling',
      message: 'ไปๆฅใฎๆฐๅใฏ๏ผ',
      choices: Feeling
    }
    const answer1 = await Enquirer.prompt(question1)
    console.log(`ใชใใปใฉ๏ผไปๆฅใฏ${answer1.feeling}ใชๆฐๅใชใใ ใญใ`)
    console.log('ใใใชใใชใใซไปๆฅใฎ่จ่ใๅฑใใพใใ๐')

    if (`${answer1.feeling}` === '๐') {
      const words = fs.readFileSync(__dirname + '/quotes/a.txt', 'utf-8')
      const word = words.split('/')
      const phrases = word.slice(0, 14)
      const x = Math.floor(Math.random() * phrases.length)
      setTimeout(() => console.log(phrases[x]), 1000)
    } else if (`${answer1.feeling}` === '๐') {
      const words = fs.readFileSync(__dirname + '/quotes/b.txt', 'utf-8')
      const word = words.split('/')
      const phrases = word.slice(0, 14)
      const x = Math.floor(Math.random() * phrases.length)
      setTimeout(() => console.log(phrases[x]), 1000)
    } else if (`${answer1.feeling}` === '๐') {
      const words = fs.readFileSync(__dirname + '/quotes/c.txt', 'utf-8')
      const word = words.split('/')
      const phrases = word.slice(0, 14)
      const x = Math.floor(Math.random() * phrases.length)
      setTimeout(() => console.log(phrases[x]), 1000)
    } else {
      const words = fs.readFileSync(__dirname + '/quotes/d.txt', 'utf-8')
      const word = words.split('/')
      const phrases = word.slice(0, 14)
      const x = Math.floor(Math.random() * phrases.length)
      setTimeout(() => console.log(phrases[x]), 1000)
    }
  })()
}

const saveMyFeeling = () => {
  (async () => {
    const question2 = {
      type: 'select',
      name: 'feeling',
      message: 'ไฟๅญใใใๆฐๅใฏ๏ผ',
      choices: Feeling
    }
    const answer2 = await Enquirer.prompt(question2)

    if (!fs.existsSync(`${userHome}/emotional_awareness`)) {
      fs.mkdirSync(`${userHome}/emotional_awareness`)
    } else {
      return
    }

    fs.writeFileSync(`${userHome}/emotional_awareness/${format}.txt`, `${format}ใฎๆฐๅ: ${answer2.feeling}`)

    const question3 = {
      type: 'select',
      name: 'confirmation',
      message: 'ไฝใไธ่จใกใขใๆฎใใใ๏ผ',
      choices: ['Yes', 'No']
    }
    const answer3 = await Enquirer.prompt(question3)
    if (`${answer3.confirmation}` === 'Yes') {
      console.log(`OK๏ผ${answer3.confirmation}ใชใ1่กใกใขใๆฎใใ๏ผๅฅๅใใฉใใ๏ผ`)
      process.stdin.resume()
      process.stdin.setEncoding('utf8')

      const reader = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })
      reader.on('line', (input) => {
        fs.appendFile(`${userHome}/emotional_awareness/${format}.txt`, '\n' + input, (err) => {
          if (err) throw err
          console.log(`ใ${input}ใใไฟๅญใใพใใ`)
        })
      })
    } else {
      console.log('ใพใไปๅบฆใ๐')
    }
  })()
}

if (argv.s) {
  saveMyFeeling()
} else {
  choseMyFeeling()
}
