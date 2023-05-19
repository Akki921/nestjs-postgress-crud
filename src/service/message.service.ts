var PropertiesReader = require('properties-reader');
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { getProperties } from 'properties-file';
import { TranslateOptions } from './tranlation.service';

// var properties=PropertiesReader('src/resources/en/message.properties')
var properties;
let storeData = new Set();
export class Messages {
  async get(key, options?: TranslateOptions): Promise<any> {
    let prop = await this.load(options['lang']);
    console.log('prop', prop);

    var message = prop[key];
    const keys = Object.keys(options.args);
    for (let index = 0; index < keys.length; index++) {
      message = message.replace(`{${keys[index]}}`, options.args[keys[index]]);
    }
    console.log('final message from get', message);
    return message;
  }
  async load(filename): Promise<any> {
    try {
      var path = `src/resources/messages_${filename}.properties`;
    console.log('path',path);
    
      if (!existsSync(path)) {
        console.log('file not exists');
      }
      if (!(storeData.size > 0)) {
        properties = getProperties(readFileSync(path));
        storeData.add(properties);
        console.log('storeData', storeData);
      }
      storeData = properties;
      return storeData;
    } catch (error) {
      return error;
    }
  }
}
const messages = new Messages();
messages.get('ADD', {
  lang: 'fr_FR',
  args: { name: 'Akshay' },
});

// console.log(priclipe.message('ENGLISH'));
