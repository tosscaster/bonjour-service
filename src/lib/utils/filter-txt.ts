import KeyValue from '../KeyValue'

/**
 * Filter the binary key from the txtQuery
 * @returns KeyValue
 */
export default (data: KeyValue) => Object.keys(data)
.filter((key) => !key.includes('binary'))
.reduce((cur, key) => { return Object.assign(cur, { [key]: data[key] })}, {})