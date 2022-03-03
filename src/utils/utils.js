/**
 * Returns object based on an array of objects grouped keys
 *
 * @param {Array} list An array of objects with some common key
 * @param {string} key The key by which the objects will be grouped.
 */
const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})


module.exports = {
    groupByKey
}