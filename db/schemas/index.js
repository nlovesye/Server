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

// 用户表
const USER = require('./USER')

// 武将表
const GENERAL = require('./GENERAL')

module.exports = {
    USER,
    GENERAL
}