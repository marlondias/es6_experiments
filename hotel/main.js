/* Hotel Reservation System
Create a reservation system which books hotel rooms.
It charges various rates for particular sections of the hotel.
Example, hotel rooms have penthouse suites which cost more.
Keep track of when rooms will be available and can be scheduled.
*/

class Room{
	constructor(id, price, size){
		this.id = id;
		this.price = price;
		this.size = size;
		this.available = true;
	}
}

const hotel = {
	name: "Moderny",
	suites: new Map(),
	rooms: new Map(),
	revenue: 0,
	find: function(value){
		const id = isNaN(value * 1) ? 0 : value * 1;
		if(this.suites.has(id)) return this.suites.get(id);
		else if(this.rooms.has(id)) return this.rooms.get(id);
		else return null;
	}
};


(function(){
	const building = document.getElementById("building");

	const button_in = document.createElement('button');
	button_in.setAttribute('type', 'button');
	button_in.innerHTML = 'Check-in';
	button_in.addEventListener('click', function(){
		const target = hotel.find(this.getAttribute('data-target'));
		if(target !== null){
			toggleRoom(target);
			console.log(target);
		}
	});

	const button_out = document.createElement('button');
	button_out.setAttribute('type', 'button');
	button_out.innerHTML = 'Check-out';
	button_out.addEventListener('click', function(){
		const id = this.getAttribute('data-target');
		const target = hotel.find(id);
		if(target !== null){
			toggleRoom(target);
			console.log(target);
		}
	});

	function setInfo(roomObj){
		const txtID = document.getElementById("room_id");
		const txtSize = document.getElementById("room_size");
		const txtPrice = document.getElementById("room_price");
		const txtAvailable = document.getElementById("room_available");
		const boxOptions = document.getElementById("room_options");

		txtID.innerHTML = roomObj.id;
		txtSize.innerHTML = roomObj.size;
		txtPrice.innerHTML = roomObj.price;
		if(roomObj.available){
			txtAvailable.innerHTML = 'This room is available';
			while(boxOptions.firstChild){
				boxOptions.removeChild(boxOptions.firstChild);
			}
			button_in.setAttribute('data-target', roomObj.id);
			boxOptions.appendChild(button_in);
		}
		else{
			txtAvailable.innerHTML = 'This room is already in use';
			while(boxOptions.firstChild){
				boxOptions.removeChild(boxOptions.firstChild);
			}
			button_out.setAttribute('data-target', roomObj.id);
			boxOptions.appendChild(button_out);
		}
	}

	function toggleRoom(value){
		const id = isNaN(value * 1) ? 0 : value * 1;
		const roomObj = hotel.find(id);
		if(roomObj === null) return;
		else{
			const windows = document.getElementById('building').getElementsByClassName('window');
			if(roomObj.available){
				roomObj.available = false;
				for(let w of windows){
					if(w.getAttribute('title') == id) w.className += ' unavailable';
				}
			}
			else{
				roomObj.available = true;
				for(let w of windows){
					if(w.getAttribute('title') == id) w.className = 'window';
				}
			}
		}
	}





	const countRoyalFloors = 2;
	const countNormalFloors = 4;
	const roomsPerRoyalFloor = 4;
	const roomsPerNormalFloor = 6;
	const royalBasePrice = 100;
	const normalBasePrice = 50;

	let height = (countRoyalFloors + countNormalFloors);


	// Cria HTML do telhado
	const roof = document.createElement("div");
	roof.className = "roof";
	building.appendChild(roof);

	// Instancia os quartos especiais
	for(let f=countRoyalFloors; f>0; f--){
		//Cria o novo andar
		const newFloor = document.createElement("div");
		newFloor.className = "floor royal";

		for(let r=1; r<=roomsPerRoyalFloor; r++){
			// Instancia e adiciona o quarto ao hotel
			const id = height*100 + r;
			const price = royalBasePrice;
			const roomObj = new Room(id, price, 2);
			hotel.suites.set(id, roomObj);

			// Adiciona uma janela ao HTML
			const newWindow = document.createElement("div");
			newWindow.className = (r === roomsPerRoyalFloor) ? "window last" : "window";
			newWindow.setAttribute("title", id);
			newFloor.appendChild(newWindow);

			// Prepara evento de click
			newWindow.addEventListener('click', function(){
				setInfo(roomObj);
			});
		}
		building.appendChild(newFloor);
		height--;
	}

	// Instancia os quartos comuns
	for(let f=countNormalFloors; f>0; f--){
		//Cria o novo andar
		const newFloor = document.createElement("div");
		newFloor.className = "floor";

		for(let r=1; r<=roomsPerNormalFloor; r++){
			// Instancia e adiciona o quarto ao hotel
			const id = height*100 + r;
			const price = normalBasePrice;
			const roomObj = new Room(id, price, 1);
			hotel.rooms.set(id, roomObj);

			// Adiciona uma janela ao HTML
			const newWindow = document.createElement("div");
			newWindow.className = (r === roomsPerNormalFloor) ? "window last" : "window";
			newWindow.setAttribute("title", id);
			newFloor.appendChild(newWindow);

			// Prepara evento de click
			newWindow.addEventListener('click', function(){
				setInfo(roomObj);
			});
		}
		building.appendChild(newFloor);
		height--;
	}

	// Cria HTML do térreo
	const door = document.createElement("div");
	const lastFloor = document.createElement("div");
	door.className = "door";
	lastFloor.className = "floor ground";
	lastFloor.appendChild(door);
	building.appendChild(lastFloor);

})();
