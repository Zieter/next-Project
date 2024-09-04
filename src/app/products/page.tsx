// =================CSR=================
// "use client";// 要標記客戶端才可以使用

// import axios from "axios";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface Product {
//     id: string;
//     imageUrl: string;
// }

// export default function Products() {
//     const [products, setProducts] = useState<Product[]>([]);

//     const getProducts = async (category='', page = 1): Promise<void> => {
//         const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//         const apiPath = process.env.NEXT_PUBLIC_API_PATH;
//         let productRes;
//         if (category === 'ALL') {
//             productRes = await axios.get(`${baseUrl}v2/api/${apiPath}/products?page=${page}`);
//         } else {
//             productRes = await axios.get(`${baseUrl}v2/api/${apiPath}/products?category=${category}&page=${page}`);
//         }
//         setProducts(productRes.data.products);
//     }
//     useEffect(()=> {
//         getProducts()
//     }, [])
//     return (<>
//         {products.map(item => {
//             return (
//                 <Link key={item.id} href={`/products/${item.id}`}>
//                     <img src={item.imageUrl} width={100} />
//                 </Link>
//             )
//         })}
//     </>
//     )
// }


// ====================SSR=================
import React from 'react';
import Link from 'next/link';

interface Product {
    id: string;
    imageUrl: string;
}

async function fetchProducts(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPath = process.env.NEXT_PUBLIC_API_PATH;
    const res = await fetch(`${baseUrl}v2/api/${apiPath}/products?page=1`);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    return data.products;
}

const ProductsPage = async () => {
    const products = await fetchProducts();

    return (
        <>
            {products.map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>
                    <img src={item.imageUrl} width={100} alt="Product" />
                </Link>
            ))}
        </>
    );
};

export default ProductsPage;




// =================SSG================= getStaticProps、getServerSideProps 和 getStaticPaths 等傳統的數據抓取方法不再適用
// import React from 'react';
// import Link from 'next/link';
// import { cache } from 'react';

// interface Product {
//     id: string;
//     imageUrl: string;
// }

// // 使用 React 內建的 cache 方法來暫存數據抓取的結果
// const fetchProducts = cache(async (): Promise<Product[]> => {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     const apiPath = process.env.NEXT_PUBLIC_API_PATH;
//     const res = await fetch(`${baseUrl}v2/api/${apiPath}/products?page=1`);
//     if (!res.ok) {
//         throw new Error('Failed to fetch products');
//     }
//     const data = await res.json();
//     return data.products;
// });

// const ProductsPage = async () => {
//     const products = await fetchProducts();

//     return (
//         <>
//             {products.map((item) => (
//                 <Link key={item.id} href={`/products/${item.id}`}>
//                     <img src={item.imageUrl} width={100} alt="Product" />
//                 </Link>
//             ))}
//         </>
//     );
// };

// export default ProductsPage;






// =================ISR=================
// import React from 'react';
// import Link from 'next/link';
// import { cache } from 'react';

// interface Product {
//     id: string;
//     imageUrl: string;
// }

// // 使用 ISR 的 fetch 方法
// const fetchProducts = cache(async (): Promise<Product[]> => {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     const apiPath = process.env.NEXT_PUBLIC_API_PATH;
//     const res = await fetch(`${baseUrl}v2/api/${apiPath}/products?page=1`, {
//         next: { revalidate: 60 }, // 在 60 秒後重新驗證數據
//     });
//     if (!res.ok) {
//         throw new Error('Failed to fetch products');
//     }
//     const data = await res.json();
//     return data.products;
// });

// const ProductsPage = async () => {
//     const products = await fetchProducts();
//     return (
//         <>
//             {products.map((item) => (
//                 <Link key={item.id} href={`/products/${item.id}`}>
//                     <img src={item.imageUrl} width={100} alt="Product" />
//                 </Link>
//             ))}
//         </>
//     );
// };

// export default ProductsPage;



// =================React Server Components=================
// import React from 'react';
// import Link from 'next/link';

// interface Product {
//     id: string;
//     imageUrl: string;
// }

// // 伺服器端抓取數據
// const fetchProducts = async (): Promise<Product[]> => {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     const apiPath = process.env.NEXT_PUBLIC_API_PATH;
//     const res = await fetch(`${baseUrl}v2/api/${apiPath}/products?page=1`, {
//         next: { revalidate: 60 }, // 60 秒後重新驗證數據，實現 ISR
//     });
//     if (!res.ok) {
//         throw new Error('Failed to fetch products');
//     }
//     const data = await res.json();
//     return data.products;
// };

// const ProductsPage = async () => {
//     // 在伺服器端抓取產品數據
//     const products = await fetchProducts();

//     return (
//         <>
//             {products.map((item) => (
//                 <Link key={item.id} href={`/products/${item.id}`}>
//                     <img src={item.imageUrl} width={100} alt="Product" />
//                 </Link>
//             ))}
//         </>
//     );
// };

// export default ProductsPage;





// =====================混合 SSR 和 CSR -1 =====================
// 使用 Server Component 獲取初始數據

// src/app/products/page.tsx
// import axios from 'axios';
// import Link from 'next/link';

// // 定義 Product 類型
// interface Product {
//     id: string;
//     imageUrl: string;
// }

// // 服務端數據獲取函數
// async function fetchProducts(category = '', page = 1): Promise<Product[]> {
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//     const apiPath = process.env.NEXT_PUBLIC_API_PATH;

//     try {
//         const response = category === 'ALL'
//             ? await axios.get(`${baseUrl}v2/api/${apiPath}/products?page=${page}`)
//             : await axios.get(`${baseUrl}v2/api/${apiPath}/products?category=${category}&page=${page}`);
//         return response.data.products;
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return [];
//     }
// }

// export default async function Products({ searchParams }: { searchParams: { category?: string; page?: string } }) {
//     const category = searchParams.category || '';
//     const page = searchParams.page || 1;
//     const products = await fetchProducts(category, Number(page));

//     return (
//         <div>
//             {products.map(item => (
//                 <Link key={item.id} href={`/products/${item.id}`}>
//                     <img src={item.imageUrl} width={100} alt={item.id} />
//                 </Link>
//             ))}
//             {/* 可以在這裡添加客戶端組件以實現額外的交互 */}
//         </div>
//     );
// }

