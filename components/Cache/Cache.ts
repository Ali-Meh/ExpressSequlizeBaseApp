import Redis from 'ioredis'

//@ts-ignore
export const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    family: process.env.REDIS_FAMILY,           // 4 (IPv4) or 6 (IPv6)
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB
})

export default abstract class Cache {
    private _redis:any;

    public constructor(){
        //@ts-ignore
        this._redis = new Redis({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            family: process.env.REDIS_FAMILY,           // 4 (IPv4) or 6 (IPv6)
            password: process.env.REDIS_PASSWORD,
            db: process.env.REDIS_DB
        })
    }

    public async set(key:string, field:string, data:any){
        if(typeof data === "object"){
            data = JSON.stringify(data)
        }
        await this._redis.hset(key, field, data)
    }

    public async has(key:string, field:string){
        return await this._redis.hexists(key, field)
    }

    public async get(key:string, field:string){
        let data = await this._redis.hget(key, field)
        if(typeof data === 'string') {
            data = JSON.parse(data)
        }
        return data
    }

    public async delete(key:string) {
        return await this._redis.del(key)
    }
}
