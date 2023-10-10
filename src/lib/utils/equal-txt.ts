export default function equalTxt(a: Record<string, string>, b: Record<string, string>): boolean {
    let aKeys = Object.keys(a)
    let bKeys = Object.keys(b)
    if(aKeys.length != bKeys.length) return false
    for(let key of aKeys) {
        if(a[key] != b[key]) return false
    }
    return true
}