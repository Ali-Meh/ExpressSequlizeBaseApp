import cacheInterface from './interface'
import Cache from './Cache' 
export default class Adapter extends Cache implements cacheInterface{

    public _mainKey:string
    public _key:string

    public async setData(data:object) {
        this.set(this._mainKey, this._key, data)
    }

    public async hasData() {
        return await this.has(this._mainKey, this._key)
    }

    public async deleteData(){
        return await this.delete(this._mainKey)
    }

    public async getData(){
        return await this.get(this._mainKey, this._key)
    }
}