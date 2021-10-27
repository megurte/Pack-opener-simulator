"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
var readline = require("readline");
var staticItemType;
(function (staticItemType) {
    staticItemType[staticItemType["WEAPON"] = 1] = "WEAPON";
    staticItemType[staticItemType["HELMET"] = 2] = "HELMET";
    staticItemType[staticItemType["ARMOR"] = 3] = "ARMOR";
    staticItemType[staticItemType["SHIELD"] = 4] = "SHIELD";
})(staticItemType || (staticItemType = {}));
var staticRarity;
(function (staticRarity) {
    staticRarity[staticRarity["COMMON"] = 1] = "COMMON";
    staticRarity[staticRarity["UNCOMMON"] = 2] = "UNCOMMON";
    staticRarity[staticRarity["RARE"] = 3] = "RARE";
    staticRarity[staticRarity["LEGENDARY"] = 4] = "LEGENDARY";
})(staticRarity || (staticRarity = {}));
//fair packs counters
var counters = {
    "UNCOMMON": 0,
    "RARE": 0,
    "LEGENDARY": 0
};
var Item = /** @class */ (function () {
    function Item(theName, itemRarity, itemType) {
        this.name = theName;
        this.rarity = itemRarity;
        this.type = itemType;
    }
    return Item;
}());
var packType;
var packRarity;
//#region user dialog
function Dialog() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Choose one of the following options and press key:\n1. Open standard item pack\n2. Open consistent item pack\n3. Open fair item pack\n4. Open your inventory\n', function (answer) {
        switch (answer) {
            case '1':
                packType = "standard_pack";
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', function (answer) {
                    switch (answer) {
                        case '1':
                            packRarity = staticRarity.UNCOMMON;
                            rl.close();
                            openPack(packRarity);
                            break;
                        case '2':
                            packRarity = staticRarity.RARE;
                            rl.close();
                            openPack(packRarity);
                            break;
                        case '3':
                            packRarity = staticRarity.LEGENDARY;
                            rl.close();
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
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', function (answer) {
                    switch (answer) {
                        case '1':
                            packRarity = staticRarity.UNCOMMON;
                            rl.close();
                            openConsistentPack(packRarity);
                            break;
                        case '2':
                            packRarity = staticRarity.RARE;
                            rl.close();
                            openConsistentPack(packRarity);
                            break;
                        case '3':
                            packRarity = staticRarity.LEGENDARY;
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
                var inputAmount_1 = 0;
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', function (answer) {
                    switch (answer) {
                        case '1':
                            packRarity = staticRarity.UNCOMMON;
                            console.log("Enter amount of packs (no more than 24 packs of one rarity in total)");
                            console.log("Current amount of opened " + staticRarity[packRarity] + " packs is " + counters.UNCOMMON);
                            rl.on('line', function (input) {
                                var parsed = parseInt(input, 10);
                                console.log('Received: ${parsed}');
                                if (parsed + counters.UNCOMMON <= 24) {
                                    inputAmount_1 = parsed;
                                    rl.close();
                                    openFairPack(inputAmount_1, packRarity);
                                }
                                else {
                                    rl.setPrompt("Inappropriate number of packs. Please try again\n");
                                    rl.prompt();
                                }
                            });
                            break;
                        case '2':
                            packRarity = staticRarity.RARE;
                            console.log("Enter amount of packs (no more than 24 packs of one rarity in total)");
                            console.log("Current amount of opened " + staticRarity[packRarity] + " packs is " + counters.RARE);
                            rl.on('line', function (input) {
                                var parsed = parseInt(input, 10);
                                console.log('Received: ${parsed}');
                                if (parsed + counters.RARE <= 24) {
                                    inputAmount_1 = parsed;
                                    rl.close();
                                    openFairPack(inputAmount_1, packRarity);
                                }
                                else {
                                    rl.setPrompt("Inappropriate number of packs. Please try again\n");
                                    rl.prompt();
                                }
                            });
                            break;
                        case '3':
                            packRarity = staticRarity.LEGENDARY;
                            console.log("Enter amount of packs (no more than 24 packs of one rarity in total)");
                            console.log("Current amount of opened " + staticRarity[packRarity] + " packs is " + counters.LEGENDARY);
                            rl.on('line', function (input) {
                                var parsed = parseInt(input, 10);
                                console.log('Received: ${parsed}');
                                if (parsed + counters.LEGENDARY <= 24) {
                                    inputAmount_1 = parsed;
                                    rl.close();
                                    openFairPack(inputAmount_1, packRarity);
                                }
                                else {
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
//#region item data
var newitem1 = new Item("King's cavalary shield", staticRarity.RARE, staticItemType.SHIELD);
var newitem2 = new Item("Iceborn shield", staticRarity.RARE, staticItemType.SHIELD);
var newitem3 = new Item("Staff of Homa", staticRarity.RARE, staticItemType.WEAPON);
var newitem4 = new Item("Mistsplitter reforged", staticRarity.RARE, staticItemType.WEAPON);
var newitem5 = new Item("King's cavalary helmet", staticRarity.RARE, staticItemType.HELMET);
var newitem6 = new Item("Dragonskin helmet", staticRarity.RARE, staticItemType.HELMET);
var newitem7 = new Item("King's cavalary cuirass", staticRarity.RARE, staticItemType.ARMOR);
var newitem8 = new Item("Dragonskin carapace", staticRarity.RARE, staticItemType.ARMOR);
var newitem9 = new Item("Wooden troll shield", staticRarity.COMMON, staticItemType.SHIELD);
var newitem10 = new Item("Private soldier's shield", staticRarity.COMMON, staticItemType.SHIELD);
var newitem11 = new Item("Wooden helmet", staticRarity.COMMON, staticItemType.HELMET);
var newitem12 = new Item("Iron soldier's helmet", staticRarity.COMMON, staticItemType.HELMET);
var newitem13 = new Item("Cudgel of negotiations", staticRarity.COMMON, staticItemType.WEAPON);
var newitem14 = new Item("Battered soldier sword", staticRarity.COMMON, staticItemType.WEAPON);
var newitem15 = new Item("Old leather armor", staticRarity.COMMON, staticItemType.ARMOR);
var newitem16 = new Item("Private soldier's cuirass", staticRarity.COMMON, staticItemType.ARMOR);
var newitem17 = new Item("Steel shield", staticRarity.UNCOMMON, staticItemType.SHIELD);
var newitem18 = new Item("Spiked shield", staticRarity.UNCOMMON, staticItemType.SHIELD);
var newitem19 = new Item("Claymore", staticRarity.UNCOMMON, staticItemType.WEAPON);
var newitem20 = new Item("Light blessed bow", staticRarity.UNCOMMON, staticItemType.WEAPON);
var newitem21 = new Item("Horned helmet", staticRarity.UNCOMMON, staticItemType.HELMET);
var newitem22 = new Item("Ornate hood", staticRarity.UNCOMMON, staticItemType.HELMET);
var newitem23 = new Item("Spiked armor", staticRarity.UNCOMMON, staticItemType.ARMOR);
var newitem24 = new Item("Priest's robe", staticRarity.UNCOMMON, staticItemType.ARMOR);
var newitem25 = new Item("Shield of nameless hero", staticRarity.LEGENDARY, staticItemType.SHIELD);
var newitem26 = new Item("Dragonbone shield", staticRarity.LEGENDARY, staticItemType.SHIELD);
var newitem27 = new Item("Weapon of nameless hero", staticRarity.LEGENDARY, staticItemType.WEAPON);
var newitem28 = new Item("Dragoon's spear", staticRarity.LEGENDARY, staticItemType.WEAPON);
var newitem29 = new Item("Helmet of nameless hero", staticRarity.LEGENDARY, staticItemType.HELMET);
var newitem30 = new Item("Dragoon's Helm", staticRarity.LEGENDARY, staticItemType.HELMET);
var newitem31 = new Item("Armor of nameless hero", staticRarity.LEGENDARY, staticItemType.ARMOR);
var newitem32 = new Item("Dragoon's Armor", staticRarity.LEGENDARY, staticItemType.ARMOR);
//#endregion
//item collection
var itemlist = [newitem1, newitem2, newitem3, newitem4, newitem5, newitem6, newitem7, newitem8, newitem9, newitem10, newitem11, newitem12, newitem13, newitem14, newitem15, newitem16, newitem17, newitem18, newitem19, newitem20, newitem21, newitem22, newitem23, newitem24, newitem25, newitem26, newitem27, newitem28, newitem29, newitem30, newitem31, newitem32];
var inventory = [];
function openPack(packRarity) {
    var packitemlist = [];
    //standard_pack
    if (packType == "standard_pack") {
        console.log("\nOpening standard " + staticRarity[packRarity].toLowerCase() + " pack...\n");
        //slot ratiry (pattern)
        var tempraritylist = [packRarity, packRarity, packRarity - 1, packRarity - 1, packRarity - 1];
        //determining the final rarity of items
        slotRarityDet(tempraritylist);
        //selection of items for rarity
        itemSelecting(tempraritylist, packitemlist);
        //push all pack items to inventory
        packitemlist.forEach(function (element) {
            inventory.push(element);
        });
    }
    //back to dialog
    Dialog();
}
function openConsistentPack(packRarity) {
    var packitemlist = [];
    //consistent_pack
    if (packType == "consistent_pack") {
        console.log("\nOpening consistent " + staticRarity[packRarity].toLowerCase() + " pack...\n");
        //slot ratiry (pattern)
        var tempraritylist = [packRarity, packRarity, packRarity - 1, packRarity - 1, packRarity - 1];
        //determining the final rarity of items
        slotRarityDet(tempraritylist);
        //selection of items for rarity
        itemSelecting(tempraritylist, packitemlist);
        //push all pack items to inventory
        packitemlist.forEach(function (element) {
            inventory.push(element);
        });
    }
    //back to dialog
    Dialog();
}
function openFairPack(amout, packRarity) {
    var packitemlist = [];
    console.log("\nOpening fair " + amout + " " + staticRarity[packRarity].toLowerCase() + " pack(s)...\n");
    for (var i = 1; i <= amout; i++) {
        counters[staticRarity[packRarity]]++;
        console.log(counters[staticRarity[packRarity]]);
        //slot ratiry (pattern)
        var tempraritylist = [packRarity, packRarity, packRarity - 1, packRarity - 1, packRarity - 1];
        //determining the final rarity of items
        slotRarityDet(tempraritylist);
        console.log("Pack number " + i + "...");
        //selection of items for rarity
        itemSelecting(tempraritylist, packitemlist);
        if (counters[staticRarity[packRarity]] == 24) {
            checkFairPackItems(packitemlist);
        }
        //push all pack items to inventory
        packitemlist.forEach(function (element) {
            inventory.push(element);
        });
        packitemlist = [];
    }
    //back to dialog
    Dialog();
}
function slotRarityDet(tempraritylist) {
    for (var i = 0; i < 5; i++) {
        while (packRarity < 4) {
            var rarityUpProbability = 10;
            if (crypto_1.randomInt(100) <= rarityUpProbability) {
                //increasing current item rarity
                tempraritylist[i] = packRarity + 1;
                //decreasing the probability of increasing rarity in progression
                rarityUpProbability = rarityUpProbability * 0.1;
            }
            else {
                break;
            }
        }
    }
}
function itemSelecting(tempraritylist, packitemlist) {
    var _loop_1 = function (i) {
        var itemraritylist = [];
        itemlist.forEach(function (element) {
            if (element.rarity == tempraritylist[i]) {
                itemraritylist.push(element);
            }
        });
        addItem(packitemlist, itemraritylist);
    };
    for (var i = 0; i < 5; i++) {
        _loop_1(i);
    }
    if (packType == "consistent_pack")
        checkItemtype(packitemlist);
    packitemlist.forEach(function (element) {
        console.log("Item name: " + element.name + "\nItem rarity: " + staticRarity[element.rarity] + "\nItem type: " + staticItemType[element.type] + "\n");
    });
}
function addItem(packitemlist, itemRaritylist) {
    var tempRandom = crypto_1.randomInt(itemRaritylist.length);
    packitemlist.push(itemRaritylist[tempRandom]);
}
function checkItemtype(packitemlist) {
    packitemlist.sort(function (a, b) { return a.type > b.type ? 1 : -1; });
    var counter = 0;
    var _loop_2 = function (i) {
        var currentElem = packitemlist[i].type;
        ;
        var nextElem = packitemlist[i + 1].type;
        if (currentElem == nextElem) {
            counter++;
            if (counter == 2) {
                //items array with the same rarity (6 elements)
                var tempitemlist_1 = [];
                itemlist.forEach(function (element) {
                    if (element.rarity == packitemlist[i].rarity && element.type != packitemlist[i].type) {
                        tempitemlist_1.push(element);
                    }
                });
                packitemlist[i] = tempitemlist_1[crypto_1.randomInt(6)];
                counter = 0;
            }
        }
    };
    for (var i = 0; i < 4; i++) {
        _loop_2(i);
    }
}
function checkFairPackItems(packitemlist) {
    var tempitemlist = [];
    //fill all items to array with the same rarity
    itemlist.forEach(function (element) {
        if (element.rarity == packRarity) {
            tempitemlist.push(element);
        }
    });
    //checking for matching items. items already received by the player
    inventory.forEach(function (elementInv) {
        for (var i = tempitemlist.length - 1; i >= 0; i--) {
            if (tempitemlist[i].name == elementInv.name) {
                tempitemlist.splice(i, 1);
            }
        }
    });
    //fill missing items
    if (tempitemlist != null) {
        var _loop_3 = function (i) {
            tempitemlist.forEach(function (element) {
                packitemlist[i] = element;
            });
        };
        for (var i = 0; i < tempitemlist.length; i++) {
            _loop_3(i);
        }
    }
}
function openInventory() {
    var itemsAmount = 0;
    inventory.forEach(function (element) {
        itemsAmount++;
        console.log(itemsAmount);
        console.log("Item name: " + element.name + "\nItem rarity: " + staticRarity[element.rarity] + "\nItem type: " + staticItemType[element.type] + "\n");
    });
    console.log("Items held: " + itemsAmount);
    //back to dialog
    Dialog();
}
