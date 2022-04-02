import {randomInt} from 'crypto';
import * as readline from 'readline';

interface ICounters {
    [rarity: string]: number;
}

//#region user dialog
let packType: string;
let packRarity: ITEM_RARITY;

//fair packs counters
let counters: ICounters = {
    UNCOMMON: 0,
    RARE: 0,
    LEGENDARY: 0,
}

function Dialog() {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Choose one of the following options and press key:\n1. Open standard item pack\n2. Open consistent item pack\n3. Open fair item pack\n4. Open your inventory\n', (answer) => {
        switch (answer) {
            case '1':
                packType = "standard_pack";
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
                    switch (answer) {
                        case '1':
                            packRarity = ITEM_RARITY.UNCOMMON;
                            rl.close()
                            openPack(packRarity);
                            break;
                        case '2':
                            packRarity = ITEM_RARITY.RARE;
                            rl.close()
                            openPack(packRarity);
                            break;
                        case '3':
                            packRarity = ITEM_RARITY.LEGENDARY;
                            rl.close()
                            openPack(packRarity);
                            break;
                        default:
                            console.log('Invalid input. Please try to input again');
                            rl.close();
                            Dialog();
                    }
                });
                break;
            case '2':
                packType = "consistent_pack";
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
                    switch (answer) {
                        case '1':
                            packRarity = ITEM_RARITY.UNCOMMON;
                            rl.close();
                            openConsistentPack(packRarity);
                            break;
                        case '2':
                            packRarity = ITEM_RARITY.RARE;
                            rl.close();
                            openConsistentPack(packRarity);
                            break;
                        case '3':
                            packRarity = ITEM_RARITY.LEGENDARY;
                            rl.close();
                            openConsistentPack(packRarity);
                            break;
                        default:
                            console.log('Invalid input. Please try to input again');
                            rl.close();
                            Dialog();
                    }
                });
                break;
            case '3':
                packType = "fair_pack";
                let inputAmount: number = 0;
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
                    switch (answer) {
                        case '1':
                            packRarity = ITEM_RARITY.UNCOMMON;
                            console.log("Enter amount of packs (no more than 24 packs of one rarity in total)");
                            console.log("Current amount of opened " + ITEM_RARITY[packRarity] + " packs is " + counters.UNCOMMON);
                            rl.on('line', (input) => {
                                const parsed = parseInt(input, 10);
                                console.log('Received: ${parsed}');
                                if (parsed + counters.UNCOMMON <= 24) {
                                    inputAmount = parsed;
                                    rl.close();
                                    openFairPack(inputAmount, packRarity);
                                } else {
                                    rl.setPrompt("Inappropriate number of packs. Please try again\n");
                                    rl.prompt();
                                }
                            });
                            break;
                        case '2':
                            packRarity = ITEM_RARITY.RARE;
                            console.log("Enter amount of packs (no more than 24 packs of one rarity in total)");
                            console.log("Current amount of opened " + ITEM_RARITY[packRarity] + " packs is " + counters.RARE);
                            rl.on('line', (input) => {
                                const parsed = parseInt(input, 10);
                                console.log('Received: ${parsed}');
                                if (parsed + counters.RARE <= 24) {
                                    inputAmount = parsed;
                                    rl.close();
                                    openFairPack(inputAmount, packRarity);
                                } else {
                                    rl.setPrompt("Inappropriate number of packs. Please try again\n");
                                    rl.prompt();
                                }
                            });
                            break;
                        case '3':
                            packRarity = ITEM_RARITY.LEGENDARY;
                            console.log("Enter amount of packs (no more than 24 packs of one rarity in total)");
                            console.log("Current amount of opened " + ITEM_RARITY[packRarity] + " packs is " + counters.LEGENDARY);
                            rl.on('line', (input) => {
                                const parsed = parseInt(input, 10);
                                console.log('Received: ${parsed}');
                                if (parsed + counters.LEGENDARY <= 24) {
                                    inputAmount = parsed;
                                    rl.close();
                                    openFairPack(inputAmount, packRarity);
                                } else {
                                    rl.setPrompt("Inappropriate number of packs. Please try again\n");
                                    rl.prompt();

                                }
                            });
                            break;
                        default:
                            console.log('Invalid input. Please try to input again');
                            rl.close();
                            Dialog();
                    }
                });
                break;
            case '4':
                console.log('\nInventory:\n');
                rl.close();
                openInventory();
                break;
            default:
                console.log('Invalid input. Please try to input again');
                rl.close();
                Dialog();
        }
    });
}

//#endregion

//program start
Dialog();

let inventory: Item[] = [];

function openPack(packRarity: ITEM_RARITY) {
    let packItemList: Item[] = [];
    //standard_pack
    if (packType == "standard_pack") {
        console.log("\nOpening standard " + ITEM_RARITY[packRarity].toLowerCase() + " pack...\n");
        //slot rarity (pattern)
        let tempRarityList: ITEM_RARITY[] = [packRarity, packRarity, packRarity - 1, packRarity - 1, packRarity - 1];

        //determining the final rarity of items
        slotRarityDetermination(tempRarityList);

        //selection of items for rarity
        itemSelecting(tempRarityList, packItemList);

        //push all pack items to inventory
        packItemList.forEach(element => {
            inventory.push(element);
        });
    }

    //back to dialog
    Dialog();
}

function openConsistentPack(packRarity: ITEM_RARITY) {
    let packItemList: Item[] = [];

    //consistent_pack
    if (packType == "consistent_pack") {
        //slot rarity (pattern)
        let tempRarityList: ITEM_RARITY[] = [packRarity, packRarity, packRarity - 1, packRarity - 1, packRarity - 1];

        console.log("\nOpening consistent " + ITEM_RARITY[packRarity].toLowerCase() + " pack...\n");

        //determining the final rarity of items
        slotRarityDetermination(tempRarityList);

        //selection of items for rarity
        itemSelecting(tempRarityList, packItemList);

        //push all pack items to inventory
        packItemList.forEach(element => {
            inventory.push(element);
        });
    }
    //back to dialog
    Dialog();
}

function openFairPack(amout: number, packRarity: ITEM_RARITY) {
    let packItemList: Item[] = [];
    console.log("\nOpening fair " + amout + " " + ITEM_RARITY[packRarity].toLowerCase() + " pack(s)...\n")
    for (let i = 1; i <= amout; i++) {
        let tempRarityList: ITEM_RARITY[] = [packRarity, packRarity, packRarity - 1, packRarity - 1, packRarity - 1];

        counters[ITEM_RARITY[packRarity]]++;
        console.log(counters[ITEM_RARITY[packRarity]]);

        //determining the final rarity of items
        slotRarityDetermination(tempRarityList);
        console.log("Pack number " + i + "...");
        //selection of items for rarity
        itemSelecting(tempRarityList, packItemList);

        if (counters[ITEM_RARITY[packRarity]] == 24) {
            checkFairPackItems(packItemList);
        }

        //push all pack items to inventory
        packItemList.forEach(element => {
            inventory.push(element);
        });
        packItemList = [];
    }
    //back to dialog
    Dialog();
}

function slotRarityDetermination(tempRarityList: ITEM_RARITY[]) {
    for (let i = 0; i < 5; i++) {
        while (packRarity < 4) {
            let rarityUpProbability = 10;

            if (randomInt(100) <= rarityUpProbability) {
                //increasing current item rarity
                tempRarityList[i] = packRarity + 1;
                //decreasing the probability of increasing rarity in progression
                rarityUpProbability = rarityUpProbability * 0.1;
            } else {
                break;
            }
        }
    }
}

function itemSelecting(tempRarityList: ITEM_RARITY[], packItemList: Item[]) {
    for (let i = 0; i < 5; i++) {
        let itemRarityList: Item[] = [];

        itemsList.forEach(element => {
            if (element.rarity == tempRarityList[i]) {
                itemRarityList.push(element);
            }
        });
        addItem(packItemList, itemRarityList);
    }
    if (packType == "consistent_pack") {
        checkItemType(packItemList);
    }

    packItemList.forEach(element => {
        console.log("Item name: " + element.name + "\nItem rarity: " + ITEM_RARITY[element.rarity] + "\nItem type: " + ITEM_TYPE[element.type] + "\n");
    });
}

function addItem(packItemList: Item[], itemRarityList: Item[]) {
    let tempRandom = randomInt(itemRarityList.length);

    packItemList.push(itemRarityList[tempRandom]);
}

function checkItemType(packItemList: Item[]) {
    let counter = 0;

    packItemList.sort((a, b) => a.type > b.type ? 1 : -1);

    for (let i = 0; i < 4; i++) {
        let currentElem: ITEM_TYPE = packItemList[i].type;
        let nextElem: ITEM_TYPE = packItemList[i + 1].type;

        if (currentElem == nextElem) {
            counter++;
            if (counter == 2) {
                //items array with the same rarity (6 elements)
                let tempItemList: Item[] = [];

                itemsList.forEach(element => {
                    if (element.rarity == packItemList[i].rarity && element.type != packItemList[i].type) {
                        tempItemList.push(element);
                    }
                });
                packItemList[i] = tempItemList[randomInt(6)];
                counter = 0;
            }
        }
    }
}

function checkFairPackItems(packItemList: Item[]) {
    let tempItemList: Item[] = [];

    //fill all items to array with the same rarity
    itemsList.forEach(element => {
        if (element.rarity == packRarity) {
            tempItemList.push(element);
        }
    });

    //checking for matching items. items already received by the player
    inventory.forEach(elementInv => {
        for (let i = tempItemList.length - 1; i >= 0; i--) {
            if (tempItemList[i].name == elementInv.name) {
                tempItemList.splice(i, 1);
            }
        }
    });

    //fill missing items
    if (tempItemList) {
        for (let i = 0; i < tempItemList.length; i++) {
            tempItemList.forEach(element => {
                packItemList[i] = element;
            });
        }
    }
}

/*function openInventory() {
    let itemsAmount: number = 0;

    inventory.forEach(element => {
        itemsAmount++;
        console.log(itemsAmount);
        console.log("Item name: " + element.name + "\nItem rarity: " + ITEM_RARITY[element.rarity] + "\nItem type: " + ITEM_TYPE[element.type] + "\n");
    });
    console.log("Items held: " + itemsAmount);

    //back to dialog
    Dialog();
}*/

function openInventory() {
    let itemsAmount: number = 0;

    for (let i = 1; i < itemsList.length; i++) {
        let itemCount: number = 0
        let itemDescription: string = `Item name: ${inventory[i].name} \nItem rarity: ${ITEM_RARITY[inventory[i].rarity]}\nItem type: ${ITEM_TYPE[inventory[i].type]}\n`;

        inventory.forEach(element => {
            if (element.ID == inventory[i].ID) {
                itemCount++;
            }
        });

        if (itemCount == 0) {
            continue;
        }

        if (itemCount == 1) {
            console.log(itemDescription);
        }

        if (itemCount > 1) {
            console.log(itemCount);
            console.log(itemDescription);
        }

        itemsAmount++;
    }

    console.log("Items held: " + itemsAmount);
    //back to dialog
    Dialog();
}