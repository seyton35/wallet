function numTofixed(num, count) {
    let pattern = 1
    for (let i = 0; i < count; i++) {
        pattern /= 10
    }
    const afterDot = num - Math.floor(num)
    if (afterDot<pattern){
        return num.tofixed(count)
    }
}