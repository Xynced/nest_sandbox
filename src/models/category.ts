import {CreateOptions, DataTypes, Model, Sequelize} from "sequelize";
import {HookReturn} from "sequelize/types/hooks";
const sequelize = new Sequelize('sqlite::memory:');

export class Category extends Model {
    id: number;
    slug: string;
    name: string;
    description?: string;
    createdDate: Date;
    active: boolean;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    slug: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    createdDate: {
        type: DataTypes.DATE
    },
    active: {
        type: DataTypes.BOOLEAN
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['slug']
        }
    ],
    hooks: {
        beforeCreate(attributes: Category): HookReturn {
            attributes.createdDate = new Date();
        }
    },
    sequelize,
    createdAt: false,
    updatedAt: false
})