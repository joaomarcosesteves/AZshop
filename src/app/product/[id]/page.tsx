import { ProductProps } from "@/utils/types/product"
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";
import { redirect } from "next/navigation"
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";


async function getProduct(id: string) {
    try {
      const api = await fetch(`${process.env.PUBLIC_API_URL}/products/${id}`)
      .then((res) => res.json())
      return api
    } catch (error) {
      console.log(error)
    }
  }

export default async function Product({params: {id}}:{params: {id: string}}){
    const product: ProductProps = await getProduct(id)

    if(!product) return redirect('/')


    return(
        <section className="pt-12 md:pt-20 bg-slate-100 sm:h-screen">
            <Container>
                <Link href={'/'} className="flex flex-row items-center sm:ml-4"> <MdOutlineArrowBackIosNew size={24} color="#000"/> <IoHome size={24} color="#000" /> </Link>
                <div className="flex flex-col mt-14 flex-wrap md:flex-row">
                    <div className="relative h-96 flex md:flex-1">
                        <Image 
                        className="rounded-lg object-contain mix-blend-multiply p-6"
                        src={product.image}
                        alt={product.title}
                        fill={true}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 mb-12 py-8 px-8 md:px-20 sm:mb-4">
                        <h1 className="font-bold text-2xl">{product.title}</h1>
                        <div className="flex justify-between items-center center bg-white py-2 px-3 rounded-xl">
                            <span style={{fontSize: '10pt',  color: '#555555'}} className="">{product.category}</span>
                            <div className="flex gap-1 mr-4">
                                <IoStar size={16} color="#edd09e"/>
                                <span style={{fontSize: '10pt',  color: '#555555'}}>{product.rating.rate}</span>
                            </div>
                        </div>  
                        <h4 className="font-light">{product.description}</h4>
                        <span className="font-extrabold text-2xl">R$ {new Intl.NumberFormat('pt-BR').format(product.price)}</span>
                        <Link href={`/product/${product.id}`} 
                        className="fixed bottom-0 left-0 w-full bg-[#344A53] text-white font-medium flex gap-2 items-center pt-3 pb-3 pl-6 pr-6 justify-center text-center sm:relative sm:rounded-lg hover:bg-[#5a6c79] hover:font-light transition-all 0.9">
                            Adicionar ao Carrinho <AiOutlineShoppingCart size={20} color="white" />
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}