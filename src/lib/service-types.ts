/**
 * Provide ServiceType
 */
export interface ServiceType {
    name?       : string,
    protocol?   : 'tcp' | 'udp' | string | null | undefined,
    subtype?    : string | undefined
}

/**
 * Provides underscore prefix to name
 * @param name
 * @returns
 */
const Prefix = (name: string): string => {
    return '_' + name
}

/**
 * Check if key is allowed
 * @param key
 * @returns
 */
const AllowedProp = (key: string): boolean => {
    let keys: Array<string> = ['name','protocol','subtype']
    return keys.includes(key)
}

/**
 * Format input ServiceType to string
 * @param data
 * @returns
 */
export const toString = (data: ServiceType): any => {
    // Format to correct order
    let formatted: ServiceType = {
        name        : data.name,
        protocol    : data.protocol,
        subtype    : data.subtype
    }
    // Output as entries array
    let entries: Array<any> = Object.entries(formatted)
    return entries
        .filter(([key,val]) => AllowedProp(key) && val !== undefined)
        .reduce((prev, [key,val]) => {
            switch(typeof val) {
                case 'object':
                    val.map((i: string) => prev.push(Prefix(i)))
                    break
                default:
                    prev.push(Prefix(val))
                    break
            }
            return prev
        },[])
        .join('.')
}

/**
 * Format input string to ServiceType
 * @param string
 * @returns
 */
export const toType = (string: string): ServiceType => {
    // Split string into parts by dot
    let parts: Array<string> = string.split('.')
    let subtype: string | undefined;

    // Remove the prefix
    for(let i in parts) {
        if (parts[i][0] !== '_') continue
        parts[i] = parts[i].slice(1)
    }

    if (parts.includes('sub')) {
        subtype = parts.shift();
        parts.shift();
    }

    // Format the output
    return {
        name: parts.shift(),
        protocol: parts.shift() || null,
        subtype: subtype
    }
}