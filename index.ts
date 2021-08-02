import { randomInt } from 'crypto';
import * as readline from 'readline';


type rarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'LEGENDARY'
type item_type = 'WEAPON' | 'HELMET' | 'ARMOR' | 'SHIELD'

enum static_rarity {
  COMMON = 1,
  UNCOMMON = 2,
  RARE = 3,
  LEGENDARY = 4,
}

class Item
{
    name : string;
    rarity : static_rarity;
    type : item_type;

    constructor(TheName: string, ItemRarity: static_rarity, ItemType: item_type) 
    {
        this.name = TheName;
        this.rarity = ItemRarity;
        this.type = ItemType
    }
}

let packType: string;
let packRarity: static_rarity;

//#region user dialog
//let rlmain,rlrarity = readline.createInterface({

function Dialog(){
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

    rl.question('Choose one of the following options and press key:\n1. Open standart item pack\n2. Open consistent item pack\n3. Open fair item pack\n4. Open your inventory\n', (answer) => {
      switch (answer) {
        case '1':
          packType = "standart_pack";
          rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
            switch (answer) {
              case '1':
                packRarity = static_rarity.UNCOMMON          
                Pack_open(packType, packRarity)               
                break;
              case '2':
                packRarity = static_rarity.RARE  
                Pack_open(packType, packRarity)
                break;
              case '3':
                packRarity = static_rarity.LEGENDARY  
                Pack_open(packType, packRarity)
                break;
              default:
                console.log('Invalid input. Please try to input again');
            }
          });
        case '2':
          packType = "consistent_pack";
          rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
            switch (answer) {
              case '1':
                packRarity = static_rarity.UNCOMMON   
                Pack_open(packType, packRarity)
                break;
              case '2':
                packRarity = static_rarity.RARE 
                Pack_open(packType, packRarity)
                break;
              case '3':
                packRarity = static_rarity.LEGENDARY 
                Pack_open(packType, packRarity)
                break;
              default:
                console.log('Invalid input. Please try to input again');
            }
          });
          break;
        case '3':
          packType = "fair_pack";
          rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
            switch (answer) {
              case '1':
                packRarity = static_rarity.UNCOMMON  
                Pack_open(packType, packRarity)
                break;
              case '2':
                packRarity = static_rarity.RARE  
                Pack_open(packType, packRarity)
                break;
              case '3':
                packRarity = static_rarity.LEGENDARY 
                Pack_open(packType, packRarity)
                break;
              default:
                console.log('Invalid input. Please try to input again');
            }
          });
          break;
        case '4':
          console.log('\nInventory:\n');
          Openinventory();     
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
let newitem1 = new Item("King's cavalary shield",static_rarity.RARE,"SHIELD")
let newitem2 = new Item("Iceborn shield",static_rarity.RARE,"SHIELD")
let newitem3 = new Item("Staff of Homa",static_rarity.RARE,"WEAPON")
let newitem4 = new Item("Mistsplitter reforged",static_rarity.RARE,"WEAPON")
let newitem5 = new Item("King's cavalary helmet",static_rarity.RARE,"HELMET")
let newitem6 = new Item("Dragonskin helmet",static_rarity.RARE,"HELMET")
let newitem7 = new Item("King's cavalary cuirass",static_rarity.RARE,"ARMOR")
let newitem8 = new Item("Dragonskin carapace",static_rarity.RARE,"ARMOR")
let newitem9 = new Item("Wooden troll shield",static_rarity.COMMON,"SHIELD")
let newitem10 = new Item("Private soldier's shield",static_rarity.COMMON,"SHIELD")
let newitem11 = new Item("Wooden helmet",static_rarity.COMMON,"HELMET")
let newitem12 = new Item("Iron soldier's helmet",static_rarity.COMMON,"HELMET")
let newitem13 = new Item("Cudgel of negotiations",static_rarity.COMMON,"WEAPON")
let newitem14 = new Item("Battered soldier sword",static_rarity.COMMON,"WEAPON")
let newitem15 = new Item("Old leather armor",static_rarity.COMMON,"ARMOR")
let newitem16 = new Item("Private soldier's cuirass",static_rarity.COMMON,"ARMOR")
let newitem17 = new Item("Steel shield",static_rarity.UNCOMMON,"SHIELD")
let newitem18 = new Item("Spiked shield",static_rarity.UNCOMMON,"SHIELD")
let newitem19 = new Item("Claymore",static_rarity.UNCOMMON,"WEAPON")
let newitem20 = new Item("Light blessed bow",static_rarity.UNCOMMON,"WEAPON")
let newitem21 = new Item("Horned helmet",static_rarity.UNCOMMON,"HELMET")
let newitem22 = new Item("Ornate hood",static_rarity.UNCOMMON,"HELMET")
let newitem23 = new Item("Spiked armor",static_rarity.UNCOMMON,"ARMOR")
let newitem24 = new Item("Priest's robe",static_rarity.UNCOMMON,"ARMOR")
let newitem25 = new Item("Shield of nameless hero",static_rarity.LEGENDARY,"SHIELD")
let newitem26 = new Item("Dragonbone shield",static_rarity.LEGENDARY,"SHIELD")
let newitem27 = new Item("Weapon of nameless hero",static_rarity.LEGENDARY,"WEAPON")
let newitem28 = new Item("Dragoon's spear",static_rarity.LEGENDARY,"WEAPON")
let newitem29 = new Item("Helmet of nameless hero",static_rarity.LEGENDARY,"HELMET")
let newitem30 = new Item("Dragoon's Helm",static_rarity.LEGENDARY,"HELMET")
let newitem31 = new Item("Armor of nameless hero",static_rarity.LEGENDARY,"ARMOR")
let newitem32 = new Item("Dragoon's Armor",static_rarity.LEGENDARY,"ARMOR")
//#endregion

//item collection
const itemlist: Item[] = [newitem1,newitem2,newitem3,newitem4,newitem5,newitem6,newitem7,newitem8,newitem9,newitem10,newitem11,newitem12,newitem13,newitem14,newitem15,newitem16,newitem17,newitem18,newitem19,newitem20,newitem21,newitem22,newitem23,newitem24,newitem25,newitem26,newitem27,newitem28,newitem29,newitem30,newitem31,newitem32]
let inventory: Item[] = [];



function Pack_open(packType: string, packRarity: static_rarity) {
  
  let packitemlist: Item[] = [];
  //standart_pack
  if (packType == "standart_pack") {
    console.log("\nOpening standart " + packRarity.toString() + " pack...\n")
    
    //for (let i = 0; i < 5; i++) {
    //  let temp: number = randomInt(32)
    //  inventory.push(itemlist[temp]);
    //  console.log("Item name: " + itemlist[temp].name + "\nItem rarity: " + itemlist[temp].rarity + "\nItem type: " + itemlist[temp].type + "\n");
    //}

    let temp_rarity_list: static_rarity[] = [packRarity, packRarity, packRarity-1,packRarity-1,packRarity-1];
    
    for (let i = 0; i < 5; i++) {
      while(packRarity < 4)
      {       
        let percentage = 0.1;
        let roll = full*percentage;

        console.log("\n"+full+"\n" + percentage + "\n"+roll)
        if(roll <= percentage){
          temp_rarity_list[i] = packRarity+1;
        }
        else{
          break
        }
        
      }
    }
    //inventory.push(itemlist[temp]);
  }
  
  //consistent_pack
  if (packType == "consistent_pack") {
    console.log("\nOpening consistent " + packRarity.toString() + " pack...\n")
    for (let i = 0; i < 5; i++) {
      let temp: number = randomInt(32)
      inventory.push(itemlist[temp]);
      console.log("Item name: " + itemlist[temp].name + "\nItem rarity: " + itemlist[temp].rarity + "\nItem type: " + itemlist[temp].type + "\n");
    }
  }
  
  //fair_pack
  if (packType == "fair_pack") {
    console.log("\nOpening fair " + packRarity.toString() + " pack...\n")
    for (let i = 0; i < 5; i++) {
      let temp: number = randomInt(32)
      inventory.push(itemlist[temp]);
      console.log("Item name: " + itemlist[temp].name + "\nItem rarity: " + itemlist[temp].rarity + "\nItem type: " + itemlist[temp].type + "\n");
    }
  }
  Dialog();
}


function Openinventory()
{
  inventory.forEach(element => {
    console.log("Item name: " + element.name + "\nItem rarity: " + element.rarity + "\nItem type: " + element.type + "\n")
  });  
}