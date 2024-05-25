"use client"

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {toast} from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

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
            response.data.forEach(book => {
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
            <p className="font-semibold text-2xl mt-5">Total gasto: R$ {totalSpent.toFixed(2)}</p>
            <div className="grid grid-cols-4 gap-4 p-10 content-center justify-center items-center overflow-auto">
                {
                    data.map((book) => {
                        return (
                            <Card className="w-[300px] h-[400px] self-center flex flex-col justify-center items-center" key={book.title}>
                            <CardHeader>
                                <CardTitle>{book.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-center items-center">
                                <img src={book.image} width="60%"/>
                            </CardContent>
                            <CardFooter>
                                <p>R$ {book.price}</p>
                            </CardFooter>
                        </Card>                  
                        )
                    })
                }
            </div>            
        </div>
    )
}
