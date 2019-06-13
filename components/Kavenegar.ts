'use strict'

import axios from 'axios'
import logger from '../components/logger'

export default class Kavenegar {

    private api_key:any

    constructor(){
        this.api_key = process.env.KAVENEGAR_SECRET;
    }

    static newInstance(){
        return new Kavenegar()
    }

    async simple(receptor:string, message:string){
        try{
            const url = `https://api.kavenegar.com/v1/${this.api_key}/sms/send.json`
            const response = await axios.get(url, {
                params:{
                    receptor,
                    message
                }
            })

            return response.status === 200
        } catch(err) {
            logger.error(err)
            return false;
        }
    }

    async send(receptor:string, message:string){
        try{
            const url = `https://api.kavenegar.com/v1/${this.api_key}/verify/lookup.json`
            const response = await axios.get(url, {
                params:{
                    receptor,
                    token:message,
                    template: 'mivoline'
                }
            })

            return response.status === 200
        } catch(err) {
            logger.error(err)
            return false;
        }
    }

    async tracking(receptor:string, message:string){
        try{
            const url = `https://api.kavenegar.com/v1/${this.api_key}/verify/lookup.json`
            const response = await axios.get(url, {
                params:{
                    receptor,
                    token:message,
                    template: 'payment'
                }
            })

            return response.status === 200
        } catch(err) {
            logger.error(err)
            return false;
        }
    }

    async sendForPassword(receptor:string, message:string) {
        try{
            const url = `https://api.kavenegar.com/v1/${this.api_key}/verify/lookup.json`
            const response = await axios.get(url, {
                params:{
                    receptor,
                    token:message,
                    template: 'forgetmivoline'
                }
            })

            return response.status === 200
        } catch(err) {
            logger.error(err)
            return false;
        }
    }

    async sendForCancelation(receptor:string, title:string,destination:string) {
        try{
            const url = `https://api.kavenegar.com/v1/${this.api_key}/verify/lookup.json`
            const response = await axios.get(url, {
                params:{
                    receptor,
                    token:title,
                    token2:destination,
                    template: 'arkadocForget'
                }
            })
            
            return response.status === 200
        } catch(err) {
            logger.error(err)
            console.log(err);
            
            return false;
        }
    }
}
