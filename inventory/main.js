/*
Product Inventory Project
Create an application which manages an inventory of products.
Create a product class which has a price, id, and quantity on hand.
Then create an inventory class which keeps track of various products
and can sum up the inventory value.
*/

class Product{
    constructor(id, name, desc, measure, price){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.measure = measure;
        this.quantity = 0;
        this.price; //unitary price
    }

    get id(){ return this.id; }

    get name(){ return this.name; }
    set name(value){ this.name = ""+value; }

    get description(){ return this.description }
    set description(value){ this.description = ""+value }

    get measure(){ return this.measure }
    set measure(value){ this.measure = ""+value }

    get quantity(){ return this.quantity }
    set quantity(value){
        if(isFinite(1*value)) this.quantity = value;
    }

    get price(){ return this.price }
    set price(value){
        if(isFinite(1*value)) this.price = value;
    }
}

class Storage(){
    constructor(){
        this.storage = new Map();
    }

    insert(prod){
        if(this.storage.has(prod.id)) console.log("Error: An item with this ID is already stored!");
        else {
            this.storage.set(prod.id, prod);
            console.log("The item was successfully stored.");
        }
    }

    remove(id){
        if(this.storage.has(id)){
            this.storage.remove(id);
            console.log(`The item identified by ${id} was removed.`);
        }
        else console.log("Error: The item was not found in the storage.");
    }

    removeAll(){
        this.storage.clear();
        console.log("All items were removed. The storage is now empty!");
    }

    searchID(value){
        if(this.storage.has(value)) return [this.storage.get(value)];
    }

    searchName(value){
        const result = [];
        for(item of this.storage){
            if(item[1].name.includes(value)) result.push(item[1]);
        }
        return result;
    }

    searchDesc(value){
        const result = [];
        for(item of this.storage){
            if(item[1].description.includes(value)) result.push(item[1]);
        }
        return result;
    }
}


function showScreen(state){
    switch(state){
        case "welcome":
            console.log(
                "Welcome to the Eighties Store Manager!"+
                "\nChoose you option:"+
                "1) STORAGE MANAGEMENT"+
                "2) BUY OR SELL"+
                "3) EXIT"
            );
            break;
        case "mgmt":
            break;
        case "buysell":
            break;
        default:
            break;
    }
}

function main(){
    let running = true;


    while(running){

    }

    console.log("Execution finished. Bye!");
}

main();
