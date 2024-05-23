'use client'

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
<div className="h-lvh w-lvw bg-[url('/home.jpg')] bg-no-repeat bg-cover">
            <div className="h-full w-full bg-gradient-to-b from-slate-950/0 to-slate-950/75 flex justify-center items-center" >
                <div className="h-full w-3/6 flex flex-col justify-center items-center">                
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75 }}
                        className="font-semibold text-4xl xl:text-9xl text-gray-50 drop-shadow"
                    >
                        Bem-vindo a sua plataforma colaborativa de livros
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="font-semibold text-base xl:text-2xl text-gray-50 drop-shadow"
                    >
                        Com a BookLabs, compartilhar sua biblioteca de livros com amigos ficou mais fácil.
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.25 }}
                        className="flex flex-col justify-center items-center"
                    >
                        <Link 
                            href="/signin" 
                            className="bg-teal-400 sm:text-1xl rounded-lg border border-solid border-l-teal-400 w-[200px] p-2 mt-2 text-center align-middle"
                        
                        >Conheça já!</Link>
                        <Link href="/signup" className="text-gray-50 text-[12px] xl:text-xl hover:cursor-pointer hover:underline mt-2">Já tem uma conta, entre aqui!</Link>
                    </motion.div>
                </div>
            </div>
        </div>
  );
}
