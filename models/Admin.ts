import Sequelize from 'sequelize'

export interface AdminAttributes {
    id?: string
    username?: string
    email?: string
    password?: string
    phone?: string
    reset_token?: string
}

//@ts-ignore
export interface AdminInstance extends Sequelize.Instance<AdminAttributes> {
    id: string
    username: string
    email: string
    phone: string
}

//@ts-ignore
export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes) {
    const Admin = sequelize.define('Admin', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        reset_token: DataTypes.STRING,
    }, {
        //@ts-ignore
        classMethods: {
          //@ts-ignore
          associate: function(models) {
            
          }
        }
      })
      Admin.prototype.toJSON = function(){
        //@ts-ignore
          const userObj = Object.assign({}, this.dataValues);

          delete userObj.password;
          delete userObj.reset_token;

          return userObj
      }; 
    return Admin
  }