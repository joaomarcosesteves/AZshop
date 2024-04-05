
import Image from "next/image";
import axios from 'axios';
import {ProductProps} from '../utils/types/product'
import { Container } from "@/components/container";
import ProductCard from "@/components/productCard";

import { FormEvent, useState } from "react"
import { FiSearch } from "react-icons/fi"

import Products from "@/components/products";

async function getProducts() {
  try {
    const api = await fetch(`${process.env.PUBLIC_API_URL}/products`)
    .then((res) => res.json())
    return api
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const products: ProductProps[] = await getProducts();

  return (
    <Products data={products}/>
  );
}
