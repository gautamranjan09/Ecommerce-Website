// Dummy data for products
const products = [
    {
      id: 1,
      name: 'iPhone 15 pro',
      priceText: '₹79,900',
      price:79990,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/apple/apple_image-1.jpg","/apple/apple_image-2.jpg","/apple/apple_image-3.jpg", "/apple/apple_image-4.jpg"],
      description: 'The latest iPhone with a powerful A15 Bionic chip and advanced dual-camera system.',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      priceText: '₹69,999',
      price:69999,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/samsung/image-1.jpg","/samsung/image-2.jpg","/samsung/image-3.jpg","/samsung/image-4.jpg"],
      description: 'A flagship Android phone featuring an incredible display and pro-grade cameras.',
    },
    {
      id: 3,
      name: 'Google Pixel 8 pro',
      priceText: '₹59,999',
      price:59999,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/google/image1.webp","/google/image2.webp","/google/image3.webp","/google/image4.webp"],
      description: 'Google’s own smartphone with a clean Android experience and stunning camera quality.',
    },
    {
      id: 4,
      name: 'OnePlus 12',
      priceText: '₹64,999',
      price:64999,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/oneplus/image1.jpg","/oneplus/image2.jpg","/oneplus/image3.jpg","/oneplus/image4.jpg"],
      description: 'A high-end phone with a fast display, powerful Snapdragon 888, and versatile cameras.',
    },
    {
      id: 5,
      name: 'Xiaomi 14',
      priceText: '₹49,999',
      price:49999,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/mi/image1.jpg","/mi/image2.jpg","/mi/image3.jpg","/mi/image4.jpg"],
      description: 'A budget-friendly flagship killer with excellent specs and impressive display.',
    },
    {
      id: 6,
      name: 'Motorola razr 50 ultra',
      priceText: '₹99,999',
      price:99999,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/moto/image1.jpg","/moto/image2.jpg","/moto/image3.jpg","/moto/image4.jpg"],
      description: 'Sony’s flagship smartphone with a focus on photography and high-end features.',
    },
    {
      id: 7,
      name: 'Oppo Reno 10 pro',
      priceText: '₹84,999',
      price:84999,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/oppo/image1.jpg","/oppo/image2.jpg","/oppo/image3.jpg","/oppo/image4.jpg"],
      description: 'A beautifully designed phone with stunning performance and a 120Hz display.',
    },
    {
      id: 8,
      name: 'Huawei P50 Pro',
      priceText: '₹89,999',
      price:89999,
      reviews: [
        { user: 'Alice', comment: 'Great product!' },
        { user: 'Bob', comment: 'Very useful.' }
      ],
      image: ["/huwai/image1.jpg","/huwai/image2.jpg","/huwai/image3.jpg","/huwai/image4.jpg"],
      description: 'Huawei’s premium phone offering a great design, powerful hardware, and a versatile camera setup.',
    }
  ];

  export default products;