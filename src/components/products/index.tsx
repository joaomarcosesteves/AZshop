"use client"
import Image from "next/image";
import axios from 'axios';
import { ProductProps } from "@/utils/types/product";
import { Container } from "@/components/container";
import ProductCard from "@/components/productCard";

import { FormEvent, useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"

interface ProductListProps{
    data: ProductProps[]
}

interface Filtro {
    title: string;
    categoria: string;
    precoMin: number;
    precoMax: number;
}

export default function Products({data}: ProductListProps) {
  const [products, setProducts] = useState(data)
  const [filtro, setFiltro] = useState<Filtro>({
    title: '',
    categoria: '',
    precoMin: 0,
    precoMax: Infinity
})

  function obterCategorias(data:any) {
    const categoriasUnicas:any = {};
    data.map((item: { category: string | number; }) => {
        categoriasUnicas[item.category] = true;
    });

    return Object.keys(categoriasUnicas);
  }

    const categoriasUnicas:any = obterCategorias(data);

    const aplicarFiltros = () => {
        return data.filter(produto => {
            const categoriaPassou = !filtro.categoria || produto.category === filtro.categoria;
            const precoMinPassou = !filtro.precoMin || produto.price >= filtro.precoMin;
            const precoMaxPassou = !filtro.precoMax || produto.price <= filtro.precoMax;
            const nomePassou = !filtro.title || produto.title.toLowerCase().includes(filtro.title.toLowerCase());
            return categoriaPassou && precoMinPassou && precoMaxPassou && nomePassou;
        });
    };

    useEffect(() => {
        setProducts(aplicarFiltros());
    }, [filtro]);
    

  return (
    <main className="flex ">
      <Container>
        <h1 className="text-center font-bold text-2xl mt-14 mb-5">Confira nossos produtos exclusivos</h1>
        <form className="w-full bg-slate-200 my-8 flex gap-4 items-center justify-center rounded-lg p-3 flex-wrap lg:justify-between">
            <div className="flex">
                <FiSearch size={24} color="#000"/>
                <input 
                    className="bg-slate-200 outline-none w-11-12 ml-2"
                    type="text" 
                    placeholder="O que esta procurando?...." 
                    value={filtro.title}
                    onChange={(e) => setFiltro({ ...filtro, title: e.target.value})}
                />
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                <div>
                    Preço Mínimo:
                    <input
                        className="bg-[#fafafa] rounded-lg px-2 w-20 ml-2"
                        type="number"
                        value={filtro.precoMin}
                        onChange={e => setFiltro({ ...filtro, precoMin: parseFloat(e.target.value) || 0 })}
                    />
                </div>
                <div>
                    Preço Máximo:
                    <input
                        className="bg-[#fafafa] rounded-lg px-2 w-20 ml-2"
                        type="number"
                        value={filtro.precoMax}
                        onChange={e => setFiltro({ ...filtro, precoMax: parseFloat(e.target.value) || Infinity })}
                    />
                </div>
                <div>
                    Categoria:
                    <select className="ml-2 rounded-lg" onChange={(e) => setFiltro({...filtro, categoria:e.target.value})}>
                        <option value=""></option>
                        {categoriasUnicas.map((categoria: string, index: string) => (
                            <option key={index} value={categoria}>{categoria}</option>
                            ))}
                    </select>
                </div>
            </div>
        </form>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </Container>
    </main>
  );
}
