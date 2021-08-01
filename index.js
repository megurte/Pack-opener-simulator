"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
var readline = require("readline");
var Item = /** @class */ (function () {
    function Item(TheName, ItemRarity, ItemType) {
        this.name = TheName;
        this.rarity = ItemRarity;
        this.type = ItemType;
    }
    return Item;
}());
var packType;
var packRarity;
//#region user dialog
//let rlmain,rlrarity = readline.createInterface({
function Dialog() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Choose one of the following options and press key:\n1. Open standart item pack\n2. Open consistent item pack\n3. Open fair item pack\n4. Open your inventory\n', function (answer) {
        switch (answer) {
            case '1':
                packType = "standart_pack";
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', function (answer) {
                    switch (answer) {
                        case '1':
                            packRarity = "UNCOMMON";
                            Pack_open(packType, packRarity);
                            break;
                        case '2':
                            packRarity = "RARE";
                            Pack_open(packType, packRarity);
                            break;
                        case '3':
                            packRarity = "LEGENDARY";
                            Pack_open(packType, packRarity);
                            break;
                        default:
                            console.log('Invalid input. Please try to input again');
                    }
                });
            case '2':
                packType = "consistent_pack";
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', function (answer) {
                    switch (answer) {
                        case '1':
                            packRarity = "UNCOMMON";
                            Pack_open(packType, packRarity);
                            break;
                        case '2':
                            packRarity = "RARE";
                            Pack_open(packType, packRarity);
                            break;
                        case '3':
                            packRarity = "LEGENDARY";
                            Pack_open(packType, packRarity);
                            break;
                        default:
                            console.log('Invalid input. Please try to input again');
                    }
                });
                break;
            case '3':
                packType = "fair_pack";
                rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', function (answer) {
                    switch (answer) {
                        case '1':
                            packRarity = "UNCOMMON";
                            Pack_open(packType, packRarity);
                            break;
                        case '2':
                            packRarity = "RARE";
                            Pack_open(packType, packRarity);
                            break;
                        case '3':
                            packRarity = "LEGENDARY";
                            Pack_open(packType, packRarity);
                            break;
                        default:
                            console.log('Invalid input. Please try to input again');
                    }
                });
                break;
            case '4':
                Openinventory();
                console.log('\nInventory:\n');
                break;
            default:
                console.log('Invalid input. Please try to input again');
        }
    });
}
//#endregion
//program start
Dialog();
//#region item data
var newitem1 = new Item("King's cavalary shield", "RARE", "SHIELD");
var newitem2 = new Item("Iceborn shield", "RARE", "SHIELD");
var newitem3 = new Item("Staff of Homa", "RARE", "WEAPON");
var newitem4 = new Item("Mistsplitter reforged", "RARE", "WEAPON");
var newitem5 = new Item("King's cavalary helmet", "RARE", "HELMET");
var newitem6 = new Item("Dragonskin helmet", "RARE", "HELMET");
var newitem7 = new Item("King's cavalary cuirass", "RARE", "ARMOR");
var newitem8 = new Item("Dragonskin carapace", "RARE", "ARMOR");
var newitem9 = new Item("Wooden troll shield", "COMMON", "SHIELD");
var newitem10 = new Item("Private soldier's shield", "COMMON", "SHIELD");
var newitem11 = new Item("Wooden helmet", "COMMON", "HELMET");
var newitem12 = new Item("Iron soldier's helmet", "COMMON", "HELMET");
var newitem13 = new Item("Cudgel of negotiations", "COMMON", "WEAPON");
var newitem14 = new Item("Battered soldier sword", "COMMON", "WEAPON");
var newitem15 = new Item("Old leather armor", "COMMON", "ARMOR");
var newitem16 = new Item("Private soldier's cuirass", "COMMON", "ARMOR");
var newitem17 = new Item("Steel shield", "UNCOMMON", "SHIELD");
var newitem18 = new Item("Spiked shield", "UNCOMMON", "SHIELD");
var newitem19 = new Item("Claymore", "UNCOMMON", "WEAPON");
var newitem20 = new Item("Light blessed bow", "UNCOMMON", "WEAPON");
var newitem21 = new Item("Horned helmet", "UNCOMMON", "HELMET");
var newitem22 = new Item("Ornate hood", "UNCOMMON", "HELMET");
var newitem23 = new Item("Spiked armor", "UNCOMMON", "ARMOR");
var newitem24 = new Item("Priest's robe", "UNCOMMON", "ARMOR");
var newitem25 = new Item("Shield of nameless hero", "LEGENDARY", "SHIELD");
var newitem26 = new Item("Dragonbone shield", "LEGENDARY", "SHIELD");
var newitem27 = new Item("Weapon of nameless hero", "LEGENDARY", "WEAPON");
var newitem28 = new Item("Dragoon's spear", "LEGENDARY", "WEAPON");
var newitem29 = new Item("Helmet of nameless hero", "LEGENDARY", "HELMET");
var newitem30 = new Item("Dragoon's Helm", "LEGENDARY", "HELMET");
var newitem31 = new Item("Armor of nameless hero", "LEGENDARY", "ARMOR");
var newitem32 = new Item("Dragoon's Armor", "LEGENDARY", "ARMOR");
//#endregion
//item collection
var itemlist = [newitem1, newitem2, newitem3, newitem4, newitem5, newitem6, newitem7, newitem8, newitem9, newitem10, newitem11, newitem12, newitem13, newitem14, newitem15, newitem16, newitem17, newitem18, newitem19, newitem20, newitem21, newitem22, newitem23, newitem24, newitem25, newitem26, newitem27, newitem28, newitem29, newitem30, newitem31, newitem32];
var inventory = [];
//debug
//console.log("Item name: " + newitem9.name+"\nItem rarity: " + newitem9.rarity+"\nItem Type: "+newitem9.type);
//console.log("Item name: " + newitem13.name+"\nItem rarity: " + newitem13.rarity+"\nItem Type: "+newitem13.type);
function Pack_open(packType, packRarity) {
    //standart_pack
    if (packType == "standart_pack") {
        console.log("\nOpening standart " + packRarity.toLocaleLowerCase() + " pack...\n");
        for (var i = 0; i < 5; i++) {
            var temp = crypto_1.randomInt(32);
            inventory.push(itemlist[temp]);
            console.log("Item name: " + itemlist[temp].name + "\nItem rarity: " + itemlist[temp].rarity + "\nItem type: " + itemlist[temp].type + "\n");
        }
    }
    //consistent_pack
    if (packType == "consistent_pack") {
        console.log("\nOpening consistent " + packRarity.toLocaleLowerCase() + " pack...\n");
        for (var i = 0; i < 5; i++) {
            var temp = crypto_1.randomInt(32);
            inventory.push(itemlist[temp]);
            console.log("Item name: " + itemlist[temp].name + "\nItem rarity: " + itemlist[temp].rarity + "\nItem type: " + itemlist[temp].type + "\n");
        }
    }
    //fair_pack
    if (packType == "fair_pack") {
        console.log("\nOpening fair " + packRarity.toLocaleLowerCase() + " pack...\n");
        for (var i = 0; i < 5; i++) {
            var temp = crypto_1.randomInt(32);
            inventory.push(itemlist[temp]);
            console.log("Item name: " + itemlist[temp].name + "\nItem rarity: " + itemlist[temp].rarity + "\nItem type: " + itemlist[temp].type + "\n");
        }
    }
    Dialog();
}
function Openinventory() {
    inventory.forEach(function (element) {
        console.log("Item name: " + element.name + "\nItem rarity: " + element.rarity + "\nItem type: " + element.type + "\n");
    });
}
