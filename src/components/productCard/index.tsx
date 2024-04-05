import Link from "next/link"
import Image from "next/image"
import {ProductProps} from '../../utils/types/product'
import { IoStar } from "react-icons/io5";

interface ProductCardProps{
    product: ProductProps
}

export default function ProductCard({product}: ProductCardProps){

    return(
        <div className="w-full bg-white rounded-lg p-4 mb-5 hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="relative h-80 ">
                <Image 
                className="rounded-lg object-contain mix-blend-multiply p-6"
                src={product.image}
                alt={product.title}
                fill={true}
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                />
            </div>

            <div className="flex flex-col gap-3 w-full mt-4">
                <h2 className="flex w-64 line-clamp-1 font-bold text-ellipsis overflow-hidden" style={{ display: '-webkit-box', boxOrient: 'vertical'}}>
                    {product.title}
                </h2>
                <div className="flex justify-between items-center center">
                    <span style={{fontSize: '10pt',  color: '#555555'}} className="">{product.category}</span>
                    <div className="flex gap-1">
                        <IoStar size={16} color="#edd09e"/>
                        <span style={{fontSize: '10pt',  color: '#555555'}}>{product.rating.rate}</span>
                    </div>
                </div>
                <span style={{fontSize: '20px', fontWeight: '600'}}>R$ {new Intl.NumberFormat('pt-BR').format(product.price)}</span>
                <Link href={`/product/${product.id}`} className="border-none rounded-lg bg-[#344A53] text-white font-medium pt-2 pb-2 pl-5 pr-5 justify-center w-full text-center hover:bg-[#5a6c79] transition-all 0.9">
                    Ver Mais
                </Link>
            </div>

        </div>
    )
}