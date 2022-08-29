// no brain
// head empty

// Known Bugs: 
// > Evee, when evolving is fixed, will have a much higher chance of evolving into an evolution with less max hp than the other 2. 
// > API lags occasionally, causing the first enemy move of a fight to be a duplicate of your own move when spam-clicking an attack
// > When a pokemon faints and is changed out, their sprite appears for a moment before the pokemon changes

// [[[Bugs marked with a * are possibly fixed and need to be tested]]]


// Future Features Wish List:
// Implementing Gen2
// Party healing when out of battle
// 

window.canAttack = false;
window.potions = 10
window.superPotions = 5
window.greatBalls = 5
window.show = false
window.isPokemonShiny = undefined
window.isPlayerPokemonShiny = false
window.isPokemonEvolved = false;
window.killCount = 0
let potion = new Audio("jumpsound.wav")
let pokeball = new Audio("pokeball.wav")
let boop = new Audio("boop.wav")

// Stores the player's pokemon when not in use
window.playerParty = [
    slot1 = {
        hp: undefined, maxHp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot2 = {
        hp: undefined, maxHp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot3 = {
        hp: undefined, maxHp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot4 = {
        hp: undefined, maxHp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot5 = {
        hp: undefined, maxHp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    }
]

// All pokemon that cant be evolved into 
// Current version of game only uses first 151 pokemon, future versions will include other generations. 
window.basePokemon = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 95, 96, 98, 100, 102, 104, 106, 107, 108, 109, 111, 113, 114, 115, 116, 118, 120, 122, 123, 124, 125, 126, 127, 128, 129, 131, 132, 133, 134, 135, 136, 137, 138, 140, 142, 143, 144, 145, 146, 147, 150, 151, 152, 155, 158, 161, 163, 165, 167, 169, 170, 172, 173, 174, 175, 177, 179, 182, 183, 185, 186, 187, 190, 191, 193, 194, 196, 197, 198, 199, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 215, 216, 218, 220, 222, 223, 225, 226, 227, 228, 230, 231, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 249, 250, 251]

// Here to line 63 is all WIP for adding GEN 2 Pokemon
window.evolveBlacklist = [242, 240, 239, 238, 237, 236, 233, 230, 212, 208, 199, 186, 182, 172, 173, 174, 169, 133]
// 242 240 239, 238, 237, 236, 233, 230, 212, 208, 199, 186, 182, 172, 173, 174,

window.scy = 212 //123
window.onix = 208 //95
window.slow = 199 //17
window.poliList = [62, 186] //61
window.gloomList = [78, 182] //77
window.lairy = 35 //173
window.ggly = 39 //174
window.pikaList = [25] //172
window.batList = [169] // 42

window.eveList = [134, 135, 136] //133


// Gives player starter pokemon
async function pickStarters() {

    let starterImg1 = document.getElementById("starter1")
    const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/2`);
    starterImg1.setAttribute("src", pokemonData.data.sprites.front_default)

    let starterImg2 = document.getElementById("starter2")
    const pokemonData2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/5`);
    starterImg2.setAttribute("src", pokemonData2.data.sprites.front_default)

    let starterImg3 = document.getElementById("starter3")
    const pokemonData3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/8`);
    starterImg3.setAttribute("src", pokemonData3.data.sprites.front_default)

    document.getElementById("starter1").addEventListener("click", function () { setStarter(1) })
    document.getElementById("starter2").addEventListener("click", function () { setStarter(2) })
    document.getElementById("starter3").addEventListener("click", function () { setStarter(3) })
}

// Sets the starter pokemon when the pokemon is clicked
async function setStarter(chosenStarter) {
    document.getElementById("chooseStarter").style.visibility = "hidden";
    document.getElementById("backgroundMusic").loop = true;
    document.getElementById("backgroundMusic").play();
    document.getElementById("backgroundMusic").volume = 0.3;
    if (chosenStarter == 1) {
        let img = await getPokemonBackImg(2)
        document.getElementById("playerPokemonImg").setAttribute("src", img)
        let hp = await getPokemonHP(2)
        window.playerHP = hp
        window.playerMaxHp = hp
        document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
        await getPokemonAttacks(2)
        document.getElementById("playerPokemonName").innerText = await getName(2)
        window.playerID = 2
        window.currentPokemonEXP = 0
        window.currentPokemonLvl = 1
        document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
    }
    else
        if (chosenStarter == 2) {
            let img = await getPokemonBackImg(5)
            document.getElementById("playerPokemonImg").setAttribute("src", img)
            let hp = await getPokemonHP(5)
            window.playerHP = hp
            window.playerMaxHp = hp
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
            await getPokemonAttacks(5)
            document.getElementById("playerPokemonName").innerText = await getName(5)
            window.playerID = 5
            window.currentPokemonEXP = 0
            window.currentPokemonLvl = 1
            document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
        }
        else
            if (chosenStarter == 3) {
                let img = await getPokemonBackImg(8)
                document.getElementById("playerPokemonImg").setAttribute("src", img)
                let hp = await getPokemonHP(8)
                window.playerHP = hp
                window.playerMaxHp = hp
                document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
                await getPokemonAttacks(8)
                document.getElementById("playerPokemonName").innerText = await getName(8)
                window.playerID = 8
                window.currentPokemonEXP = 0
                window.currentPokemonLvl = 1
                document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
            }
    window.canAttack = true;
    await makeEnemyPokemon()
}


// ===================================
// RETURN DIFFERENT DATA ABOUT POKEMON
// ===================================
async function getPokemonBackImg(id, shiny) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    if (shiny == true) {
        return (pokemonData.data.sprites.back_shiny);
    } else {
        return (pokemonData.data.sprites.back_default);
    }
}
async function getPokemonFrontImg(id, shiny) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    if (shiny == true) {
        return (pokemonData.data.sprites.front_shiny);
    } else {
        return (pokemonData.data.sprites.front_default);
    }
}
async function getPokemonHP(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    return (pokemonData.data.stats[0].base_stat);
}
async function getName(id) {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const pokemonData = await axios.get(url);
    return capitalizeFirstLetter(pokemonData.data.species.name)
}
async function getPokemonAttacks(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    let attackArray = []
    for (let i = 0; i < 4; i++) {
        attack = Math.floor(Math.random() * (pokemonData.data.moves.length))
        if (attack == attackArray[0] || attack == attackArray[1] || attack == attackArray[2] || attack == attackArray[3]) {
            i -= 1
        } else {
            attackArray.push(attack)
        }
    }
    let attack1 = pokemonData.data.moves[attackArray[0]].move.name
    let attack2 = pokemonData.data.moves[attackArray[1]].move.name
    let attack3 = pokemonData.data.moves[attackArray[2]].move.name
    let attack4 = pokemonData.data.moves[attackArray[3]].move.name
    window.attack1 = attack1
    window.attack2 = attack2
    window.attack3 = attack3
    window.attack4 = attack4
    document.getElementById("attack1").innerText = capitalizeFirstLetter(attack1.replace("-", " "))
    document.getElementById("attack2").innerText = capitalizeFirstLetter(attack2.replace("-", " "))
    document.getElementById("attack3").innerText = capitalizeFirstLetter(attack3.replace("-", " "))
    document.getElementById("attack4").innerText = capitalizeFirstLetter(attack4.replace("-", " "))
    setMoveColor("attack1", await getMoveType(window.attack1))
    setMoveColor("attack2", await getMoveType(window.attack2))
    setMoveColor("attack3", await getMoveType(window.attack3))
    setMoveColor("attack4", await getMoveType(window.attack4))

    return (pokemonData.data.stats[0].base_stat);
}
async function getNewPokemonMoves(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    let attackArray = []
    for (let i = 0; i < 4; i++) {
        attack = Math.floor(Math.random() * (pokemonData.data.moves.length))
        if (attack == attackArray[0] || attack == attackArray[1] || attack == attackArray[2] || attack == attackArray[3]) {
            i -= 1
        } else {
            attackArray.push(attack)
        }
    }
    attack1temp = await pokemonData.data.moves[attackArray[0]].move.name
    attack2temp = await pokemonData.data.moves[attackArray[1]].move.name
    attack3temp = await pokemonData.data.moves[attackArray[2]].move.name
    attack4temp = await pokemonData.data.moves[attackArray[3]].move.name
    newArray = [attack1temp, attack2temp, attack3temp, attack4temp]
    return newArray
}
async function setMoveColorOnSwap(moveArray) {
    setMoveColor("attack1", await getMoveType(moveArray[0]))
    setMoveColor("attack2", await getMoveType(moveArray[1]))
    setMoveColor("attack3", await getMoveType(moveArray[2]))
    setMoveColor("attack4", await getMoveType(moveArray[3]))
}
async function getEnemyMove(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    attack = Math.floor(Math.random() * (pokemonData.data.moves.length))
    console.log("Enemy uses " + pokemonData.data.moves[attack].move.name);
    return pokemonData.data.moves[attack].move.name;
}
// Changed the color of the background of the attack button
function setMoveColor(element, name) {
    if (name == "normal") {
        document.getElementById(element).style.backgroundColor = "#c0c0c0"
    }
    else if (name == "fire") {
        document.getElementById(element).style.backgroundColor = "#FA7053"
    }
    else if (name == "water") {
        document.getElementById(element).style.backgroundColor = "#798CFF"
    }
    else if (name == "grass") {
        document.getElementById(element).style.backgroundColor = "#71FF7F"
    }
    else if (name == "flying") {
        document.getElementById(element).style.backgroundColor = "#F8F8F8"
    }
    else if (name == "fighting") {
        document.getElementById(element).style.backgroundColor = "#AA0019"
    }
    else if (name == "poison") {
        document.getElementById(element).style.backgroundColor = "#914AFF"
    }
    else if (name == "electric") {
        document.getElementById(element).style.backgroundColor = "#FFF950"
    }
    else if (name == "ground") {
        document.getElementById(element).style.backgroundColor = "#6C3A00"
    }
    else if (name == "rock") {
        document.getElementById(element).style.backgroundColor = "#B06000"
    }
    else if (name == "psychic") {
        document.getElementById(element).style.backgroundColor = "#DE40FF"
    }
    else if (name == "ice") {
        document.getElementById(element).style.backgroundColor = "#A1FFFE"
    }
    else if (name == "bug") {
        document.getElementById(element).style.backgroundColor = "#A1D053"
    }
    else if (name == "ghost") {
        document.getElementById(element).style.backgroundColor = "#8073A6"
    }
    else if (name == "steel") {
        document.getElementById(element).style.backgroundColor = "#A6A6A6"
    }
    else if (name == "dragon") {
        document.getElementById(element).style.backgroundColor = "#7414FF"
    }
    else if (name == "dark") {
        document.getElementById(element).style.backgroundColor = "#3F3E5D"
    }
    else if (name == "fairy") {
        document.getElementById(element).style.backgroundColor = "#F59CF7"
    }
}
async function getMoveType(name) {
    let url = await axios.get("https://pokeapi.co/api/v2/move/" + name);
    let typ = await url.data.type.name
    return typ
}
async function getPokemonType(id) {
    let url = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
    let types = [];
    types.push(url.data.types[0].type.name)
    if (url.data.types.length == 2) {
        types.push(url.data.types[1].type.name)
    } else {
        types.push(undefined)
    }
    return types
}


// We stole these two functions off Stack Overflow
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function scrollToBottom() {
    var objDiv = document.getElementById("log");
    objDiv.scrollTop = objDiv.scrollHeight;
}

// Pulls up type advantages sheet
function showTypeAdvantage() {
    if (window.show == false) {
        document.getElementById("typeAdvantagesImg").style.visibility = "visible"
        window.show = true
    } else {
        document.getElementById("typeAdvantagesImg").style.visibility = "hidden"
        window.show = false
    }
}


// Spawn new enemy pokemon
async function makeEnemyPokemon() {
    let id = Math.floor((Math.random() * 151) + 1)
    window.enemyID = id
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const pokemonData = await axios.get(url);
    let rng = (Math.floor(Math.random() * 50) + 1)
    // Decides if shiny
    if (rng == 42) {
        window.isPokemonShiny = true;
        document.getElementById("enemyPokemonImg").setAttribute("src", pokemonData.data.sprites.front_shiny)
        document.getElementById("log").innerHTML += "Shiny " + await getName(window.enemyID) + " has appeared! <br>"
        scrollToBottom()
    } else {
        window.isPokemonShiny = false;
        document.getElementById("enemyPokemonImg").setAttribute("src", pokemonData.data.sprites.front_default)
        document.getElementById("log").innerHTML += await getName(window.enemyID) + " has appeared! <br>"
        scrollToBottom()
    }
    document.getElementById("enemyPokemonName").innerText = await getName(id)
    document.getElementById("enemyPokemonHP").innerText = "HP: " + await getPokemonHP(id)
    window.enemyHP = await getPokemonHP(id)
    enemyLvl = Math.floor((window.enemyHP / 10))
    document.getElementById("enemyPokemonLvl").innerText = "Lvl: " + enemyLvl

    setTimeout(async () => {
        document.getElementById("enemyPokemonImg").style.visibility = 'visible'
    }, 200)
}


// Attack Loop - Heart and Soul of the whole project
async function doAttack(target, attack) {
    if (attack == "attack1") {
        currentAttack = window.attack1
    } else if (attack == "attack2") {
        currentAttack = window.attack2
    } else if (attack == "attack3") {
        currentAttack = window.attack3
    } else if (attack == "attack4") {
        currentAttack = window.attack4
    }
    let chance = Math.floor((Math.random() * 10) + 1)
    if (chance == 1) {
        dmg = 0
    } else if (chance == 10) {
        dmg = Math.floor((Math.random() * 15) + 15)
        if (window.isPokemonEvolved == true) {
            dmg += Math.floor((Math.random() * 5) + 10)
        }
    } else {
        dmg = Math.floor((Math.random() * 5) + 5)
        if (window.isPokemonEvolved == true) {
            dmg += Math.floor((Math.random() * 5) + 5)
        }
    }
    // Checks if the player is attacking
    if (target == "enemy" && window.canAttack == true) {
        window.canAttack = false;
        boop.play()
        jiggle("player")

        // Call that HUGE if statement below - adds bonus dmg based on type of move vs type of pokemon
        bonus = await checkEffective(currentAttack, "enemy", 0)
        bonus += await checkEffective(currentAttack, "enemy", 1)

        if ((dmg + bonus) < window.enemyHP) {
            // Enemy doesnt faint and takes dmg
            if (dmg == 0) {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                document.getElementById("log").innerHTML += await getName(window.playerID) + " missed! <br>"
                scrollToBottom()
            } else if (dmg >= 15) {
                // Failsafe for bonus being less than dmg is positive
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                window.enemyHP -= dmg + bonus
                debugDmg = dmg + bonus
                console.log("Damage Delt: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit by " + currentAttack + "! (CRITICAL!!!) <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += " * * It was super effective! * * <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += " * * It wasn't very effective.. * * <br>"
                }
                scrollToBottom()
                window.canAttack = false;
            } else {
                // Failsafe for bonus being less than dmg is positive
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                window.enemyHP -= dmg + bonus
                debugDmg = dmg + bonus
                console.log("Damage Delt: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit by " + currentAttack + "! <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += " * * It was super effective! * * <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += " * * It wasn't very effective.. * * <br> "
                }
                scrollToBottom()
                window.canAttack = false;
            }
        } else if (dmg > 0) {
            // Enemy faints
            window.canAttack = false
            document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit by " + currentAttack + " and fainted! <br>"
            scrollToBottom()
            document.getElementById("enemyPokemonHP").innerText = "HP: Fainted!"
            document.getElementById("enemyPokemonImg").style.visibility = 'hidden'
            window.killCount++
            document.getElementById("killCount").innerText = window.killCount
            await gainEXP()
            if (true) {
                dropRng = Math.floor(Math.random() * 10) + 1
                console.log(dropRng);
                if (dropRng == 1) {
                    window.greatBalls++
                    document.getElementById("log").innerHTML += "* You Found a Greatball! <br>"
                    scrollToBottom()
                    document.getElementById("bagButton4").innerHTML = "Greatballs: " + window.greatBalls
                } else if (dropRng > 1 && dropRng < 5) {
                    numberDrops = Math.floor(Math.random()*2) +1
                    window.superPotions += numberDrops
                    document.getElementById("log").innerHTML += "* You Found " + numberDrops + " Super Potion(s)! <br>"
                    document.getElementById("bagButton3").innerHTML = "Super Potions: " + window.superPotions
                    scrollToBottom()
                } else {
                    numberDrops = Math.floor(Math.random() * 2) + 1
                    window.potions += Math.floor(Math.random() * 3) + 1
                    document.getElementById("log").innerHTML += "* You Found " + numberDrops + " Potion(s)! <br>"
                    document.getElementById("bagButton1").innerHTML = "Potion: " + window.potions
                    scrollToBottom()
                }
            }
            setTimeout(makeEnemyPokemon, 2000);
        }

        if (document.getElementById("enemyPokemonImg").style.visibility == "visible") {
            document.getElementById("enemyPokemonHP").innerText = "HP: " + window.enemyHP
            setTimeout(doAttack, 1000, "player");
        } else {
            setTimeout(() => {
                window.canAttack = true
            }, 3000);
        }
    }

    // Detects if enemy attacks player
    else if (target == "player") {
        let chance = Math.floor((Math.random() * 10) + 1)
        if (chance == 1) {
            dmg = 0
        } else if (chance == 10) {
            dmg = Math.floor((Math.random() * 15) + 10)
        } else {
            dmg = Math.floor((Math.random() * 5) + 5)
        }
        jiggle("enemy")
        currentAttack = await getEnemyMove(window.enemyID)

        bonus = await checkEffective(currentAttack, "player", 0)
        bonus += await checkEffective(currentAttack, "player", 1)

        if ((dmg + bonus) < window.playerHP) {
            window.playerHP -= dmg + bonus
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
            window.canAttack = true

            if (dmg == 0) {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " missed! <br>"
                scrollToBottom()
            } else if (dmg >= 15) {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                debugDmg = dmg + bonus
                console.log("Damage Dealt to player: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit by " + currentAttack + "! (CRITICAL!!!) <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += " * * It was super effective! * * <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += " * * It wasn't very effective.. * * <br>"
                }
                scrollToBottom()
            } else {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                debugDmg = dmg + bonus
                console.log("Damage Dealt to player: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit by " + currentAttack + "! <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += " * * It was super effective! * * <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += " * * It wasn't very effective.. * * <br> "
                }
                scrollToBottom()
            }
        } else {
            if (dmg + bonus < 0) {
                bonus = dmg - (dmg * 2)
            }
            debugDmg = dmg + bonus
            console.log("Damage Dealt to player: " + debugDmg + "(" + dmg + "+" + bonus + ")");
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit by " + currentAttack + " and fainted! <br>"
            scrollToBottom()
            document.getElementById("playerPokemonHP").innerText = "Fainted! :HP"
            window.playerHP = 0
            document.getElementById("playerPokemonImg").style.visibility = "hidden"
            if (window.playerParty[0].hp != 0 || window.playerParty[1].hp != 0 || window.playerParty[2].hp != 0 || window.playerParty[3].hp != 0 || window.playerParty[4].hp != 0 || window.playerParty[5].hp != 0 || window.playerParty[0].hp != undefined || window.playerParty[1].hp != undefined || window.playerParty[2].hp != undefined || window.playerParty[3].hp != undefined || window.playerParty[4].hp != undefined || window.playerParty[5].hp != undefined) {
                window.canChange = true
            }
        }
    }
}

// Handles all bonus damage
async function checkEffective(currentAttack, target, index) {
    // Bonus Damage 
    bonus = 0
    if (target == "player") {
        pokemonType = await getPokemonType(window.playerID)
    } else {

        pokemonType = await getPokemonType(window.enemyID)
    }
    currentMoveType = await getMoveType(currentAttack)
    let type1 = index

    if (pokemonType[type1] == "normal") {

        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

    }
    if (pokemonType[type1] == "fighting") {

        if (currentMoveType == "flying") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "psychic") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "normal") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "flying") {

        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "electric") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "fighting") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "poison") {

        if (currentMoveType == "psychic") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "fire") {

        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "water") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "water") {
        if (currentMoveType == "grass") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "electric") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fire") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "electric") {
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "water") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "grass") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "water") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "ice") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dragon") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "ground") {
        if (currentMoveType == "water") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "grass") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fire") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "electric") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "psychic") {
        if (currentMoveType == "bug") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ghost") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fighting") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "bug") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "psychic") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "ghost") {
        if (currentMoveType == "ghost") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "psychic") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        // Removed IF statement making ghost good against ghost
    }
    if (pokemonType[type1] == "rock") {
        if (currentMoveType == "water") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "grass") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fire") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "dark") {
        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "psychic") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ghost") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "dragon") {
        // removed IF statement making dragon bad against dragon
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "dragon") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "steel") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fight") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "fairy") {
        if (currentMoveType == "steel") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fighting") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dragon") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    return bonus
}

// Makes the pokemon / pokeball jiggle
function jiggle(victim) {
    if (victim == "player") {
        document.getElementById("playerPokemon").style.justifyContent = "center"
        setTimeout(() => {
            document.getElementById("playerPokemon").style.justifyContent = ""
        }, 100);
    } else if (victim == "enemy") {
        document.getElementById("enemyPokemon").style.justifyContent = "center"
        setTimeout(() => {
            document.getElementById("enemyPokemon").style.justifyContent = ""
        }, 100);
    }
}

// When a potion is used
async function usePotion() {
    if (window.canAttack == true && window.potions > 0) {
        window.canAttack = false
        potion.play()
        window.potions--
        document.getElementById("bagButton1").innerHTML = "Potions: " + window.potions
        document.getElementById("log").innerHTML += "You used a Potion!<br>"
        if (await window.playerMaxHp > (window.playerHP + 20)) {
            window.playerHP += 20
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed! They gained 20hp! <br>"
            scrollToBottom()
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
        } else {
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed to full health! <br>"
            scrollToBottom()
            window.playerHP = await window.playerMaxHp
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
        }
        document.getElementById("log").innerHTML += "You have " + window.potions + " Potions left. <br>"
        document.getElementById("playerPokemon").style.top = "-3%"
        setTimeout(() => {
            document.getElementById("playerPokemon").style.top = "0"
        }, 200)

        setTimeout(doAttack, 1000, "player");
    }
}

// When a super potion is used
async function useSuperPotion() {
    if (window.canAttack == true && window.superPotions > 0) {
        window.canAttack = false
        window.superPotions--
        potion.play()
        document.getElementById("bagButton3").innerHTML = "Super Potions: " + window.superPotions
        document.getElementById("log").innerHTML += "You used a Super Potion!<br>"
        if (await window.playerMaxHp > (window.playerHP + 50)) {
            window.playerHP += 50
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed! They gained 50hp! <br>"
            scrollToBottom()
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
        } else {
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed to full health! <br>"
            scrollToBottom()
            window.playerHP = await window.playerMaxHp
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
        }
        document.getElementById("log").innerHTML += "You have " + window.superPotions + " Super Potions left.<br>"
        document.getElementById("playerPokemon").style.top = "-3%"
        setTimeout(() => {
            document.getElementById("playerPokemon").style.top = "0"
        }, 200)

        setTimeout(doAttack, 1000, "player");
    }
}

// Bag icon style controls
function openBag() {
    document.getElementById("bagImg").style.visibility = "hidden"
    document.getElementById("closeBag").style.visibility = "visible"
    document.getElementById("bagButton1").style.visibility = "visible"
    document.getElementById("bagButton2").style.visibility = "visible"
    document.getElementById("bagButton3").style.visibility = "visible"
    document.getElementById("bagButton4").style.visibility = "visible"
}
function closeBag() {
    document.getElementById("bag").style.backgroundColor = "none"
    document.getElementById("bagImg").style.visibility = "visible"
    document.getElementById("closeBag").style.visibility = "hidden"
    document.getElementById("bagButton1").style.visibility = "hidden"
    document.getElementById("bagButton2").style.visibility = "hidden"
    document.getElementById("bagButton3").style.visibility = "hidden"
    document.getElementById("bagButton4").style.visibility = "hidden"
}

// When pokemon is fainted or captured, exp is gained based on hp of enemy
async function gainEXP() {
    exp = await getPokemonHP(window.enemyID)
    exp = exp * 66
    console.log("EXP: " + exp);
    console.log("New exp total " + window.currentPokemonEXP);
    window.currentPokemonEXP = window.currentPokemonEXP + exp
    for (i = 0; i < 99; i++) {
        setTimeout(async () => {
            if (window.currentPokemonEXP / 5000 >= 1) {
                window.currentPokemonEXP = window.currentPokemonEXP - 5000
                window.currentPokemonLvl += 1
                console.log(window.currentPokemonEXP + "exp");
                window.playerMaxHp += 15
                if (window.playerHP < window.playerMaxHp && window.playerHP + 15 != window.playerMaxHp) {
                    window.playerHP += 15
                } else {
                    window.playerHP = window.playerMaxHp
                }
                document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
                document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
                document.getElementById("log").innerHTML += await getName(playerID) + " is now level " + window.currentPokemonLvl + " <br> "
                tryEvolve()
            } else {
                document.getElementById("log").innerHTML += await getName(playerID) + " gained " + exp + "EXP <br> "
            }
        }, 100)
    }
}

// Tries to evolve your pokemon when exp is gained
async function tryEvolve() {
    id = window.playerID + 1
    // if (window.playerID == 133) {
    //     id = 135
    // }
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    let pokemonData = await axios.get(url);
    if (window.basePokemon.includes(id) == false && id != 133) {
        // If next pokemon in pokedex != base pokemon, do things.
        if (await getPokemonHP(id) <= window.playerMaxHp) {
            // if (id == 135){
            //     id = window.eveList[Math.floor(Math.random()*2)+1]
            //     console.log(id);
            // }
            if (window.isPlayerPokemonShiny == true) {
                document.getElementById("playerPokemonImg").setAttribute("src", pokemonData.data.sprites.back_shiny)
            } else {
                // If next pokemon has less or equal maxHP than player pokemon, do things.
                document.getElementById("playerPokemonImg").setAttribute("src", pokemonData.data.sprites.back_default)
            }
            document.getElementById("playerPokemonName").innerText = await getName(id)
            document.getElementById("log").innerHTML += "================ <br> Your " + await getName(window.playerID) + " Evolved into a " + await getName(id) + "<br> ================ <br>"
            console.log("YOU EVOLVED");
            window.playerID = id
            if (window.playerHP < await getPokemonHP(id)) {
                window.playerMaxHp = await getPokemonHP(id)
            } else {
                extraHP = window.playerHP - await getPokemonHP(id)
                window.playerMaxHp = await getPokemonHP(id) + extraHP
                console.log(extraHP);
            }
            console.log(playerMaxHp);
            window.playerHP = window.playerMaxHp
            getPokemonAttacks(window.playerID)
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
            window.isPokemonEvolved = true
        }
    }
}

// Tries to catch pokemon with normal pokeball
async function tryPokeball() {
    if (window.canAttack == true) {
        window.canAttack = false
        document.getElementById("enemyPokemonImg").setAttribute("src", "images/pokeball.png")
        document.getElementById("log").innerHTML += "Trying to catch Pokemon..."
        scrollToBottom()

        setTimeout(jiggle, 1000, 'enemy')
        setTimeout(jiggle, 2500, 'enemy')
        setTimeout(jiggle, 4000, 'enemy')

        setTimeout(async () => {
            if (window.enemyHP <= 70 && window.enemyID != 132) {
                chance = 100 - window.enemyHP
            } else {
                chance = 0
            }
            rng = Math.floor(Math.random() * 100) + 1
            console.log("chance to catch: " + rng + '<' + chance + '?');
            if (rng <= chance) {
                catchPokemon()
            } else {
                document.getElementById("log").innerHTML += "The Pokemon broke free! <br>";
                scrollToBottom()
                temp = await getPokemonFrontImg(window.enemyID, window.isPokemonShiny)
                document.getElementById("enemyPokemonImg").setAttribute("src", temp);

                setTimeout(doAttack, 1000, "player")
            }
        }, 7000)
    }
}
// Tries to catch pokemon using a greatball
async function tryGreatball() {
    if (window.canAttack == true && window.greatBalls > 0) {
        window.canAttack = false;
        window.greatBalls--
        document.getElementById("enemyPokemonImg").setAttribute("src", "images/greatball.png")
        document.getElementById("bagButton4").innerHTML = "Greatballs: " + window.greatBalls
        document.getElementById("log").innerHTML += "Trying to catch Pokemon... "
        scrollToBottom()

        setTimeout(jiggle, 1000, 'enemy')
        setTimeout(jiggle, 2500, 'enemy')
        setTimeout(jiggle, 4000, 'enemy')

        setTimeout(async () => {
            if (window.enemyHP <= 120 && window.enemyID != 132) {
                chance = 120 - window.enemyHP
            } else {
                chance = 0
            }
            rng = Math.floor(Math.random() * 100) + 1
            console.log("chance to catch: " + rng + '<' + chance + '?');
            if (rng <= chance) {
                catchPokemon()
            } else {
                document.getElementById("log").innerHTML += "The Pokemon broke free! <br>"
                temp = await getPokemonFrontImg(window.enemyID, window.isPokemonShiny)
                document.getElementById("enemyPokemonImg").setAttribute("src", temp)
                scrollToBottom()
                setTimeout(doAttack, 1000, "player")
            }
        }, 7000)
    }
}

// handles catching pokemon and putting it in the party
async function catchPokemon() {
    pokeball.play()
    document.getElementById("enemyPokemonImg").style.visibility = "hidden"
    if (window.playerParty[0].hp == undefined || window.playerParty[0].hp == 0) {
        syncToParty(0)
        document.getElementById("partySlot1Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        console.log(await getPokemonFrontImg(window.enemyID, window.isPokemonShiny));
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 1 <br>"
        document.getElementById("partySlot1").style.visibility = "visible"
        document.getElementById("partySlot1HP").innerText = window.playerParty[0].hp + "/" + window.playerParty[0].hp

    } else if (window.playerParty[1].hp == undefined || window.playerParty[1].hp == 0) {
        syncToParty(1)
        document.getElementById("partySlot2Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 2 <br>"
        document.getElementById("partySlot2").style.visibility = "visible"
        document.getElementById("partySlot2HP").innerText = window.playerParty[1].hp + "/" + window.playerParty[1].hp

    } else if (window.playerParty[2].hp == undefined || window.playerParty[2].hp == 0) {
        await syncToParty(2)
        document.getElementById("partySlot3Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 3 <br>"
        document.getElementById("partySlot3").style.visibility = "visible"
        document.getElementById("partySlot3HP").innerText = window.playerParty[2].hp + "/" + window.playerParty[2].hp
    } else if (window.playerParty[3].hp == undefined || window.playerParty[3].hp == 0) {
        await syncToParty(3)
        document.getElementById("partySlot4Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 4 <br>"
        document.getElementById("partySlot4").style.visibility = "visible"
        document.getElementById("partySlot4HP").innerText = window.playerParty[3].hp + "/" + window.playerParty[3].hp

    } else if (window.playerParty[4].hp == undefined || window.playerParty[4].hp == 0) {
        await syncToParty(4)
        document.getElementById("partySlot5Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 5 <br>"
        document.getElementById("partySlot5").style.visibility = "visible"
        document.getElementById("partySlot5HP").innerText = window.playerParty[4].hp + "/" + window.playerParty[4].hp
    } else {
        document.getElementById("log").innerHTML += "You caught it! <br> Sadly, you dont have room for " + await getName(window.enemyID) + " and they have been released into the wild. <br>"
    }
    gainEXP()

    window.canAttack = false
    setTimeout(makeEnemyPokemon, 1000)
    setTimeout(() => { window.canAttack = true; }, 1100)
}
// Handles transferring pokemon from on-field as en enemy to in-party as a friend
async function syncToParty(slotNum) {
    attacks = []
    window.playerParty[slotNum].hp = await getPokemonHP(window.enemyID)
    window.playerParty[slotNum].maxHp = await getPokemonHP(window.enemyID)
    console.log(window.playerParty[slotNum].hp);
    console.log(window.playerParty[slotNum].maxHp);
    window.playerParty[slotNum].lvl = Math.floor(await getPokemonHP(window.enemyID) / 10)
    window.playerParty[slotNum].isShiny = window.isPokemonShiny
    window.playerParty[slotNum].isEvolved = false;
    window.playerParty[slotNum].exp = 0;
    window.playerParty[slotNum].id = window.enemyID
    attacks = await getNewPokemonMoves(window.enemyID)
    console.log(attacks);
    window.playerParty[slotNum].moves.move1 = attacks[0]
    window.playerParty[slotNum].moves.move2 = attacks[1]
    window.playerParty[slotNum].moves.move3 = attacks[2]
    window.playerParty[slotNum].moves.move4 = attacks[3]
}
// Handles switching pokemon on the player's turn
async function switchTo(switchTarget, targetElement) {
    if (window.playerParty[switchTarget].hp != 0 && window.playerParty[switchTarget].hp != undefined && (window.canAttack == true || window.canChange == true)) {
        window.canChange = false;
        window.canAttack = false
        document.getElementById("playerPokemonImg").style.visibility = "visible"
        setTimeout(async () => {
            // Store party data in temp varibles
            window.transferHP = window.playerParty[switchTarget].hp
            window.transferMaxHp = window.playerParty[switchTarget].maxHp
            window.transferLVL = window.playerParty[switchTarget].lvl
            window.transferIsShiny = window.playerParty[switchTarget].isShiny
            window.transferIsEvolved = window.playerParty[switchTarget].isEvolved
            window.transferExp = window.playerParty[switchTarget].exp
            window.transferID = window.playerParty[switchTarget].id
            window.transferMove1 = window.playerParty[switchTarget].moves.move1
            window.transferMove2 = window.playerParty[switchTarget].moves.move2
            window.transferMove3 = window.playerParty[switchTarget].moves.move3
            window.transferMove4 = window.playerParty[switchTarget].moves.move4

            // Set party data to player current variables 
            window.playerParty[switchTarget].hp = window.playerHP
            window.playerParty[switchTarget].maxHp = window.playerMaxHp
            window.playerParty[switchTarget].lvl = window.currentPokemonLvl
            window.playerParty[switchTarget].isShiny = window.isPlayerPokemonShiny
            window.playerParty[switchTarget].isEvolved = window.isPokemonEvolved
            window.playerParty[switchTarget].exp = window.currentPokemonEXP
            window.playerParty[switchTarget].id = window.playerID
            window.playerParty[switchTarget].moves.move1 = window.attack1
            window.playerParty[switchTarget].moves.move2 = window.attack2
            window.playerParty[switchTarget].moves.move3 = window.attack3
            window.playerParty[switchTarget].moves.move4 = window.attack4

            // Set player value to current temp variables (stored party data)
            window.playerHP = window.transferHP
            window.playerMaxHp = window.transferMaxHp
            window.currentPokemonLvl = window.transferLVL
            window.isPlayerPokemonShiny = window.transferIsShiny
            window.isPokemonEvolved = window.transferIsEvolved
            window.currentPokemonEXP = window.transferExp
            window.playerID = window.transferID
            window.attack1 = window.transferMove1
            window.attack2 = window.transferMove2
            window.attack3 = window.transferMove3
            window.attack4 = window.transferMove4

            //Update all visuals
            document.getElementById("playerPokemonName").innerText = await getName(window.playerID)
            document.getElementById("playerPokemonImg").setAttribute("src", await getPokemonBackImg(window.playerID, window.isPlayerPokemonShiny))
            document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + " :Lvl"
            document.getElementById("playerPokemonHP").innerText = window.playerHP + "/" + window.playerMaxHp + " :HP"
            document.getElementById(targetElement + "Img").setAttribute("src", await getPokemonFrontImg(window.playerParty[switchTarget].id, window.playerParty[switchTarget].isShiny))
            document.getElementById(targetElement + "HP").innerText = window.playerParty[switchTarget].hp + "/" + window.playerParty[switchTarget].maxHp
            document.getElementById("attack1").innerText = capitalizeFirstLetter(attack1.replace("-", " "))
            document.getElementById("attack2").innerText = capitalizeFirstLetter(attack2.replace("-", " "))
            document.getElementById("attack3").innerText = capitalizeFirstLetter(attack3.replace("-", " "))
            document.getElementById("attack4").innerText = capitalizeFirstLetter(attack4.replace("-", " "))
            moveSetArray = [window.attack1, window.attack2, window.attack3, window.attack4]
            await setMoveColorOnSwap(moveSetArray)
            console.log(window.playerParty[switchTarget]);
            document.getElementById("log").innerHTML += " >  Come on back, " + await getName(window.playerParty[switchTarget].id) + " <br> \>  You're up, " + await getName(window.playerID) + "! <br>"
            setTimeout(doAttack, 800, "player")
        }, 500);

    }
}

// Starts game loop
pickStarters()
// End of game