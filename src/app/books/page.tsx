"use client"

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {toast} from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DemoPage() {

    const [data, setData] = useState([]); 
    const [totalSpent, setTotalSpent] = useState(0);
    const router = useRouter();

    async function getData() {

        await axios.get('https://testefaculdade.pythonanywhere.com/api/books/')
        .then(function (response: any)  {        

            if (response.status !== 200) {
                toast.error("Houve um erro")
                return
            }

            let total = 0;

            setData(response.data);
            response.data.forEach((book: any) => {
                total += parseFloat(book.price)            
            })
            setTotalSpent(total)

        })
        .catch(function (error: any)  {
            console.log(error)
            toast.error("Houve um erro ao carregar os dados")
        })
    
    }

    useEffect(() => {

        let accessToken = localStorage.getItem("user-access-token");
        let refreshToken = localStorage.getItem("user-refresh-token");

        if (accessToken === null || refreshToken === null) {
            router.push('/signin');
        }

        getData()
            
    }, [])

    return (
            <div className="w-lvw h-lvh flex flex-col justify-center items-center">                
                <div className="flex flex-col xl:grid xl:grid-cols-4 xl:gap-4 2xl:grid 2xl:grid-cols-4 2xl:gap-4 space-y-4 p-50 justify-center items-center overflow-y-scroll h-[1000%]">
                        {
                            data.map((book: any) => {
                                return (
                                    <Dialog>                                        
                                        <Card className="w-[300px] h-[500px] flex flex-col justify-around items-center hover:bg-slate-100 hover:cursor-pointer" key={book.title}>
                                            <CardHeader>
                                                <CardTitle>{book.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex flex-col justify-center items-center">
                                                <img src={book.image} width="60%" height="40%"/>
                                            </CardContent>
                                            <CardFooter>
                                                <p>R$ {book.price}</p>
                                            </CardFooter>
                                            <DialogTrigger asChild>
                                            <Button variant="outline">Informações</Button>
                                        </DialogTrigger>
                                        </Card>            
                                        <DialogContent className="w-[1200px] h-[700px]">   
                                            <div className="flex flex-row w-full ">              
                                                <div className="flex flex-col">
                                                    <h3 className="text-4xl font-semibold">{book.title}</h3>                                            
                                                    <div className="w-full mt-10 flex">
                                                        <img src={book.image} width="30%" />
                                                        <div className="flex flex-col space-y-4">
                                                            <div className="ml-10 flex">
                                                                <h4 className="font-semibold text-2xl">Autor: </h4>
                                                                <p className="font-semibold text-2xl ml-2">{book.author}</p>
                                                            </div>
                                                            <div className="ml-10 flex">
                                                                <h4 className="font-semibold text-2xl">Categoria:</h4>
                                                                <p className="font-semibold text-2xl ml-2">{book.category}</p>
                                                            </div>
                                                            <div className="ml-10 flex">
                                                                <h4 className="font-semibold text-2xl">Sumário:</h4>
                                                                <p className="ml-2 text-xl">{book.summary}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                  
                                                <div>
                                                    
                                                </div>
                                            </div>
                                        </DialogContent>                                              
                                    </Dialog>                                    
                                )
                            })
                        }
                </div>            
            </div>
    )
}
