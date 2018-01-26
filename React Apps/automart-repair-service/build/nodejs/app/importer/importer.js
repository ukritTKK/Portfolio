csv = require('./csv');

var csvHeaders = {
    users: {
        headers: ['username','password','user_type','name','email','home_address','home_address_lat','home_address_lng','tel']
    },
    parts: {
        headers: ['part_number','name','type','image_url','price','amount']
    },
    garages: {
        headers: ['name','tel','rating','address','address_lat','address_lng','assoc_user_id','enabled','image_url']
    },
    mechanics: {
	       headers: ['garage_id','name','tel','rating','service_amount','image_url','assoc_user_id','enabled']
    }
}

//adjust this path to the correct location
//csv.importFile(__dirname + '/users.csv', csvHeaders.users.headers, 'User');
//csv.importFile(__dirname + '/parts.csv', csvHeaders.parts.headers, 'Part');

//csv.importFile(__dirname + '/garages.csv', csvHeaders.garages.headers, 'Garage');

csv.importFile(__dirname + '/mechanics.csv', csvHeaders.mechanics.headers, 'Mechanic');
