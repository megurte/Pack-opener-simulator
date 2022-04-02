class Utils {
    public static CreateMap(map: any): Item[] {
        let result: Item[] = [];

        for (let i = 0; i < map.length; i++) {
            result.push(map[i]);
        }

        return result;
    }

}