import Sequelize from 'sequelize'

export interface CityAttributes {
    id?: string
    name: string
    slug?: string
}
//@ts-ignore
export interface CityInstance extends Sequelize.Instance<CityAttributes> {
    id?: string
    name: string
    slug?: string
}

//@ts-ignore
export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes) {
    const City = sequelize.define('City', {
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
    }, {
        //@ts-ignore
        classMethods: {
          //@ts-ignore
          associate: function(models) {
            
          }
        }
      })
    return City
  }