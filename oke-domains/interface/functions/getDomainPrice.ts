function getDomainPrice(name:string):number {
    if(name.length <=0) return 0;
    if (name.length === 3) {
        return     0.005 //5 * 10**15; // 0.005 ETH = 5 000 000 000 000 000 000 (18 decimals).
    } else if (name.length === 4) {
        return   0.003// 3 * 10**15; // To charge smaller amounts, reduce the decimals. This is 0.003
    } else {
        return 0.001 // 1 * 10**15; // To charge smaller amounts, reduce the decimals. This is 0.001
    }
}

export default getDomainPrice