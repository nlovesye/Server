/**
 * 以下是 mongoose 的所有合法 SchemaTypes：
 * 
 * String
 * Number
 * Date
 * Buffer
 * Boolean
 * Mixed
 * ObjectId
 * Array
 * Decimal128
 * 
 */

const USER = {
    name: "String",
    age: 'Number',
    sex: "String"
}

// 武将表
const GENERAL = {
    // _id: 'ObjectId',
    name: "String", // 姓名
    camp: 'Number', // 阵营
    level: 'Number', // 等级
    advanced: 'Number', // 进阶等级
    quality: 'Number', // 星级
    cavalry: 'Number', // 骑兵
    mauler: 'Number', // 盾兵
    bowman: 'Number', // 弓兵
    spearman: 'Number', // 枪兵
    apparatus: 'Number', // 器械
    tags: 'Array', // 标签
    isAwaken: 'Boolean', // 是否觉醒
    fate: 'Array', // 缘分武将
    fateCount: 'Number', // 缘分组数量
    isPureGeneral: 'Boolean', // 是否武将（非内政）
    controlVal: 'Number', // 统御值
}

module.exports = {
    USER,
    GENERAL
}