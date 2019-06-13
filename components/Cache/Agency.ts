import Adapter from './Adapter'

export default class AgencyCache extends Adapter{


    public constructor(page:any){
        super()
        this._key = `agency-cache-${page}`
        this._mainKey = 'agency'
    }

    public static newInstance(page?:number){
        return new AgencyCache(page || 1)
    }
    
}