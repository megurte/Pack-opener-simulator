interface IItemSettings {
    ID: number,
    theName: string,
    itemRarity: ITEM_RARITY,
    itemType: ITEM_TYPE,
}

class Item {
    ID: number;
    name: string;
    rarity: ITEM_RARITY;
    type: ITEM_TYPE;

    constructor(settings: IItemSettings) {
        this.ID = settings.ID;
        this.name = settings.theName;
        this.rarity = settings.itemRarity;
        this.type = settings.itemType;
    };
}
