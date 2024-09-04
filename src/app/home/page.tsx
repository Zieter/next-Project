import React from 'react';// jest要求引入
import Link from "next/link";

export default function Home() {
    return (<>
        <p>HomePage</p>
        <Link className="border rounded px-2 py-1 bg-blue-500 text-white" href={`/products`}>去產品頁</Link>
    </>
    );
}