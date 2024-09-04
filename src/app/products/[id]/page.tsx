"use client";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDetail {
    content: string;
    imageUrl: string;
}

export default function ProductDetailPage() {
    const params = useParams();
    const detailId = params['id'] as string;
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

    useEffect(() => {
        console.log('detailId', detailId)
        if (detailId) {
            const getProduct = async (id: string) => {
                try {
                    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                    const apiPath = process.env.NEXT_PUBLIC_API_PATH;
                    const productRes = await axios.get(`${baseUrl}/v2/api/${apiPath}/product/${id}`);
                    setProductDetail(productRes.data.product);
                } catch (error) {
                    console.error("Failed to fetch product details", error);
                }
            };

            getProduct(detailId);
        }
    }, [detailId]);

    return (
        <div>
            <h1>Product Detail Page</h1>
            <p>Detail ID: {detailId}</p>
            <div>{productDetail?.content}</div>
            <div><img src={productDetail?.imageUrl} alt="Product Image" /></div>
        </div>
    );
}


// ==============SSR===============
// import Image from 'next/image';
// import React from 'react';

// interface ProductDetail {
//     content: string;
//     imageUrl: string;
// }

// async function fetchProductDetail(id: string): Promise<ProductDetail | null> {
//     try {
//         const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//         const apiPath = process.env.NEXT_PUBLIC_API_PATH;
//         const res = await fetch(`${baseUrl}/v2/api/${apiPath}/product/${id}`, {
//             next: { revalidate: 10 },
//         });

//         if (!res.ok) {
//             throw new Error(`Failed to fetch product details: ${res.statusText}`);
//         }

//         const data = await res.json();
//         console.log('Fetched data:', data);

//         if (data && data.product && typeof data.product.content === 'string' && typeof data.product.imageUrl === 'string') {
//             return data.product;
//         } else {
//             console.warn('Unexpected data format:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching product detail:', error);
//         return null; 
//     }
// }

// export const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
//     const productDetail = await fetchProductDetail(params.id);

//     if (!productDetail) {
//         return <div>Error loading product details</div>;
//     }

//     return (
//         <div>
//             <h1>Product Detail Page</h1>
//             <p>Detail ID: {params.id}</p>
//             <div>{productDetail.content || 'No content available'}</div>
//             {productDetail.imageUrl ? (
//                 <div><Image src={productDetail.imageUrl} alt="Product Image" width={100} height={75} /></div>
//             ) : (
//                 <div>No image available</div>
//             )}
//         </div>
//     );
// };

// export default ProductDetailPage;