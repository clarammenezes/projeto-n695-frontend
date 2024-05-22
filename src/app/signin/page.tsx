"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useState} from "react";
import {toast} from "sonner";
import axios from "axios";
import { motion } from 'framer-motion'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form"
import Link from "next/link"
import { EyeIcon, EyeOff } from "lucide-react"
import { useCookies } from "react-cookie"
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(3, {
        message: "Usuário precisa conter no mínimo 3 caracteres."
    }).max(50, {
        message: "Usuário precisa conter no máximo 50 caracteres."
    }),
    password: z.string().min(5, {
        message: "Senha precisa conter no mínimo 5 caracteres."
    }).max(20, {
        message: "Senha precisa conter no máximo 20 caracteres."
    })
});

interface User {
    username: string,
    password: string
} 

export default function SignInPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        handleLogin(values)
    }

    async function handleLogin(userData: User) {

        axios.post('https://testefaculdade.pythonanywhere.com/api/auth/login/', userData)
            .then(function (response: any)  {

                if (response.status !== 200) {
                    toast.error("Senha incorreta")
                    return
                }
                
                setCookie("user-access-token", response.data.access, {
                    httpOnly: true,
                    path: '/'
                })
                setCookie("user-refresh-token", response.data.refresh, {
                    httpOnly: true,
                    path: '/'
                })
                toast.success("Usuário autenticado com sucesso, redirecionando")
                router.push('/books')

            })
            .catch(function (error: any)  {
                toast.error("Houve um erro ao tentar autenticar")
            })

    }

    return (
        <div className="h-lvh w-lvw bg-[url('/sign-in.jpg')] bg-no-repeat bg-cover">
            <div className="h-full w-full bg-gradient-to-b from-slate-950/0 to-slate-950/75 flex justify-center items-center" >
                <div className="h-full w-3/6 flex justify-center items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75 }}
                    className="2xl:w-[600px] 2xl:h-[95%] sm:h-[80%] sm:w-[50%] flex flex-col justify-center items-center shadow-2xl rounded-lg bg-white"
                    
                > 
                    <h3 className="font-semibold text-4xl mb-10" >Entrar em sua conta</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name = "username"
                                render = {({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Usuário</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insira seu usuário" {...field} className="rounded-lg sm:w-[200px] 2xl:w-[500px]"/>                                        
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name = "password"
                                render = {({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <div className="relative sm:w-[200px] 2xl:w-[500px]">
                                                <Input className="rounded-lg pr-9" type={!showPassword ? "password" : "text"} placeholder="Insira sua senha" {...field} />
                                                {!showPassword && <EyeIcon className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground hover:cursor-pointer" onClick={(e) => setShowPassword(true)}/>}
                                                {showPassword && <EyeOff className="absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground hover:cursor-pointer" onClick={(e) => setShowPassword(false)}/>}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="rounded-lg w-[500px]">Entrar</Button>
                        </form>
                    </Form>
                    <span className="mt-10">Não possui uma conta ainda? <Link href={"/signup"} className="font-bold hover:underline ">Crie aqui!</Link></span>
                </motion.div>
                </div>
                <div className="h-full w-3/6 justify-end items-end hidden 2xl:flex">
                    <h1 className="text-4xl text-white mb-20 ml-5 mr-20">Seja bem-vindo de volta!</h1>
                </div>
            </div>
        </div>
    )
}
