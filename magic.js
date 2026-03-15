let money = 5
let passiveMult = 1
let critHit = 0.05
let critDamage = 2
let combo = 0
let custom = [1,0.05,2,5]
let geromeUpgrade = false
let gerome = false
let laps = 1
let debug = ["",999,999,999]
let taunt = 100
let shotgun = false
let scoreRequirement = 20000
let stamp=0

function willICrit(){
	return critHit>Math.random()
}

function stampSelect(x,pick=true){
	stamp=x
	switch(x){
		case 0:
			laps=1
			critHit=0.05
			critDamage=2
			money=5
			break;
		case 1:
			laps=2
			critHit=0.05
			critDamage=2
			money=5
			break;
		case 2:
			laps=1
			critHit=0.1
			critDamage=3
			money=5
			break;
		case 3:
			laps=0
			critHit=0.05
			critDamage=2
			money=5
			break;
		case 4:
			if(pick){
				custom[0]=Number(prompt("Choose Lap Amount"))
				custom[1]=Math.max(Math.min(Number(prompt("Choose Critical Hit... preferably within 0 to 100 range"))/100,1),0)
				custom[2]=Number(prompt("Choose Critical Damage"))
				custom[3]=Number(prompt("Choose Money Amount"))
			}
			laps=custom[0]
			critHit=custom[1]
			critDamage=custom[2]
			money=custom[3]
			break;
		default:
			console.log("you suck")
			break;
	}

	for(let i=0;i<5;i++){
		if(document.getElementById("stamp"+i).id.includes(x))
			document.getElementById("stamp"+i).style["background-color"]="lightgreen"
		else
			document.getElementById("stamp"+i).style["background-color"]=""
	}
}

function debugLevel(){
	debug[0] = document.getElementById("levelDebug").value
	debug[1] = Number(document.getElementById("orderDebug").value)
	debug[2] = Number(document.getElementById("lapOrderDebug").value)
	debug[3] = Number(document.getElementById("lapExtraOrderDebug").value)
	simulateLevel(debug[0],true)
}

function simulateLevel(level, debugIt){
	let tempLevels = structuredClone(levels)
	let chips = 1
	let mult = 1
	let devilPizza = false
	let runMoney = money
	stampSelect(stamp,false)
	combo = 0
	gerome = false
	shotgun = false
	let chip = 1
	let meteor = 5
	let bigChip = 10
	let priest = 25
	let toppins = 50
	let hoop = 5
	let enemy = 1
	let critRigger = [1,1]
	let lengthyLength = Math.min(tempLevels[level].order.length,debugIt?debug[1]:999)
	for(i=0;i<lengthyLength;i++){
		if(level=="street" && i==0 && tempLevels[level][tempLevels[level].order[i]].enemies.grandpas)
			tempLevels[level][tempLevels[level].order[i]].enemies.grandpas=tempLevels[level][tempLevels[level].order[i]].enemies.grandpas-1
		while(tempLevels[level][tempLevels[level].order[i]].enemies.normal>0){
			tempLevels[level][tempLevels[level].order[i]].enemies.normal=tempLevels[level][tempLevels[level].order[i]].enemies.normal-1
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest){
			while(tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest>0){
				tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest=tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				chips=chips+3
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		if(tempLevels[level][tempLevels[level].order[i]].enemies.grandpas){
			while(tempLevels[level][tempLevels[level].order[i]].enemies.grandpas>0){
				tempLevels[level][tempLevels[level].order[i]].enemies.grandpas=tempLevels[level][tempLevels[level].order[i]].enemies.grandpas-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		while(tempLevels[level][tempLevels[level].order[i]].enemies.elite>0){
			tempLevels[level][tempLevels[level].order[i]].enemies.elite=tempLevels[level][tempLevels[level].order[i]].enemies.elite-1
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].order[i]].enemies.golf){
			while(tempLevels[level][tempLevels[level].order[i]].enemies.golf>0){
				tempLevels[level][tempLevels[level].order[i]].enemies.golf=tempLevels[level][tempLevels[level].order[i]].enemies.golf-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
				chips=chips+toppins
			}
		}
		while(tempLevels[level][tempLevels[level].order[i]].enemies.stupidRat>0){
			tempLevels[level][tempLevels[level].order[i]].enemies.stupidRat=tempLevels[level][tempLevels[level].order[i]].enemies.stupidRat-1
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		while(tempLevels[level][tempLevels[level].order[i]].chips.normal>0){
			tempLevels[level][tempLevels[level].order[i]].chips.normal=tempLevels[level][tempLevels[level].order[i]].chips.normal-1
			chips=chips+chip
		}
		if(tempLevels[level][tempLevels[level].order[i]].chips.meteor){
			while(tempLevels[level][tempLevels[level].order[i]].chips.meteor>0){
				tempLevels[level][tempLevels[level].order[i]].chips.meteor=tempLevels[level][tempLevels[level].order[i]].chips.meteor-1
				chips=chips+meteor
			}
		}
		if(tempLevels[level][tempLevels[level].order[i]].chips.ice){
			while(tempLevels[level][tempLevels[level].order[i]].chips.ice>0&&(tempLevels[level][tempLevels[level].order[i]].hasJetpack||devilPizza)){
				tempLevels[level][tempLevels[level].order[i]].chips.ice=tempLevels[level][tempLevels[level].order[i]].chips.ice-1
				chips=chips+1
			}
		}
		if(tempLevels[level][tempLevels[level].order[i]].chips.hoop){
			while(tempLevels[level][tempLevels[level].order[i]].chips.hoop>0){
				tempLevels[level][tempLevels[level].order[i]].chips.hoop=tempLevels[level][tempLevels[level].order[i]].chips.hoop-1
				chips=chips+hoop
			}
		}
		
		if(tempLevels[level][tempLevels[level].order[i]].chips.unfreezer){
			if(tempLevels[level][tempLevels[level].order[i]].chips.unfreezer[0]){
				tempLevels[level][tempLevels[level].order[i]].chips.unfreezer[0]=false
				chips=chips+tempLevels[level][tempLevels[level].order[i]].chips.unfreezer[1]
			}
		}
		while(tempLevels[level][tempLevels[level].order[i]].chips.aSingleBottle>0){
			tempLevels[level][tempLevels[level].order[i]].chips.aSingleBottle=tempLevels[level][tempLevels[level].order[i]].chips.aSingleBottle-1
			chips=chips+chip
		}
		while(tempLevels[level][tempLevels[level].order[i]].chips.big>0){
			tempLevels[level][tempLevels[level].order[i]].chips.big=tempLevels[level][tempLevels[level].order[i]].chips.big-1
			chips=chips+bigChip
		}
		while(tempLevels[level][tempLevels[level].order[i]].chips.priest>0){
			tempLevels[level][tempLevels[level].order[i]].chips.priest=tempLevels[level][tempLevels[level].order[i]].chips.priest-1
			chips=chips+priest
		}
		while(tempLevels[level][tempLevels[level].order[i]].chips.temporary>0){
			tempLevels[level][tempLevels[level].order[i]].chips.temporary=tempLevels[level][tempLevels[level].order[i]].chips.temporary-1
			chips=chips+chip
		}
		while(tempLevels[level][tempLevels[level].order[i]].chips.temporaryBig>0){
			tempLevels[level][tempLevels[level].order[i]].chips.temporaryBig=tempLevels[level][tempLevels[level].order[i]].chips.temporaryBig-1
			chips=chips+bigChip
		}
		if(tempLevels[level][tempLevels[level].order[i]].chips.mortCube){
			if(tempLevels[level][tempLevels[level].order[i]].chips.mortCube>0){
				tempLevels[level][tempLevels[level].order[i]].chips.mortCube=tempLevels[level][tempLevels[level].order[i]].chips.mortCube-1
				chips=chips+50
				money=money+1
			}
		}
		if(tempLevels[level][tempLevels[level].order[i]].chips.cards){
			while(tempLevels[level][tempLevels[level].order[i]].chips.cards>0){
				tempLevels[level][tempLevels[level].order[i]].chips.cards=tempLevels[level][tempLevels[level].order[i]].chips.cards-1
				chips=chips+5
			}
		}
		if(tempLevels[level][tempLevels[level].order[i]].hasToppins[0] && tempLevels[level][tempLevels[level].order[i]].hasToppins[1]<4){
			tempLevels[level][tempLevels[level].order[i]].hasToppins[0] = false
			if(level=="forest")
				combo=combo+2
			chips=chips+toppins
			money=money+1
		}
		if(tempLevels[level][tempLevels[level].order[i]].hasSecrets[1]&&tempLevels[level][tempLevels[level].order[i]].hasSecrets[0]){
			tempLevels[level][tempLevels[level].order[i]].hasSecrets[1] = false
			debug[1]=debug[1]+1
			tempLevels[level].order.splice(i+1,0,tempLevels[level][tempLevels[level].order[i]].hasSecrets[2]+"")
		}
		if(tempLevels[level][tempLevels[level].order[i]].hasGerome && geromeUpgrade){
			tempLevels[level][tempLevels[level].order[i]].hasGerome = false
			gerome = true
		}
		if(tempLevels[level][tempLevels[level].order[i]].hasGeromeDoor && gerome){
			tempLevels[level][tempLevels[level].order[i]].hasGeromeDoor = false
			gerome = false
			money=money+5
		}
		if(tempLevels[level].order[i].includes("secret")){
			tempLevels[level].order.splice(i, 1);
			i=i-1
			debug[1]=debug[1]-1
		}
		if(tempLevels[level][tempLevels[level].order[i]].devilPizza)
			devilPizza = true
		lengthyLength = Math.min(tempLevels[level].order.length,debugIt?debug[1]:999)
		console.log(tempLevels[level].order+", "+i)
	}
	if(level!="war"){
		mult=mult+(debugIt?debug[2]>0?(enemy*passiveMult*(willICrit()?critDamage:1)):0:(enemy*passiveMult*(willICrit()?critDamage:1)))
		critRigger[0]=critRigger[0]+(debugIt?debug[2]>0?(enemy*passiveMult):0:(enemy*passiveMult))
		critRigger[1]=critRigger[1]+(debugIt?debug[2]>0?(enemy*passiveMult*critDamage):0:(enemy*passiveMult*critDamage))
		combo=combo+(debugIt?debug[2]>0?1:0:1)
	}
	lengthyLength = Math.min(tempLevels[level].lapOrder.length,debugIt?debug[2]:999)
	for(i=0;i<lengthyLength;i++){
		tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[0] = true
		if(level=="factory"&&i==0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal=tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal+20
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.normal>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.normal=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.normal-1
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest){
			while((tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest-(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.inaccessableChestDuringLap?tempLevels[level][tempLevels[level].lapOrder[i]].enemies.inaccessableChestDuringLap:0))>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				chips=chips+3
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.grandpas){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.grandpas>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].enemies.grandpas=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.grandpas-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		while((tempLevels[level][tempLevels[level].lapOrder[i]].enemies.elite)>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.elite=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.elite-1
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
				chips=chips+toppins
			}
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.lap>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.lap=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.lap-1
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.stupidRat>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.stupidRat=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.stupidRat-1
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.normal>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.normal=tempLevels[level][tempLevels[level].lapOrder[i]].chips.normal-1
			chips=chips+chip
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].chips.meteor){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.meteor>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].chips.meteor=tempLevels[level][tempLevels[level].lapOrder[i]].chips.meteor-1
				chips=chips+meteor
			}
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].chips.ice){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.ice>0&&(tempLevels[level][tempLevels[level].lapOrder[i]].hasJetpack||devilPizza)){
				tempLevels[level][tempLevels[level].lapOrder[i]].chips.ice=tempLevels[level][tempLevels[level].lapOrder[i]].chips.ice-1
				chips=chips+1
			}
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].chips.hoop){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.hoop>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].chips.hoop=tempLevels[level][tempLevels[level].lapOrder[i]].chips.hoop-1
				chips=chips+hoop
			}
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.big>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.big=tempLevels[level][tempLevels[level].lapOrder[i]].chips.big-1
			chips=chips+bigChip
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal=tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal-1
			chips=chips+chip
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapBig>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapBig=tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapBig-1
			chips=chips+bigChip
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.temporary>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.temporary=tempLevels[level][tempLevels[level].lapOrder[i]].chips.temporary-1
			chips=chips+chip
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.temporaryBig>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.temporaryBig=tempLevels[level][tempLevels[level].lapOrder[i]].chips.temporaryBig-1
			chips=chips+bigChip
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.priest>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.priest=tempLevels[level][tempLevels[level].lapOrder[i]].chips.priest-1
			chips=chips+priest
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].chips.cards){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.cards>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].chips.cards=tempLevels[level][tempLevels[level].lapOrder[i]].chips.cards-1
				chips=chips+5
			}
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].hasToppins[0] && tempLevels[level][tempLevels[level].lapOrder[i]].hasToppins[1]<4){
			tempLevels[level][tempLevels[level].lapOrder[i]].hasToppins[0] = false
			if(level=="forest")
				combo=combo+2
			chips=chips+toppins
			money=money+1
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[1]&&tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[0]){
			tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[1] = false
			debug[2]=debug[2]+1
			tempLevels[level].lapOrder.splice(i+1,0,tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[2]+"")
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].hasGerome && geromeUpgrade){
			tempLevels[level][tempLevels[level].lapOrder[i]].hasGerome = false
			gerome = true
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].hasGeromeDoor && gerome){
			tempLevels[level][tempLevels[level].lapOrder[i]].hasGeromeDoor = false
			gerome = false
			money=money+5
		}
		if(tempLevels[level].lapOrder[i].includes("secret")){
			tempLevels[level].lapOrder.splice(i, 1);
			debug[2]=debug[2]-1
			i=i-1
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].hasExceptionalToppins){
			if(tempLevels[level][tempLevels[level].lapOrder[i]].hasExceptionalToppins[0] && tempLevels[level][tempLevels[level].lapOrder[i]].hasExceptionalToppins[1]<4){
				tempLevels[level][tempLevels[level].lapOrder[i]].hasExceptionalToppins[0] = false
				chips=chips+toppins
				money=money+1
			}
		}
		lengthyLength = Math.min(tempLevels[level].lapOrder.length,debugIt?debug[2]:999)
		console.log(tempLevels[level].lapOrder+", "+i)
	}
	lengthyLength = Math.min(tempLevels[level].lapExtraOrder.length,debugIt?debug[3]:999)
	while(laps>0){
		for(i=0;i<lengthyLength;i++){
			tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[0] = true
			tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap = levels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap+levels[level][tempLevels[level].lapExtraOrder[i]].enemies.normal+levels[level][tempLevels[level].lapExtraOrder[i]].enemies.elite-levels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableDuringLap
			if(typeof Number(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap)=="number")
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap = levels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap
			tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapNormal = levels[level][tempLevels[level].lapExtraOrder[i]].chips.lapNormal
			tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig = levels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig
			tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.cards = levels[level][tempLevels[level].lapExtraOrder[i]].chips.cards
			if(typeof Number(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest)=="number"){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest = levels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest
				console.log(levels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest)
			}
			if(typeof Number(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf)=="number")
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf = levels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf
			if(typeof Number(tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.cards)=="number")
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.cards = levels[level][tempLevels[level].lapExtraOrder[i]].chips.cards
			if(tempLevels[level].lapExtraOrder[i].includes("secret")){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.normal = levels[level][tempLevels[level].lapExtraOrder[i]].chips.normal
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.big = levels[level][tempLevels[level].lapExtraOrder[i]].chips.big
			}
			while((tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.normal-tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableDuringLap)>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.normal=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.normal-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest){
				while((tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest-(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableChestDuringLap?tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableChestDuringLap:0))>0){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest-1
					mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
					chips=chips+3
					critRigger[0]=critRigger[0]+(enemy*passiveMult)
					critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
					combo=combo+1
				}
			}
			while((tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.elite-tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableDuringLap)>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.elite=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.elite-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
			while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap-1
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap){
				while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap>0){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap-1
					mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
					critRigger[0]=critRigger[0]+(enemy*passiveMult)
					critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
					combo=combo+1
				}
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf){
				while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf>0){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf-1
					mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
					critRigger[0]=critRigger[0]+(enemy*passiveMult)
					critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
					combo=combo+1
					chips=chips+toppins
				}
			}
			while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapNormal>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapNormal=tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapNormal-1
				chips=chips+chip
			}
			while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig=tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig-1
				chips=chips+bigChip
			}
			while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.priest>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.priest=tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.priest-1
				chips=chips+priest
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.cards){
				while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.cards>0){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.cards=tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.cards-1
					chips=chips+5
				}
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasToppins[0] && tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasToppins[1]<4){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasToppins[0] = false
				if(level=="forest")
					combo=combo+2
				chips=chips+toppins
				money=money+1
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[1]&&tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[0]&&!tempLevels[level][tempLevels[level].lapExtraOrder[i]].secretDENIED){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[1] = false
				debug[3]=debug[3]+1
				tempLevels[level].lapExtraOrder.splice(i+1,0,tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[2]+"")
			}
			if(tempLevels[level].lapExtraOrder[i].includes("secret")){
				tempLevels[level].lapExtraOrder.splice(i, 1);
				debug[3]=debug[3]-1
				i=i-1
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasExceptionalToppins){
				if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasExceptionalToppins[0] && tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasExceptionalToppins[1]<4){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasExceptionalToppins[0] = false
					chips=chips+toppins
					money=money+1
				}
			}
			lengthyLength = Math.min(tempLevels[level].lapExtraOrder.length,debugIt?debug[3]:999)
			console.log(tempLevels[level].lapExtraOrder+", "+i)
		}
		laps=laps-1
	}
	console.log(critRigger)
	document.getElementById("score").innerHTML = `Chips: ${chips} Mult: ${mult} Combo: ${combo} Money: $${money}<br><h1>SCORE:<br><span style="font-size: 24px; color: hsl(0 50% 25%)">${chips*critRigger[0]}</span>-<span style="font-size: 28px; color: hsl(25 62.5% 31.25%)">${(chips+taunt)*critRigger[0]}</span>---<span style="color: hsl(${(chips*mult-(chips*critRigger[0]))/((chips+taunt)*critRigger[1]-(chips*critRigger[0]))*270} ${(chips*mult-(chips*critRigger[0]))/((chips+taunt)*critRigger[1]-(chips*critRigger[0]))*50+50}% ${(chips*mult-(chips*critRigger[0]))/((chips+taunt)*critRigger[1]-(chips*critRigger[0]))*25+25}%)">${chips*mult}</span>---<span style="font-size: 28px; color: hsl(240 87.5% 43.75%)">${chips*critRigger[1]}</span>-<span style="font-size: 24px; color: hsl(270 100% 50%)">${(chips+taunt)*critRigger[1]}</span><br><h1>TOTAL STRENGTH: ${chips*mult/scoreRequirement}</h1><br>you need 43.75 strength to beat final level`
}