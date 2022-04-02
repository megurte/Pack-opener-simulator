class Utils {
    public static CreateMap(map: any): Item[] {
        let result: Item[] = [];

        for (let item in map) {
            if (map.hasOwnProperty(item)) {
                result.push(map[item]);
            }
        }

        return result;
    }
}