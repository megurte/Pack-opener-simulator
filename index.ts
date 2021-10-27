import { randomInt } from 'crypto';
import * as readline from 'readline';
import internal = require('stream');

enum staticItemType {
  WEAPON = 1,
  HELMET = 2,
  ARMOR = 3,
  SHIELD = 4
}

enum staticRarity {
  COMMON = 1,
  UNCOMMON = 2,
  RARE = 3,
  LEGENDARY = 4
}

//fair packs counters
let counters = { 
  "UNCOMMON": 0,
  "RARE": 0,
  "LEGENDARY": 0
}

class Item {
  name: string;
  rarity: staticRarity;
  type: staticItemType;

  constructor(theName: string, itemRarity: staticRarity, itemType: staticItemType) {
    this.name = theName;
    this.rarity = itemRarity;
    this.type = itemType
  }
}

let packType: string;
let packRarity: staticRarity;

//#region user dialog
function Dialog(){
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

    rl.question('Choose one of the following options and press key:\n1. Open standard item pack\n2. Open consistent item pack\n3. Open fair item pack\n4. Open your inventory\n', (answer) => {
      switch (answer) {
        case '1':
          packType = "standard_pack";
          rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
            switch (answer) {
              case '1':
                packRarity = staticRarity.UNCOMMON;
                rl.close()            
                openPack(packRarity);             
                break;
              case '2':
                packRarity = staticRarity.RARE;
                rl.close()     
                openPack(packRarity);
                break;
              case '3':
                packRarity = staticRarity.LEGENDARY;
                rl.close()     
                openPack(packRarity);
                break;
              default:
                console.log('Invalid input. Please try to input again');
                rl.close();
                Dialog(); 
            }
          });
          break
        case '2':
          packType = "consistent_pack";
          rl.question('Choose pack rarity:\n1. UNCOMMON\n2. RARE\n3. LEGENDARY\n', (answer) => {
            switch (answer) {
              case '1':
                packRarity = staticRarity.UNCOMMON;
                rl.close()     
                openConsistentPack(packRarity);
                break;
              case '2':
                packRarity = staticRarity.RARE;
                rl.close()   
                openConsistentPack(packRarity);
                break;
              case '3':
                packRarity = staticRarity.LEGENDARY;
                rl.close()  
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
                packRarity = staticRarity.UNCOMMON;
                console.log("Enter amount of packs (no more than 24 packs of one rarity in total)")
                console.log("Current amount of opened " + staticRarity[packRarity] + " packs is "+ counters.UNCOMMON)
                rl.on('line', (input) => {
                  const parsed = parseInt(input, 10);
                  console.log('Received: ${parsed}');
                  if(parsed+counters.UNCOMMON <= 24){
                    inputAmount = parsed;
                    rl.close()    
                    openFairPack(inputAmount,packRarity);                                      
                  }
                  else{
                    rl.setPrompt("Inappropriate number of packs. Please try again\n");
                    rl.prompt();
                  }
                });               
                break;
              case '2':
                packRarity = staticRarity.RARE;
                console.log("Enter amount of packs (no more than 24 packs of one rarity in total)")
                console.log("Current amount of opened " + staticRarity[packRarity] + " packs is "+counters.RARE)
                rl.on('line', (input) => {
                  const parsed = parseInt(input, 10);
                  console.log('Received: ${parsed}');
                  if(parsed+counters.RARE <= 24){
                    inputAmount = parsed;
                    rl.close()    
                    openFairPack(inputAmount,packRarity);                                      
                  }
                  else{
                    rl.setPrompt("Inappropriate number of packs. Please try again\n");
                    rl.prompt();
                  }
                });   
                break;
              case '3':
                packRarity = staticRarity.LEGENDARY;
                console.log("Enter amount of packs (no more than 24 packs of one rarity in total)")
                console.log("Current amount of opened " + staticRarity[packRarity] + " packs is "+counters.LEGENDARY)
                rl.on('line', (input) => {
                  const parsed = parseInt(input, 10);
                  console.log('Received: ${parsed}');
                  if(parsed+counters.LEGENDARY <= 24){
                    inputAmount = parsed;
                    rl.close()    
                    openFairPack(inputAmount,packRarity);                                      
                  }
                  else{
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
          rl.close()           
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
let newitem1 = new Item("King's cavalary shield",staticRarity.RARE,staticItemType.SHIELD);
let newitem2 = new Item("Iceborn shield",staticRarity.RARE,staticItemType.SHIELD);
let newitem3 = new Item("Staff of Homa",staticRarity.RARE,staticItemType.WEAPON);
let newitem4 = new Item("Mistsplitter reforged",staticRarity.RARE,staticItemType.WEAPON);
let newitem5 = new Item("King's cavalary helmet",staticRarity.RARE,staticItemType.HELMET);
let newitem6 = new Item("Dragonskin helmet",staticRarity.RARE,staticItemType.HELMET);
let newitem7 = new Item("King's cavalary cuirass",staticRarity.RARE,staticItemType.ARMOR);
let newitem8 = new Item("Dragonskin carapace",staticRarity.RARE,staticItemType.ARMOR);
let newitem9 = new Item("Wooden troll shield",staticRarity.COMMON,staticItemType.SHIELD);
let newitem10 = new Item("Private soldier's shield",staticRarity.COMMON,staticItemType.SHIELD);
let newitem11 = new Item("Wooden helmet",staticRarity.COMMON,staticItemType.HELMET);
let newitem12 = new Item("Iron soldier's helmet",staticRarity.COMMON,staticItemType.HELMET);
let newitem13 = new Item("Cudgel of negotiations",staticRarity.COMMON,staticItemType.WEAPON);
let newitem14 = new Item("Battered soldier sword",staticRarity.COMMON,staticItemType.WEAPON);
let newitem15 = new Item("Old leather armor",staticRarity.COMMON,staticItemType.ARMOR);
let newitem16 = new Item("Private soldier's cuirass",staticRarity.COMMON,staticItemType.ARMOR);
let newitem17 = new Item("Steel shield",staticRarity.UNCOMMON,staticItemType.SHIELD);
let newitem18 = new Item("Spiked shield",staticRarity.UNCOMMON,staticItemType.SHIELD);
let newitem19 = new Item("Claymore",staticRarity.UNCOMMON,staticItemType.WEAPON);
let newitem20 = new Item("Light blessed bow",staticRarity.UNCOMMON,staticItemType.WEAPON);
let newitem21 = new Item("Horned helmet",staticRarity.UNCOMMON,staticItemType.HELMET);
let newitem22 = new Item("Ornate hood",staticRarity.UNCOMMON,staticItemType.HELMET);
let newitem23 = new Item("Spiked armor",staticRarity.UNCOMMON,staticItemType.ARMOR);
let newitem24 = new Item("Priest's robe",staticRarity.UNCOMMON,staticItemType.ARMOR);
let newitem25 = new Item("Shield of nameless hero",staticRarity.LEGENDARY,staticItemType.SHIELD);
let newitem26 = new Item("Dragonbone shield",staticRarity.LEGENDARY,staticItemType.SHIELD);
let newitem27 = new Item("Weapon of nameless hero",staticRarity.LEGENDARY,staticItemType.WEAPON);
let newitem28 = new Item("Dragoon's spear",staticRarity.LEGENDARY,staticItemType.WEAPON);
let newitem29 = new Item("Helmet of nameless hero",staticRarity.LEGENDARY,staticItemType.HELMET);
let newitem30 = new Item("Dragoon's Helm",staticRarity.LEGENDARY,staticItemType.HELMET);
let newitem31 = new Item("Armor of nameless hero",staticRarity.LEGENDARY,staticItemType.ARMOR);
let newitem32 = new Item("Dragoon's Armor",staticRarity.LEGENDARY,staticItemType.ARMOR);
//#endregion

//item collection
const itemlist: Item[] = [newitem1,newitem2,newitem3,newitem4,newitem5,newitem6,newitem7,newitem8,newitem9,newitem10,newitem11,newitem12,newitem13,newitem14,newitem15,newitem16,newitem17,newitem18,newitem19,newitem20,newitem21,newitem22,newitem23,newitem24,newitem25,newitem26,newitem27,newitem28,newitem29,newitem30,newitem31,newitem32]
let inventory: Item[] = [];



function openPack(packRarity: staticRarity) {
  
  let packitemlist: Item[] = [];
  //standard_pack
  if (packType == "standard_pack") {
    console.log("\nOpening standard " + staticRarity[packRarity].toLowerCase() + " pack...\n")
    //slot ratiry (pattern)
    let tempraritylist: staticRarity[] = [packRarity, packRarity, packRarity-1,packRarity-1,packRarity-1];
    
    //determining the final rarity of items
    slotRarityDet(tempraritylist);
    
    //selection of items for rarity
    itemSelecting(tempraritylist, packitemlist);
 
    //push all pack items to inventory
    packitemlist.forEach(element => {
      inventory.push(element);
    });
  }   

  //back to dialog
  Dialog();      
}

function openConsistentPack(packRarity: staticRarity) {
  
  let packitemlist: Item[] = [];
  //consistent_pack
  if (packType == "consistent_pack") {
    console.log("\nOpening consistent " + staticRarity[packRarity].toLowerCase() + " pack...\n")
    
    //slot ratiry (pattern)
    let tempraritylist: staticRarity[] = [packRarity, packRarity, packRarity-1,packRarity-1,packRarity-1];
    
    //determining the final rarity of items
    slotRarityDet(tempraritylist);
    
    //selection of items for rarity
    itemSelecting(tempraritylist, packitemlist);

    //push all pack items to inventory
    packitemlist.forEach(element => {
      inventory.push(element);
    });
  }
  //back to dialog
  Dialog();    
}

function openFairPack(amout: number, packRarity: staticRarity){
  let packitemlist: Item[] = [];
  console.log("\nOpening fair " + amout + " " + staticRarity[packRarity].toLowerCase() + " pack(s)...\n")
  for(let i = 1; i <= amout; i++){
    counters[staticRarity[packRarity]]++;
    console.log(counters[staticRarity[packRarity]]);
    //slot ratiry (pattern)
    let tempraritylist: staticRarity[] = [packRarity, packRarity, packRarity-1, packRarity-1, packRarity-1];
    
    //determining the final rarity of items
    slotRarityDet(tempraritylist);
    console.log("Pack number " + i + "...");
    
    //selection of items for rarity
    itemSelecting(tempraritylist, packitemlist);
    
    
    if(counters[staticRarity[packRarity]]==24){
      checkFairPackItems(packitemlist);
    }

    //push all pack items to inventory
    packitemlist.forEach(element => {
      inventory.push(element);
    });
    packitemlist=[];
  }
  //back to dialog
  Dialog();      
}

function slotRarityDet(tempraritylist: staticRarity[]){
  for (let i = 0; i < 5; i++) {
    while(packRarity < 4)
    {       
      let rarityUpProbability = 10;

      if(randomInt(100) <= rarityUpProbability){
        //increasing current item rarity
        tempraritylist[i] = packRarity+1;
        //decreasing the probability of increasing rarity in progression
        rarityUpProbability = rarityUpProbability * 0.1;
      }
      else{
        break
      }       
    }
  }
}

function itemSelecting(tempraritylist: staticRarity[],packitemlist: Item[]){
  for (let i = 0; i < 5; i++){
    let itemraritylist: Item[] = [];
  
    itemlist.forEach(element => {
      if(element.rarity==tempraritylist[i]){
        itemraritylist.push(element);
      }    
    });
    addItem(packitemlist, itemraritylist);
  }
  if(packType == "consistent_pack")
    checkItemtype(packitemlist);
  packitemlist.forEach(element => {
    console.log("Item name: " + element.name + "\nItem rarity: " + staticRarity[element.rarity] + "\nItem type: " + staticItemType[element.type] + "\n")
  });
}

function addItem(packitemlist: Item[],itemRaritylist:Item[]){
  let tempRandom = randomInt(itemRaritylist.length); 
  packitemlist.push(itemRaritylist[tempRandom]);
}

function checkItemtype(packitemlist: Item[]){
  
  packitemlist.sort((a, b) => a.type > b.type ? 1 : -1);
  let counter = 0;
  for(let i = 0; i < 4; i++){
    let currentElem: staticItemType = packitemlist[i].type;;
    let nextElem: staticItemType = packitemlist[i+1].type;   
    if(currentElem == nextElem){
      counter++;
      if(counter==2){
        //items array with the same rarity (6 elements)
        let tempitemlist: Item[] = [];
        itemlist.forEach(element => {
          if(element.rarity==packitemlist[i].rarity && element.type !=packitemlist[i].type){
            tempitemlist.push(element);
          }    
        });       
        packitemlist[i] = tempitemlist[randomInt(6)];
        counter = 0;
      }
    }
  }
}

function checkFairPackItems(packitemlist: Item[]){
  let tempitemlist: Item[] = []
  //fill all items to array with the same rarity
  itemlist.forEach(element => {
    if(element.rarity==packRarity){
      tempitemlist.push(element);
    }
  });
  
  //checking for matching items. items already received by the player
  inventory.forEach(elementInv => {
    for(let i = tempitemlist.length -1 ;  i >= 0; i--) {
      if(tempitemlist[i].name==elementInv.name){
        tempitemlist.splice(i, 1);
      }
    }
  }); 

  //fill missing items
  if(tempitemlist!=null){
    for(let i = 0; i < tempitemlist.length; i++){
      tempitemlist.forEach(element => {
        packitemlist[i] = element;
      });
    }
  }
}

function openInventory(){
  let itemsAmount: number = 0;
  inventory.forEach(element => {
    itemsAmount++;
    console.log(itemsAmount)
    console.log("Item name: " + element.name + "\nItem rarity: " + staticRarity[element.rarity] + "\nItem type: " + staticItemType[element.type] + "\n")
  });
  console.log("Items held: " + itemsAmount)
  //back to dialog
  Dialog();  
}