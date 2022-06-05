
// console.log(randomSignal + randomNumber)
//module.exports = () => {
    //let randomNumber = Math.random() * (0.99 - 0.1) + 0.1
    // console.log(randomNumber.toFixed(2))
   // randomNumber = randomNumber.toFixed(2)
    
    //let randomSignal = Math.round(Math.random())
    //console.log(randomSignal)
    //if (randomSignal == 0) randomSignal = '-'
    //else randomSignal = ''
  //  return randomSignal + randomNumber
//}



module.exports = () => {
	let randomNumber = Math.random() * (0.99 - 0.1) + 0.1
	randomNumber = randomNumber.toFixed(2)
	let randomSignal = Math.round(Math.random() * (2 - 1) + 1)
	if (randomSignal == 2) randomSignal = '-'
	else randomSignal = ''
	return randomSignal + randomNumber
}
