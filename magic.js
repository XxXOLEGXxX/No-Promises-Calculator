
let combo = 0
let custom = [1,0.05,2,5]
let geromeUpgrade = false
let gerome = false
let debug = ["",999,999,999]
let taunt = 100
let shotgun = false
let scoreRequirement = 20000
let firstComboDrop = false
let collectibleUpgrades = {}

let availableCommon = 41
let availableUncommon = 6
let availableNJA = 12
let availableTotal = availableCommon + availableUncommon + availableNJA
let availableList = Object.keys(miniUpgrades)
let differenceMaker=0

let totalSellValue = 0
let damageTaken = false
let availableUpgrades = []
let upgradeLimit = 3
let boughtUpgrades = 0
let points = 5
let pointsTaken = 0
let rerollCost = 5
let noDupes = false
let check = false

let upgradesOwnedStats = {}

let laps = 1
let mode = ""
let gauntletLaps = 0
let passiveMult = 1
let critHit = 0.05
let critDamage = 2
let startingMult = 0
let startingChip = 0
let chips = 1+startingChip
let mult = 1+startingMult

let money = 5
let comboTime = 1
let upgradeChance = 0.25
let stableRandom = upgradeChance>Math.random()
let stamp="Blank"

stampSelect(stamp,false)
let tempLaps = laps

function willICrit(){
	return Number(critHit)>Math.random()
}

window.addEventListener("resize", positionChange);

window.addEventListener("mouseover", function(event) {
	let magicBullshit = upgrades[availableUpgrades[event.target.id.slice(event.target.id.length-1)]]
	let magicBullshit2 = upgradesOwnedStats[Object.keys(upgradesOwnedStats)[event.target.id.slice(event.target.id.length-1)]]
	if(event.target.id.includes("reroll")) document.getElementById("shopDescPart").innerHTML = `<h2>REROLL<br>[$${rerollCost}]</h2>`
	if(event.target.id.includes("upgrade") && !event.target.id.includes("upgradeOwned")) document.getElementById("shopDescPart").innerHTML = `${magicBullshit.name}<br><br>${magicBullshit.rarity}<br>${magicBullshit.maxTier==1?"Untiered":"Tier "+ Number(magicBullshit.tier+1)}<br>Costs $${magicBullshit.cost}<br>Uses ${magicBullshit.points} Points`
	if(event.target.id.includes("upgradeOwned")) document.getElementById("shopDescPart").innerHTML = `${magicBullshit2.name}<br><br>${magicBullshit2.rarity}<br>${magicBullshit2.maxTier==1?"Untiered":"Tier "+ magicBullshit2.tier}<br>Costs $${magicBullshit2.cost}<br>Uses ${magicBullshit2.points} Points`
});

window.addEventListener("mouseout", function(event) {
  if(event.target.id.includes("upgrade")||event.target.id.includes("reroll")) document.getElementById("shopDescPart").innerHTML = ``
});

function positionChange(){
	document.getElementById("shop").style.left = (window.innerWidth-document.getElementById("shop").style.width.slice(0,-2))/2+"px"
	document.getElementById("shop").style.top = (window.innerHeight-document.getElementById("shop").style.height.slice(0,-2))/2+"px"
}

function stampSelect(x,pick){
	stamp=x
	switch(x){
		case "Blank":
			laps=1
			passiveMult=1
			comboTime=1
			upgradeChance=0.25
			critHit=0.05
			critDamage=2
			points=5
			startingChip=0
			startingMult=0
			break;
		case "Beginner":
			laps=1
			passiveMult=1
			comboTime=1.35
			upgradeChance=0.25
			critHit=0.05
			critDamage=2
			points=5
			startingChip=0
			startingMult=0
			break;
		case "Lapping":
			laps=2
			passiveMult=1
			comboTime=1
			upgradeChance=0.25
			critHit=0.05
			critDamage=2
			points=5
			startingChip=0
			startingMult=0
			break;
		case "Critical":
			laps=1
			passiveMult=1
			comboTime=1
			upgradeChance=0.25
			critHit=0.1
			critDamage=3
			points=5
			startingChip=0
			startingMult=0
			break;
		case "Mini":
			laps=1
			passiveMult=1
			comboTime=1
			upgradeChance=0.35
			critHit=0.05
			critDamage=2
			points=5
			startingChip=0
			startingMult=0
			break;
		case "Badge":
			laps=0
			passiveMult=1
			comboTime=1
			upgradeChance=0.25
			critHit=0.05
			critDamage=2
			points=6
			startingChip=0
			startingMult=0
			break;
		case "Custom":
			if(pick){
				custom[0]=Number(prompt("Choose Lap Amount"))
				custom[1]=Math.max(Math.min(Number(prompt("Choose Critical Hit... preferably within 0 to 100 range"))/100,1),0)
				custom[2]=Number(prompt("Choose Critical Damage"))
				custom[3]=Number(prompt("Choose Point Amount"))
				custom[4]=Number(prompt("Choose Passive Mult"))
				custom[5]=Number(prompt("Choose Combo Time in percentage"))/100
				custom[6]=Math.max(Math.min(Number(prompt("Choose Upgrade Chance... same logic from Critical Hit applies here"))/100,1),0)
				custom[7]=Number(prompt("Choose Starting Chips"))
				custom[8]=Number(prompt("Choose Starting Mult"))
			}
			laps=custom[0]
			critHit=custom[1]
			critDamage=custom[2]
			points=custom[3]
			passiveMult=custom[4]
			comboTime=custom[5]
			upgradeChance=custom[6]
			startingChip=custom[7]
			startingMult=custom[8]
			break;
		case "Income":
			console.log("Sorry, couldn't make it work")
			stampSelect("Blank")
			break;
		default:
			console.log("you suck")
			break;
	}
}

function debugLevel(){
	debug[0] = document.getElementById("levelDebug").value
	debug[1] = Number(document.getElementById("orderDebug").value)
	debug[2] = Number(document.getElementById("lapOrderDebug").value)
	debug[3] = Number(document.getElementById("lapExtraOrderDebug").value)
	debug[4] = document.getElementById("stamp").value
	debug[5] = Number(document.getElementById("tempLap").value)
	if(debug[4]=="Custom"){
		stampSelect("Custom",false)
	}
	else if(debug[4]=="Custom Set"){
		stampSelect("Custom",true)
	}
	else{
	stampSelect(debug[4])
	}
	simulateLevel(debug[0],true)
}

function collectMeSomeGoodShit(){
	let didYaGetItYet = false
	let rarity=(Math.random()*100>=95?"NJA":Math.random()*100>=70?"Uncommon":"Common")
	console.log(rarity)
	if(availableTotal==0)
		money=money+1
	while(availableTotal>0&&!didYaGetItYet){
		if(rarity=="Common"&&availableCommon>0){
			availableTotal = availableTotal-1
			availableCommon = availableCommon-1
			didYaGetItYet=true
		}
		if(rarity=="Uncommon"&&availableUncommon>0){
			availableTotal = availableTotal-1
			availableUncommon = availableUncommon-1
			didYaGetItYet=true
		}
		if(rarity=="NJA"&&availableNJA>0){
			availableTotal = availableTotal-1
			availableNJA = availableNJA-1
			didYaGetItYet=true
		}
		console.log(rarity)
		rarity=(Math.random()*100>=95?"NJA":Math.random()*100>=70?"Uncommon":"Common")
	}
	console.log("you got "+availableTotal+" left.")
}

function vibeCheck(mode){
	stampSelect(stamp,false)
	stableRandom = upgradeChance>Math.random()
	noDupes = false
	let iceCream = true
	if(mode.includes("enemy")&&stableRandom){
		collectMeSomeGoodShit()
		noDupes=true
	}
	if(mode.includes("double")){
		chips=chips+1
	}
	if(mode.includes("triple")){
		chips=chips+1
	}
	for(let i=0;i<Object.keys(upgradesOwnedStats).length;i++){
		if(typeof upgradesOwnedStats[i].effectType =="string"){
			if(upgradesOwnedStats[i].effectType=="Mult"){
				if(upgradesOwnedStats[i].name=="Sea Shells")
				console.log(upgradesOwnedStats[i].effect())
				passiveMult=passiveMult*upgradesOwnedStats[i].effect()
			}
			if(upgradesOwnedStats[i].effectType=="Lap Amount")
				laps=laps+upgradesOwnedStats[i].effect()
			if(upgradesOwnedStats[i].effectType=="Starting Chips")
				startingChip=startingChip+upgradesOwnedStats[i].effect()
			if(upgradesOwnedStats[i].effectType=="Starting Mult")
				startingMult=startingMult+upgradesOwnedStats[i].effect()
			if(upgradesOwnedStats[i].effectType=="Critical Chance")
				critHit=critHit+upgradesOwnedStats[i].effect()
			if(upgradesOwnedStats[i].effectType=="Combo Time")
				comboTime=comboTime+upgradesOwnedStats[i].effect()
			if(upgradesOwnedStats[i].effectType=="Upgrade Chance")
				upgradeChance=upgradeChance+upgradesOwnedStats[i].effect()
			if(mode.includes("rat")){
				upgradesOwnedStats[i].value=upgradesOwnedStats[i].value+1
			}
			if(upgradesOwnedStats[i].name=="Duathlon")
				critHit=0
		}
		if(typeof upgradesOwnedStats[i].effectType =="object"){
			for(let v=0;v<upgradesOwnedStats[v].effectType.length;v++){
				if(upgradesOwnedStats[i].effectType[v]=="Mult")
					passiveMult=passiveMult*upgradesOwnedStats[i].effect()[v]
				if(upgradesOwnedStats[i].effectType[v]=="Lap Amount")
					laps=laps+upgradesOwnedStats[i].effect()[v]
				if(upgradesOwnedStats[i].effectType[v]=="Starting Chips")
					startingChip=startingChip+upgradesOwnedStats[i].effect()[v]
				if(upgradesOwnedStats[i].effectType[v]=="Starting Mult")
					startingMult=startingMult+upgradesOwnedStats[i].effect()[v]
				if(upgradesOwnedStats[i].effectType[v]=="Critical Chance")
					critHit=critHit+upgradesOwnedStats[i].effect()[v]
				if(upgradesOwnedStats[i].effectType[v]=="Combo Time")
					comboTime=comboTime+upgradesOwnedStats[i].effect()[v]
				if(upgradesOwnedStats[i].effectType[v]=="Upgrade Chance")
					upgradeChance=upgradeChance+upgradesOwnedStats[i].effect()[v]
			}
		}
		else{
			if((stableRandom&&(iceCream || upgradesOwnedStats[i].value>0))&&(upgradesOwnedStats[i].name=="Ice Cream"&&upgradesOwnedStats[i].value>0)&&!noDupes){
				money=money+1
				upgradesOwnedStats[i].value = Number(upgradesOwnedStats[i].value)-1
				console.log("iceream :333  "+upgradesOwnedStats[i].value+` ${typeof upgradesOwnedStats[i].value}`)
				noDupes=true
			}
			if(upgradesOwnedStats[i].name=="For Your Troubles" &&!noDupes && stableRandom){
				mult=mult+1
				chips=chips+5
				noDupes=true
			}
			if(mode.includes("laBoost")&&upgradesOwnedStats[i].name=="Once More"){
				mult=mult*1.25
			}
			if(upgradesOwnedStats[i].name=="Organic Produce"&&mode=="toppin"){
				money=money+1
				chips=chips+50
				console.log(money)
			}
			if(mode.includes("john")&&upgradesOwnedStats[i].name=="Fashionably Late"){
				mult=mult*1.5
			}
			if(mode.includes("first")&&upgradesOwnedStats[i].name=="Goomba"){
				mult=mult*2
			}
			if(mode.includes("finale")&&upgradesOwnedStats[i].name=="It Come With Eggwuh"){
				upgradesOwnedStats[i].cost=upgradesOwnedStats[i].cost+3
			}
			if(mode.includes("finale")&&upgradesOwnedStats[i].name=="Ice Cream"){
				upgradesOwnedStats[i].value=3
			}
			if((mode.includes("enemy")||mode.includes("elite"))&&upgradesOwnedStats[i].name=="The Gauntlet"){
				upgradesOwnedStats[i].value=upgradesOwnedStats[i].value+1
			}
		}
	}
	laps = laps+gauntletLaps
}

function simulateLevel(level, debugIt){
	availableCommon = 41
	availableUncommon = 6
	availableNJA = 12
	availableTotal = availableCommon + availableUncommon + availableNJA
	let tempLevels = structuredClone(levels)
	let devilPizza = false
	stampSelect(stamp,false)
	combo = 0
	collectibleUpgrades={}
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
	mode = ""
	vibeCheck(mode)
	chips = 1+startingChip
	console.log(chips)
	mult = 1+startingMult
	tempLaps = structuredClone(laps)
	for(i=0;i<lengthyLength;i++){
		if(level=="street" && i==0 && tempLevels[level][tempLevels[level].order[i]].enemies.grandpas){
			tempLevels[level][tempLevels[level].order[i]].enemies.grandpas=tempLevels[level][tempLevels[level].order[i]].enemies.grandpas-1
			combo=combo+1
			mode="enemy"
			vibeCheck(mode)
		}
		while(tempLevels[level][tempLevels[level].order[i]].enemies.normal>0){
			tempLevels[level][tempLevels[level].order[i]].enemies.normal=tempLevels[level][tempLevels[level].order[i]].enemies.normal-1
			mode="enemy"
			vibeCheck(mode)
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest){
			while(tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest>0){
				tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest=tempLevels[level][tempLevels[level].order[i]].enemies.treasureChest-1
				mode="enemy triple"
				vibeCheck(mode)
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
				mode="enemy"
				vibeCheck(mode)
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		while(tempLevels[level][tempLevels[level].order[i]].enemies.elite>0){
			tempLevels[level][tempLevels[level].order[i]].enemies.elite=tempLevels[level][tempLevels[level].order[i]].enemies.elite-1
			mode="elite"
			vibeCheck(mode)
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].order[i]].enemies.golf){
			while(tempLevels[level][tempLevels[level].order[i]].enemies.golf>0){
				tempLevels[level][tempLevels[level].order[i]].enemies.golf=tempLevels[level][tempLevels[level].order[i]].enemies.golf-1
				mode="enemy"
				chips=chips+toppins
				vibeCheck(mode)
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		while(tempLevels[level][tempLevels[level].order[i]].enemies.stupidRat>0){
			tempLevels[level][tempLevels[level].order[i]].enemies.stupidRat=tempLevels[level][tempLevels[level].order[i]].enemies.stupidRat-1
			mode="rat"
			vibeCheck(mode)
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		while(tempLevels[level][tempLevels[level].order[i]].chips.normal>0){
			tempLevels[level][tempLevels[level].order[i]].chips.normal=tempLevels[level][tempLevels[level].order[i]].chips.normal-1
			chips=chips+chip
			mode="chip"
			vibeCheck(mode)
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
			vibeCheck(mode)
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
			mode="toppin"
			vibeCheck(mode)
		}
		if(tempLevels[level][tempLevels[level].order[i]].hasSecrets[1]&&tempLevels[level][tempLevels[level].order[i]].hasSecrets[0]){
			tempLevels[level][tempLevels[level].order[i]].hasSecrets[1] = false
			mode="secret"
			vibeCheck(mode)
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
		mode="john"
		vibeCheck(mode)
	}
	lengthyLength = Math.min(tempLevels[level].lapOrder.length,debugIt?debug[2]:999)
	for(i=0;i<lengthyLength;i++){
		tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[0] = true
		if(level=="factory"&&i==0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal=tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal+20
			mode="chip"
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
			vibeCheck(mode)
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.normal>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.normal=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.normal-1
			mode="enemy"
			vibeCheck(mode)
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest){
			while((tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest-(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.inaccessableChestDuringLap?tempLevels[level][tempLevels[level].lapOrder[i]].enemies.inaccessableChestDuringLap:0))>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.treasureChest-1
				mode="enemy triple"
				vibeCheck(mode)
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
				mode="enemy"
				vibeCheck(mode)
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.eliteLap-1
				mode="elite"
				vibeCheck(mode)
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
		}
		while((tempLevels[level][tempLevels[level].lapOrder[i]].enemies.elite)>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.elite=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.elite-1
			mode="elite"
			vibeCheck(mode)
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf){
			while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf>0){
				tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.golf-1
				mode="enemy"
				vibeCheck(mode)
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
				chips=chips+toppins
			}
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.lap>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.lap=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.lap-1
			mode="enemy"
			vibeCheck(mode)
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].enemies.stupidRat>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].enemies.stupidRat=tempLevels[level][tempLevels[level].lapOrder[i]].enemies.stupidRat-1
			mode="rat"
			vibeCheck(mode)
			mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
			critRigger[0]=critRigger[0]+(enemy*passiveMult)
			critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
			combo=combo+1
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.normal>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.normal=tempLevels[level][tempLevels[level].lapOrder[i]].chips.normal-1
			chips=chips+chip
			mode="chip"
			vibeCheck(mode)
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
			mode="chip"
			vibeCheck(mode)
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal=tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapNormal-1
			chips=chips+chip
			mode="chip"
			vibeCheck(mode)
		}
		while(tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapBig>0){
			tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapBig=tempLevels[level][tempLevels[level].lapOrder[i]].chips.lapBig-1
			chips=chips+bigChip
			mode="chip"
			vibeCheck(mode)
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
			mode="toppin"
			vibeCheck(mode)
		}
		if(tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[1]&&tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[0]){
			tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[1] = false
			debug[2]=debug[2]+1
			tempLevels[level].lapOrder.splice(i+1,0,tempLevels[level][tempLevels[level].lapOrder[i]].hasSecrets[2]+"")
			mode="secret"
			vibeCheck(mode)
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
				mode="toppin"
				vibeCheck(mode)
			}
		}
		lengthyLength = Math.min(tempLevels[level].lapOrder.length,debugIt?debug[2]:999)
		console.log(tempLevels[level].lapOrder+", "+i)
	}
	lengthyLength = Math.min(tempLevels[level].lapExtraOrder.length,debugIt?debug[3]:999)
	while(Math.min(tempLaps,debug[5])>0){
		mode="laBoost lapping"
		tempLaps=tempLaps-1
		for(i=0;i<lengthyLength;i++){
			vibeCheck(mode)
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
				mode="enemy"
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
				vibeCheck(mode)
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest){
				while((tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest-(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableChestDuringLap?tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableChestDuringLap:0))>0){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.treasureChest-1
					mode="enemy triple"
					vibeCheck(mode)
					mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
					chips=chips+3
					critRigger[0]=critRigger[0]+(enemy*passiveMult)
					critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
					combo=combo+1
				}
			}
			while((tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.elite-tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.inaccessableDuringLap)>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.elite=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.elite-1
				mode="elite"
				vibeCheck(mode)
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
			while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.lap-1
				mode="enemy"
				vibeCheck(mode)
				mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
				critRigger[0]=critRigger[0]+(enemy*passiveMult)
				critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
				combo=combo+1
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap){
				while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap>0){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.eliteLap-1
					mode="elite"
					vibeCheck(mode)
					mult=mult+(enemy*passiveMult*(willICrit()?critDamage:1))
					critRigger[0]=critRigger[0]+(enemy*passiveMult)
					critRigger[1]=critRigger[1]+(enemy*passiveMult*critDamage)
					combo=combo+1
				}
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf){
				while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf>0){
					tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf=tempLevels[level][tempLevels[level].lapExtraOrder[i]].enemies.golf-1
					mode="enemy"
					vibeCheck(mode)
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
				mode="chip"
				vibeCheck(mode)
			}
			while(tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig>0){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig=tempLevels[level][tempLevels[level].lapExtraOrder[i]].chips.lapBig-1
				chips=chips+bigChip
				mode="chip"
				vibeCheck(mode)
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
				mode="toppin"
				vibeCheck(mode)
			}
			if(tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[1]&&tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[0]&&!tempLevels[level][tempLevels[level].lapExtraOrder[i]].secretDENIED){
				tempLevels[level][tempLevels[level].lapExtraOrder[i]].hasSecrets[1] = false
				debug[3]=debug[3]+1
				vibeCheck(mode)
				mode="secret"
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
					mode="toppin"
					vibeCheck(mode)
				}
			}
			lengthyLength = Math.min(tempLevels[level].lapExtraOrder.length,debugIt?debug[3]:999)
			console.log(tempLevels[level].lapExtraOrder+", "+i)
		}
	}
	console.log(critRigger)
	critRigger = [critRigger[0],critRigger[1]]
	vibeCheck("finale")
	money=money+(Math.min(Math.floor(money/5),5))+tempLaps
	document.getElementById("score").innerHTML = `Chips: ${chips} Mult: ${Math.round(mult)} Combo: ${combo} Money: $${money}<br><h1>SCORE:<br><span style="font-size: 24px; color: hsl(0 50% 25%)">${Math.round(chips*critRigger[0])}</span>-<span style="font-size: 28px; color: hsl(25 62.5% 31.25%)">${Math.round((chips+taunt)*critRigger[0])}</span>---<span style="color: hsl(${(chips*mult-(chips*critRigger[0]))/((chips+taunt)*critRigger[1]-(chips*critRigger[0]))*270} ${(chips*mult-(chips*critRigger[0]))/((chips+taunt)*critRigger[1]-(chips*critRigger[0]))*50+50}% ${(chips*mult-(chips*critRigger[0]))/((chips+taunt)*critRigger[1]-(chips*critRigger[0]))*25+25}%)">${Math.round(chips*mult)}</span>---<span style="font-size: 28px; color: hsl(240 87.5% 43.75%)">${Math.round(chips*critRigger[1])}</span>-<span style="font-size: 24px; color: hsl(270 100% 50%)">${Math.round((chips+taunt)*critRigger[1])}</span><br><h1>TOTAL STRENGTH: ${Math.round(chips*mult/scoreRequirement*10)/10}</h1><br>you need 43.75 strength to beat final level`
}

function updateNumbers(){
	document.getElementById("pattern").style["background-position"] = `${Math.round(Date.now()/-100%128)} ${Math.round(Date.now()/100%128)}`
	for(let i=0;i<8;i++){
		let list = ["laps", "passiveMult", "critDamage", "critHit", "money", "comboTime", "upgradeChance","stamp"]
		const numbers = Array.from(String(eval(list[i])*((i==3||i==5||i==6)?100:1)))
		if(!document.getElementById("background"+list[i])){
			const newDiv2 = document.createElement("div");
			newDiv2.id = "background"+list[i]
			document.getElementById("shop").appendChild(newDiv2)
			document.getElementById("background"+list[i]).style=`position:absolute; height:108; width:206; background-image: url(liststuff.png); z-index: 3;`
			document.getElementById("background"+list[i]).style["margin-top"] = `${52*(i%4)-12}`
			document.getElementById("background"+list[i]).style["margin-left"] = `${Math.floor(i/4)*776-9}`
			document.getElementById("background"+list[i]).style["background-position"] = `right ${108*-i},0`
		}
		differenceMaker=0
		if(numbers.includes(".")) differenceMaker = 6
		for(let v=0;v<10;v++){
			if(i==7)
				continue
			if(!document.getElementById("number"+list[i]+v)){
				if(v>=numbers.length)
					continue;
				const newDiv = document.createElement("div");
				newDiv.id = "number"+list[i]+v
				document.getElementById("shop").appendChild(newDiv)
			}
			if(document.getElementById("number"+list[i]+v) && v>=numbers.length){
				document.getElementById("number"+list[i]+v).remove()
			}
			if(v<numbers.length){
				document.getElementById("number"+list[i]+v).style="position:absolute; height:40; width:30; background-image: url(numbers.png); z-index:3;"
				document.getElementById("number"+list[i]+v).style["margin-left"] = `${104-(15*(numbers.length-1))+(v*30)+(Math.floor(i/4)*776)+(Math.round((Math.random()*2-1)*0.505))+differenceMaker}`
				document.getElementById("number"+list[i]+v).style["margin-top"] = `${22+(52*(i%4))+(Math.round((Math.random()*2-1)*0.505))}`
				document.getElementById("number"+list[i]+v).style["background-position"] = `${numbers[v]*-30} 0`
				if(numbers[v].includes(".")) {
					document.getElementById("number"+list[i]+v).style="position:absolute; height:40; width:8; background-image: url(numbers.png); z-index:3;"
					document.getElementById("number"+list[i]+v).style["margin-left"] = `${104-(15*(numbers.length-1))+(v*30)+(Math.floor(i/4)*776)+(Math.round((Math.random()*2-1)*0.505))+differenceMaker}`
					document.getElementById("number"+list[i]+v).style["margin-top"] = `${22+(52*(i%4))+(Math.round((Math.random()*2-1)*0.505))}`
					document.getElementById("number"+list[i]+v).style["background-position"] = `8 0`
					differenceMaker = -14
				}
			}
		}
	}
	for(let i=0;i<100;i++){
		if(!document.getElementById("point"+i)&&i<20){
			const newDiv = document.createElement("div");
			newDiv.id = "point"+(i%20)
			document.getElementById("shop").appendChild(newDiv)
		}
		if(document.getElementById("point"+i) && i>=points){
			document.getElementById("point"+i).remove()
		}
		if(document.getElementById("point"+(i%20))&&points>i){
			document.getElementById("point"+(i%20)).style=`position:absolute; height:27; width:27; background-image: url(point.png); z-index: 5;`
			document.getElementById("point"+(i%20)).style["margin-top"] = `112`
			document.getElementById("point"+(i%20)).style["margin-left"] = `${172+(i%20*31)}`
			document.getElementById("point"+(i%20)).style["background-position"] = `${points-pointsTaken<=i%20?27:0}, 0`
			document.getElementById("point"+(i%20)).style["filter"] = `contrast(${Number(Math.floor(i/20)*15+100)}%) brightness(${Number(Math.floor(i/20)*0.15+1)}) hue-rotate(${Number(Math.floor(i/20)*-30)}deg)`
		}
	}
	for(let i=0;i<6;i++){
		if(!document.getElementById("upgrade"+i)&&i<(upgradeLimit-boughtUpgrades)){
			const newDiv = document.createElement("div");
			newDiv.id = "upgrade"+i
			document.getElementById("shop").appendChild(newDiv)
			document.getElementById("upgrade"+i).addEventListener("click", function(event){buyUpgrade(event.target.id.slice(event.target.id.length-1))})
		}
		if(document.getElementById("upgrade"+i) && i>=(upgradeLimit-boughtUpgrades)){
			document.getElementById("upgrade"+i).remove()
		}
		let randomizer = 0
		let rarity=(Math.random()*100>=99.99?"Mythical":Math.random()*100>=95?"Rare":Math.random()*100>=70?"Uncommon":"Common")
		while(availableUpgrades.length<(upgradeLimit-boughtUpgrades)){
			check=true
			randomizer=Math.floor(Math.random()*32)
			for(let v=0;v<Object.keys(upgradesOwnedStats).length;v++){
				if(Object.keys(upgrades)[randomizer].includes(upgradeId[upgradesOwnedStats[v].id])&&(upgradesOwnedStats[v].tier>=upgradesOwnedStats[v].maxTier))
					check = false
			}
			if(!availableUpgrades.includes(Object.keys(upgrades)[randomizer])&&!upgrades[Object.keys(upgrades)[randomizer]].unused && upgrades[Object.keys(upgrades)[randomizer]].rarity==rarity&&check){
				availableUpgrades[availableUpgrades.length] = Object.keys(upgrades)[randomizer]
				rarity=(Math.random()*100>=99.99?"Mythical":Math.random()*100>=95?"Rare":Math.random()*100>=70?"Uncommon":"Common")
			}
			randomizer=Math.floor(Math.random()*32)
			check=true
		}
		if(document.getElementById("upgrade"+i)){
			document.getElementById("upgrade"+i).style = `position:absolute; height:64; width:64; background-image: url(upgrades.png); z-index: 5;`
			document.getElementById("upgrade"+i).style["margin-top"] = `358`
			document.getElementById("upgrade"+i).style["margin-left"] = `${373+(i*80)-((availableUpgrades.length-1)*40)}`
			document.getElementById("upgrade"+i).style["background-position"] = `0 ${Number(upgrades[availableUpgrades[i]].id)*-64}px`
		}
	}
	stampSelect(stamp,false)
	for(let i=0;i<20;i++){
		if(!document.getElementById("upgradeOwned"+i)&&i<Object.keys(upgradesOwnedStats).length){
			const newDiv = document.createElement("div");
			newDiv.id = "upgradeOwned"+i
			document.getElementById("shop").appendChild(newDiv)
			document.getElementById("upgradeOwned"+i).addEventListener("click", function(event){sellUpgrade(event.target.id.slice(event.target.id.length-1))})
		}
		if(document.getElementById("upgradeOwned"+i) && i>=Object.keys(upgradesOwnedStats).length){
			document.getElementById("upgradeOwned"+i).remove()
		}
		if(document.getElementById("upgradeOwned"+i)){
			document.getElementById("upgradeOwned"+i).style = `position:absolute; height:64; width:64; background-image: url(upgrades.png); z-index: 5;`
			document.getElementById("upgradeOwned"+i).style["margin-top"] = `24`
			document.getElementById("upgradeOwned"+i).style["margin-left"] = `${435+(i*80)-((Object.keys(upgradesOwnedStats).length-1)*40)}`
			document.getElementById("upgradeOwned"+i).style["background-position"] = `${Number(upgradesOwnedStats[i].tier-1)*-64} ${Number(upgradesOwnedStats[i].id)*-64}px`
			if(typeof upgradesOwnedStats[i].effectType =="string"){
				if(upgradesOwnedStats[i].effectType=="Mult")
					passiveMult=passiveMult*upgradesOwnedStats[i].effect()
				if(upgradesOwnedStats[i].effectType=="Lap Amount")
					laps=laps+upgradesOwnedStats[i].effect()
				if(upgradesOwnedStats[i].effectType=="Starting Chips")
					startingChip=startingChip+upgradesOwnedStats[i].effect()
				if(upgradesOwnedStats[i].effectType=="Starting Mult")
					startingMult=startingMult+upgradesOwnedStats[i].effect()
				if(upgradesOwnedStats[i].effectType=="Critical Chance")
					critHit=critHit+upgradesOwnedStats[i].effect()
				if(upgradesOwnedStats[i].effectType=="Combo Time")
					comboTime=comboTime+upgradesOwnedStats[i].effect()
				if(upgradesOwnedStats[i].effectType=="Upgrade Chance")
					upgradeChance=upgradeChance+upgradesOwnedStats[i].effect()
			}
			if(typeof upgradesOwnedStats[i].effectType =="object"){
				for(let v=0;v<upgradesOwnedStats[v].effectType.length;v++){
					if(upgradesOwnedStats[i].effectType[v]=="Mult")
						passiveMult=passiveMult*upgradesOwnedStats[i].effect()[v]
					if(upgradesOwnedStats[i].effectType[v]=="Lap Amount")
						laps=laps+upgradesOwnedStats[i].effect()[v]
					if(upgradesOwnedStats[i].effectType[v]=="Starting Chips")
						startingChip=startingChip+upgradesOwnedStats[i].effect()[v]
					if(upgradesOwnedStats[i].effectType[v]=="Starting Mult")
						startingMult=startingMult+upgradesOwnedStats[i].effect()[v]
					if(upgradesOwnedStats[i].effectType[v]=="Critical Chance")
						critHit=critHit+upgradesOwnedStats[i].effect()[v]
					if(upgradesOwnedStats[i].effectType[v]=="Combo Time")
						comboTime=comboTime+upgradesOwnedStats[i].effect()[v]
					if(upgradesOwnedStats[i].effectType[v]=="Upgrade Chance")
						upgradeChance=upgradeChance+upgradesOwnedStats[i].effect()[v]
				}
			}
		}
	}
}

function buyUpgrade(x){
	console.log(Number(x))
	check = false
	if(money<upgrades[availableUpgrades[Number(x)]].cost || (points-pointsTaken)<upgrades[availableUpgrades[Number(x)]].points)
		return;
	document.getElementById("upgrade"+Number(x)).remove()
	money=money-upgrades[availableUpgrades[Number(x)]].cost
	console.log(upgradesOwnedStats[Object.keys(upgradesOwnedStats).length-1])
	for(let i=0;i<Object.keys(upgradesOwnedStats).length;i++){
		if(Object.keys(upgrades)[upgradeId.indexOf(availableUpgrades[x])].includes(upgradeId[upgradesOwnedStats[i].id])){
			upgradesOwnedStats[i].tier += 1
			upgradesOwnedStats[i].cost += 1
			check=true
		}
	}
	if(!check){
	upgradesOwnedStats[Object.keys(upgradesOwnedStats).length]=structuredClone(JSON.parse(JSON.stringify(upgrades[availableUpgrades[Number(x)]])))
	upgradesOwnedStats[Object.keys(upgradesOwnedStats).length-1].effect = upgrades[availableUpgrades[Number(x)]].effect
	upgradesOwnedStats[Object.keys(upgradesOwnedStats).length-1].tier = 1
	upgradesOwnedStats[Object.keys(upgradesOwnedStats).length-1].cost = Math.floor(upgradesOwnedStats[Object.keys(upgradesOwnedStats).length-1].cost/2)
	pointsTaken = pointsTaken+upgradesOwnedStats[Object.keys(upgradesOwnedStats).length-1].points
	}
	boughtUpgrades=boughtUpgrades+1
	availableUpgrades.splice(Number(x),1)
}

function sellUpgrade(x){
	console.log(x)
	document.getElementById("upgradeOwned"+x).remove()
	pointsTaken = pointsTaken-upgradesOwnedStats[x].points
	money=money+upgradesOwnedStats[x].cost
	if(upgradesOwnedStats[x].name=="The Gauntlet"&&upgradesOwnedStats[x].value>=(gauntletLaps>0?600:200))
		gauntletLaps = gauntletLaps+1
	delete upgradesOwnedStats[x]
	let count = 1
	console.log(Number(x)+count)
	while(!!upgradesOwnedStats[Number(x)+count]){ 
		upgradesOwnedStats[Number(x)+count-1] = upgradesOwnedStats[Number(x)+count]
		console.log(upgradesOwnedStats[Number(x)+count-1])
		count=count+1
	}
	delete upgradesOwnedStats[Number(x)+count-1]
}

function reroll(){
	if(money<rerollCost)
		return;
	availableUpgrades = []
	boughtUpgrades = 0
	money=money-rerollCost
	rerollCost+=1
	document.getElementById("shopDescPart").innerHTML = `<h2>REROLL<br>[$${rerollCost}]</h2>`
	for(let i=0;i<6;i++){
		if(document.getElementById("upgrade"+i)){
			document.getElementById("upgrade"+i).remove()
		}
	}
}

function hasAnyKey(obj1, obj2) {
  const keys2 = Object.keys(obj2);
  // Array.prototype.some() will return true as soon as it finds a match
  return keys2.some(key => Object.hasOwn(obj1, key)); 
}

let update = setInterval(updateNumbers, 1000/60)