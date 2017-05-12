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

class Storage{
    constructor(){
        this.storage = new Map();
    }

    insert(item){
        if(this.storage.has(item.id)) console.log("Error: An item with this ID is already stored!");
        else {
            this.storage.set(item.id, item);
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

class Input{
    constructor(){
        this.changed = false;
        this.data = "";
    }

    write(value){
        if(value !== null){
            this.changed = true;
            this.data = value;
        }
    }

    read(){
        if(!this.changed) return null;
        else{
            this.changed = false;
            return this.data;
        }
    }
}


function showScreen(state){
    switch(state){
        case "welcome":
            console.log(
                "Welcome to the Eighties Store Manager!\n"+
                "\nChoose you option:"+
                "\n1) SELL PRODUCTS"+
                "\n2) MANAGE STORAGE"+
                "\n3) EXIT"
            );
            break;
        case "sell":
            console.log(
                "The products are:"+
                "\nID: Choose you option:"+
                "1) SELL PRODUCTS"+
                "2) MANAGE STORAGE"+
                "3) EXIT"
            );
            break;
        case "storage":
            break;
        default:
            break;
    }

}



function main(){
    const input = new Input();

    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
        let chunk = process.stdin.read();
        if (chunk !== null) {
            input.write(chunk);
        }
    });

    const storage = new Storage();

    let promptState = "welcome";
    do{
        console.log(">>>> Amazing Store Manager 1987 <<<<\n");

        if(promptState === "welcome"){
            console.log(
                "Welcome to the Store Manager! Type your option:"+
                "\n1) SELL PRODUCTS"+
                "\n2) MANAGE STORAGE"+
                "\n3) EXIT"
            );

            let option, ask = true;
            while(ask){
                option = input.read();

                if(option == "1"){
                    ask = false;
                    console.log("good 1");
                    //SELL
                }
                else if(option == "2"){
                    ask = false;
                    console.log("good 2");
                    //STORAGE
                }
                else if(option == "3"){
                    ask = false;
                    console.log("good 3");
                    //EXIT
                }
            }
        }
        else if(promptState === "exit"){
            console.log("We are glad to help you. Goodbye!");
            promptState = null;
        }
        else{
            console.log("Something unexpected happened. Run!!");
            promptState = null;
        }
    } while(promptState !== null);

}

main();
