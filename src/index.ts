import packageFile from './../package.json'  assert { type: 'json' }
import figlet from 'figlet'

console.log(figlet.textSync(packageFile.name))
