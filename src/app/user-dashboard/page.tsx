"use client"

import {columns} from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "sonner";
import { useRouter } from "next/navigation";



export default function DemoPage() {
    
    const [data, setData] = useState([]);
    const router = useRouter();

    async function getData() {

        let accessToken = localStorage.getItem('user-access-token');

        await axios.get('https://testefaculdade.pythonanywhere.com/api/users/', {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application'            
            }
        })
        .then(function (response: any)  {
            
            if (response.status !== 200) {
                toast.error("Houve um erro")
                return
            }

            setData(response.data);

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

        getData();
            
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
