const sellers=
{
    fakeDB:[],

    init()
    {

        this.fakeDB.push({title:'Ray-Ban Clubmaster Classic Gloss Tortoise', image: `/img/home/sellers/sunglasses.png`});
        this.fakeDB.push({title:'Calm X Gravity: Travel Blanket', image: `/img/home/sellers/blanket.png`});
        this.fakeDB.push({title:'HERBIVORE Jade Facial Roller', image: `/img/home/sellers/jadeRoller.png`});
        this.fakeDB.push({title:'FJALLRAVEN Kanken Water Resistant Backpack', image: `/img/home/sellers/backpack.png`});
        this.fakeDB.push({title:'MOBOT Firecracker 18-OUNCE Foam Water Bottle', image: `/img/home/sellers/bottle.png`});
        this.fakeDB.push({title:'UGG Scuff Slipper (Men)', image: `/img/home/sellers/slippers.png`});

    },

    getAllProducts()
    {

        return this.fakeDB;
    }

}

sellers.init();
module.exports=sellers;