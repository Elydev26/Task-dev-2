const tokenConatinerArray: number[] = []

export function generateToken():number{
    for(let i=1; i<=7; i++){
        const randomNumber = Math.floor(Math.random()*10)
        tokenConatinerArray.push(randomNumber)
    }
    const newCode = parseInt(tokenConatinerArray.join(""))
    console.log(newCode)
    return newCode
}