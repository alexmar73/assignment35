const products=
{
    fakeDB:[],

    init()
    {

        

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/blueJacket.png`, category: `Coats & Jackets`, description: `Sam Edelman Denim Trucker Jacket`, price: `CAD $168.00`, reviews: ``});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/earrings.png`, category: `Jewelry`, description: `Kendra Scott Dee Macrame Drop Earrings`, price: `CAD $58.00`, reviews: `(905) reviews`});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/blackbag.png`, category: `Handbags & Wallets`, description: `MZ Wallace Small Max Tote`, price: `CAD $245.00`, reviews: ``});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/blueDress.png`, category: `Women's Dresses`, description: `Mac Duggal Embroidered Gown`, price: `CAD $538.00`, reviews: `(16) reviews`});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/boots.png`, category: `Women's Shoes`, description: `Dr. Martens 1490 Lace-Up Boot`, price: `CAD 169.00`, reviews: `(13) reviews`});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/redShoes.png`, category: `Women's Shoes`, description: `Tory Burch Espadrille Flat`, price: `$178.00 - $198.00`, reviews: `(378) reviews`});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/athletic.png`, category: `Activewear`, description: `Zella Quilted Hybrid Jacket`, price: `CAD 136.00`, reviews: `(134) reviews`});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/perfume.png`, category: `Beauty & Fragrance`, description: `Marc Jacobs Daisy Love Eau de Toilette`, price: `CAD 86.00`, reviews: `(3066) reviews`});

        this.fakeDB.push({title: "Women's New Arrivals", image: `./img/products/jumpsuit.png`, category: `Jumpsuits & Rompers`, description: `Bardot Disco Sequin Halter Jumpsuit`, price: `CAD 274.00`, reviews: `(43) reviews`});
    },

    
        
    

    getAllProducts()
    {

        return this.fakeDB;
    },


}

products.init();
module.exports=products;