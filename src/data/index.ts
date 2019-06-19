// sku,orderId,containerId,description,createdAtDate,createdAtTime,quantity,price,x3,x4,x5,x6,x7,x8,x9,category,type,refrigerated,x10

import uuid from 'uuid';

const createCustomer = (name: string) => {
  return {
    name,
    id: uuid.v4(),
    mobile: 5550000000 + Math.random() * 1000000,
  };
};

// Pick Walk
const pickWalk = {
  customer: createCustomer('Daniel F.'),
  pickId: uuid.v4(),
  createdAt: new Date().toISOString(),
  items: [
    {
      name: 'Organic Roasted Garlic Pasta Sauce',
      image:
        'https://brandless.imgix.net/variant_thumbnails/images/000/000/064/original/11058_PastaSauce_RoastedGarlic_RGB_1000x1000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress',
      sku: '725272730713',
      quantity: 3,
      price: 3.0,
      netWeightOz: 24,
      picked: false,
      scanned: false,
    },
    {
      name: 'Green Tea & Aloe Body Wash',
      image:
        'https://brandless.imgix.net/variant_thumbnails/images/000/001/001/original/31006_BodyWash-GreenTeaAloe_2000x2000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress',
      sku: '725272730720',
      quantity: 1,
      price: 6.0,
      netWeightOz: 10,
      picked: false,
      scanned: false,
    },
    {
      name: 'Organic Applesauce Pouches',
      image:
        'https://brandless-2.imgix.net/variant_thumbnails/images/000/001/303/original/11015_Applesauce_wpouch_2000x2000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=df348a1fb1ca9a68426930062f364ef2',
      sku: '725272730737',
      quantity: 4,
      price: 4.0,
      netWeightOz: 3.2,
      picked: false,
      scanned: false,
    },
    {
      name: 'Organic Extra Virgin Olive Oil',
      image:
        'https://brandless-1.imgix.net/variant_thumbnails/images/000/000/029/original/11025_Oil_OliveEVirgin_RGB_1000x1000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=0293a71c0961e3a3446a7f950f4a7ab3',
      sku: '725272730744',
      quantity: 1,
      price: 3.0,
      netWeightOz: 8.5,
      picked: false,
      scanned: false,
    },
    {
      name: 'Plant Based Pet Wipes (100ct)',
      image:
        'https://brandless.imgix.net/variant_thumbnails/images/000/001/610/original/74001_Wipes-PetCuc_OOP_1x1.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=3912051880dad8d27777f03777163b97',
      sku: '725272730706',
      quantity: 6,
      price: 3.0,
      netWeightOz: 28,
      picked: false,
      scanned: false,
    },
    {
      name: 'Organic Honey 100% Pure',
      image:
        'https://brandless.imgix.net/variant_thumbnails/images/000/001/796/original/11136_Honey_16oz_Front_RGB_1x1.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=01a4ef2d4be9724071d39e3cb50637a6',
      sku: '725272730799',
      quantity: 1,
      price: 4.0,
      netWeightOz: 16,
      picked: false,
      scanned: false,
    },
    {
      name: 'Moisturizing Hand Soap, Avocado Basil',
      image:
        'https://brandless.imgix.net/variant_thumbnails/images/000/001/774/original/31053_GelHandSoap_AvoBasil_2000x2000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=e8038f08db08f54ad60d27bd9cf89d5a',
      sku: '725272730751',
      quantity: 1,
      price: 6.0,
      netWeightOz: 9.5,
      picked: false,
      scanned: false,
    },
    {
      name: 'Cacao Flavored Nut & Amaranth Clusters',
      image:
        'https://brandless-1.imgix.net/variant_thumbnails/images/000/001/737/original/14094_NutAmaranthClusters_Cacao_wclusters_2000x2000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=de0589b5fd9872f18f1feca357317ca3',
      sku: '725272730768',
      quantity: 1,
      price: 3.0,
      netWeightOz: 4.5,
      picked: false,
      scanned: false,
    },
    {
      name: 'Dark Chocolate Covered Quinoa Bites',
      image:
        'https://brandless-1.imgix.net/variant_thumbnails/images/000/000/216/original/14069_QuinoaBites_drkChocolate_RGB_1000x1000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=c40d9bc24b332dbdc3d10028c74997e1',
      sku: '725272730775',
      quantity: 1,
      price: 4.0,
      netWeightOz: 3,
      picked: false,
      scanned: false,
    },
    {
      name: 'Organic Ketchup',
      image:
        'https://brandless.imgix.net/variant_thumbnails/images/000/000/028/original/11024_Ketchup_v2_RGB_1000x1000.png?ixlib=rb-1.1.0&w=1180&h=1180&q=85&auto=format%2Ccompress&s=e4c56042cddaac2094a8e7acf43e843a',
      sku: '725272730782',
      quantity: 2,
      price: 1.5,
      netWeightOz: 20,
      picked: false,
      scanned: false,
    },
  ],
  substitutedItems: [],
  outOfStockItems: [],
};

const initialPickWalks = Array.from({ length: 3 }).map((x, i) => {
  if (i === 0) return pickWalk;
  if (i === 1)
    return {
      ...pickWalk,
      customer: createCustomer('Mark P.'),
      pickId: uuid.v4(),
      createdAt: new Date().toISOString(),
      items: pickWalk.items.slice(5),
    };
  if (i === 2)
    return {
      ...pickWalk,
      customer: createCustomer('Becky A.'),
      pickId: uuid.v4(),
      createdAt: new Date().toISOString(),
      items: pickWalk.items.slice(7),
    };
});

export { pickWalk, initialPickWalks };
