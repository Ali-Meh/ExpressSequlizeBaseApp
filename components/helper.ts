'use strict'
import _ from 'lodash'
import bcrypt from 'bcrypt';
export class Helper {
    static slugify(string:string) {
        if (!string || typeof string !== "string") {
            throw new Error('string is required and type is String')
        }
        let slug = string.replace(/\s/g, '-')
        slug = slug.replace(/-{2,}/g, '-')
        slug = slug.replace(/-$/, '')
        slug.trim()
        return slug;
    }
    static async Hash(password:string) {
        const salt=await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    };
    static async Compare (password:string,Hash:string) {
        // console.log(Hash);
        return await bcrypt.compare(password, Hash);   
    }

    static formatMobile(mobile:string) {
        return mobile.substr(mobile.length - 10)
    }
}

export function NationalCodeCheck(national_code:string){


    if (
        !/^\d{10}$/.test(national_code)
        || national_code === '0000000000'
        || national_code === '1111111111'
        || national_code === '2222222222'
        || national_code === '3333333333'
        || national_code === '4444444444'
        || national_code === '5555555555'
        || national_code === '6666666666'
        || national_code === '7777777777'
        || national_code === '8888888888'
        || national_code === '9999999999'
      ) {
        return false
      }

      national_code = (typeof national_code === 'number') ? String(national_code) : national_code

    
      const check = parseInt(national_code[9], 10)
      let sum = 0,  i
      for (i = 0; i < 9; i++) {
        sum += parseInt(national_code[i], 10) * (10 - i);
      }
      sum %= 11;
    
    return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);

}

export default Helper;
