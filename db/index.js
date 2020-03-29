const mongoose = require('mongoose')
const errLogger = require('../util/errLogger')
const initMongoose = require('./initMongoose')
const schemas = require('./schemas')

initMongoose()

class Mongo {
    instance = null

    static getInstance() {
        if (!this.instance) {
            this.instance = new Mongo()
        }
        return this.instance
    }

    constructor() {
        this.models = {}
        this.schemas = schemas
        // console.log('schemas', this.schemas, typeof this.schemas)
    }

    /**
     * 初始化mongoose model
     * @param name 表名称(集合名称)
     */
    getModel(name) {
        if (!name) return
        if (!this.schemas[name]) {
            throw(new Error('Field is not allowed for null'))
        }

        let model = this.models[name]
        if (!model) {
            //构建用户信息表结构
            const schema = new mongoose.Schema(this.schemas[name])

            //构建model
            model = mongoose.model(name, schema, name)

            this.models[name] = model
        }
        return model
    }

    /**
     * 保存数据
     * @param name 表名
     * @param fields 表数据字段
     */
    async save(name, fields) {
        if (!fields) {
            return errLogger('Field is not allowed for null')
        }

        let err_num = 0
        for (let i in fields) {
            if (!this.schemas[name][i]) err_num++
        }
        if (err_num > 0) {
            return errLogger('Wrong field name')
        }

        const m = this.getModel(name)
        const mongooseEntity = new m(fields)
        try {
            const res = await mongooseEntity.save()
            return res
        } catch (error) {
            throw error
        }
    }

    /**
     * 更新数据
     * @param name 表名
     * @param conditions 更新需要的条件 {}
     * @param fields 要更新的字段
     */
    async update (name, conditions, fields) {
        if (!fields || !conditions) {
            return errLogger('Parameter error')
        }
        const m = this.getModel(name)
        try {
            const res = await m.update(conditions, { $set: fields }, { multi: true, upsert: true })
            return res
        } catch (error) {
            return errLogger('update更新数据 失败', error)
        }
    }

    /**
     * 更新数据方法(带操作符的)
     * @param name 数据表名
     * @param conditions 更新条件 {_id: id, user_name: name}
     * @param fields 更新的操作符 {$set: {id: 123}}
     */
    async updateData (name, conditions, fields) {
        if (!fields || !conditions) {
            return errLogger('updateData Parameter error')
        }
        const m = this.getModel(name)
        try {
            const res = await m.findOneAndUpdate(conditions, fields, { multi: true, upsert: true })
            return res
        } catch (error) {
            return errLogger('updateData更新数据 失败', error)
        }
    }

    /**
     * 删除数据
     * @param name 表名
     * @param conditions 删除需要的条件 {_id: id}
     */
    async remove (name, conditions) {
        const m = this.getModel(name)
        try {
            const res = await m.remove(conditions)
            return res
        } catch (error) {
            return errLogger('updateData更新数据 失败', error)
        }
    }

    /**
     * 查询数据
     * @param name 表名
     * @param conditions 查询条件
     * @param fields 待返回字段
     */
    async find(name, conditions, fields, options) {
        const m = this.getModel(name)
        try {
            let list = []
            if (options.pageNo && !!options.pageSize) {
                list = await m.find(conditions, fields || null, {}).limit(parseInt(options.pageSize, 10)).skip((parseInt(options.pageNo, 10) - 1) * parseInt(options.pageSize, 10))
            } else {
                list = await m.find(conditions, fields || null, {})
            }
            const total = await m.count(conditions)
            return {
                list,
                total
            }
        } catch (error) {
            return errLogger('find 失败', error)
        }
    }

    /**
     * 查询单条数据
     * @param name 表名
     * @param conditions 查询条件
     */
    async findOne (name, conditions) {
        const m = this.getModel(name)
        try {
            const res = await m.findOne(conditions)
            return res
        } catch (error) {
            return errLogger('findOne 失败', error)
        }
    }

    /**
     * 根据_id查询指定的数据
     * @param name 表名
     * @param _id 可以是字符串或 ObjectId 对象
     */
    async findById (name, _id) {
        const m = this.getModel(name)
        try {
            const res = await m.findById(_id)
            return res
        } catch (error) {
            return errLogger('findById 失败', error)
        }
    }

    /**
     * 返回符合条件的文档数
     * @param name 表名
     * @param conditions 查询条件
     */
    async count (name, conditions) {
        const m = this.getModel(name)
        try {
            const res = await m.count(conditions)
            return res
        } catch (error) {
            return errLogger('count返回符合条件的文档数 失败', error)
        }
    }

    /**
     * 查询符合条件的文档并返回根据键分组的结果
     * @param name 表名
     * @param field 待返回的键值
     * @param conditions 查询条件
     */
    async distinct (name, field, conditions) {
        const m = this.getModel(name)
        try {
            const res = await m.distinct(field, conditions)
            return res
        } catch (error) {
            return errLogger('查询符合条件的文档并返回根据键分组的结果 失败', error)
        }
    }

    /**
     * 连写查询
     * @param name 表名
     * @param conditions 查询条件 {a:1, b:2}
     * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
     */
    async where (name, conditions, options) {
        const m = this.getModel(name)
        try {
            const query = m.find(conditions).select(options.fields || '').sort(options.sort || {}).limit(options.limit || {})
            const res = query.exec()
            return res
        } catch (error) {
            return errLogger('连写查询 失败', error)
        }
    }
}

module.exports = new Mongo();