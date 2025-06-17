// Sample data for display
export const dummy_coupons = [
    {
        id: 1,
        brand: 'Nike',
        title: '30% Off Running Shoes',
        description: 'Get 30% discount on all running shoes collection',
        code: 'NIKE30RUN',
        images: [
            { id: 1, image_name: require("./../../assets/dummy/nike_1.jpeg") },
            { id: 2, image_name: require("./../../assets/dummy/nike_2.jpeg") },
            { id: 3, image_name: require("./../../assets/dummy/nike_3.jpeg") },
            { id: 4, image_name: require("./../../assets/dummy/nike_4.jpeg") }
        ],
        copyCount: 45,
        clickCount: 32,
        expiry_date: "2025-06-10 19:48:19"
    },
    {
        id: 2,
        brand: 'Adidas',
        title: '25% Off Athletic Wear',
        description: 'Save on premium athletic clothing and accessories',
        code: 'ADIDAS25',
        images: [
            { id: 1, image_name: require("./../../assets/dummy/addidas_1.jpeg") },
            { id: 2, image_name: require("./../../assets/dummy/addidas_2.jpeg") },
            { id: 3, image_name: require("./../../assets/dummy/addidas_3.jpeg") },
            { id: 4, image_name: require("./../../assets/dummy/addidas_4.jpeg") },
            { id: 5, image_name: require("./../../assets/dummy/addidas_5.jpeg") }
        ],
        copyCount: 78,
        clickCount: 56,
        expiry_date: "2025-07-10 19:48:19"
    },
    {
        id: 3,
        brand: 'Samsung',
        title: '15% Off Galaxy Series',
        description: 'Discount on latest Galaxy smartphones and tablets',
        code: 'GALAXY15',
        images: [
            { id: 1, image_name: require("./../../assets/dummy/samsung_1.jpeg") },
            { id: 2, image_name: require("./../../assets/dummy/samsung_2.jpeg") },
            { id: 3, image_name: require("./../../assets/dummy/samsung_3.jpeg") },
            { id: 4, image_name: require("./../../assets/dummy/samsung_4.jpeg") }
        ],
        copyCount: 23,
        clickCount: 18,
        expiry_date: "2025-06-19 19:48:19"
    }
];
