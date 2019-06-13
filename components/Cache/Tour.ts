import Adapter from './Adapter'

export default class TourCache extends Adapter{


    public constructor(page:number, type:number, city:number){
        super()
        this._key = `tour-cache-${page}-${type}-${city}`
        this._mainKey = 'tour'
    }

    public static newInstance(page?:number, type?:number, city?:number){
        return new TourCache(page || 0, type || 0, city || 0)
    }
}