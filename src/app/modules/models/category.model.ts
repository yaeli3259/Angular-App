export class Category {
    code: number;
    name: string;
    iconRoute: string;
 
    constructor(code: number= 0, name: string ="", iconRoute: string ="") {
        this.code = code;
        this.name = name;
        this.iconRoute = iconRoute;
    }
}
