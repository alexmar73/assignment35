const categories=
{
    fakeDB:[],

    init()
    {

        this.fakeDB.push({title:'Apparel', image: `/img/home/categories/footwear.jpg`});

        this.fakeDB.push({title:'Home Accessories', image: `/img/home/categories/home.jpg`});

        this.fakeDB.push({title:'Skin Care', image: `/img/home/categories/personal_care.png`});

        this.fakeDB.push({title:'Kids & Baby', image: `/img/home/categories/baby.png`});

        this.fakeDB.push({title:'Books', image: `/img/home/categories/book.jpg`});

    },

    getAllProducts()
    {

        return this.fakeDB;
    }

}

categories.init();
module.exports=categories;