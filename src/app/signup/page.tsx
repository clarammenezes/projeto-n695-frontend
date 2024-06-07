"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";

const formSchema = z.object({
    first_name: z.string().min(3, {
        message: "Primeiro nome deve conter pelo menos 5 caracteres"
    }),
    last_name: z.string().min(3, {
        message: "Primeiro nome deve conter pelo menos 5 caracteres"
    }),
    email: z.string().min(5, {
        message: "Email deve conter no mínimo 5 caracters"
    }),
    username: z.string().min(5, {
        message: "Usuário deve conter no mínimo 5 caracters"
    }),
    password: z.string().min(6, {
        message: "Senha deve conter no mínimo 6 caracteres"
    })
})

interface UserForm {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
}


export default function SignUpPage() {

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        handleSignUp(values);
    }

    function handleSignUp(userForm: UserForm) {

        console.log(userForm);

        axios.post('https://testefaculdade.pythonanywhere.com/api/users/', userForm)
            .then(function (response: any) {

                console.log(response);

                if (response.status !== 201) {
                    toast.error("Há algo de errado nas suas informações, por favor chegue novamente");
                }  

                axios.post('https://testefaculdade.pythonanywhere.com/api/users/', {
                    username: userForm.username,
                    password: userForm.password
                }).then(function (response: any) {

                    console.log(response)

                }).catch(function (error: any) {
                    console.log(error)
                })

                router.push('/signin')                

            })
            .catch(function (error: any) {
                toast.error("Houve uma falha ao tentar cadastrar")
                console.log(error)
            })
    }

    return (

        <div className="h-lvh w-lvw bg-[url('/sign-up.jpg')] bg-no-repeat bg-cover">
            <div className="h-full w-full bg-gradient-to-b from-slate-950/0 to-slate-950/75 flex justify-center items-center" >
                <div className="h-full w-3/6 justify-end items-end flex">
                    <h1 className="text-4xl text-white mb-20 ml-5 mr-20">Seja bem vindo, sua leitura começa aqui!</h1>
                </div>
                <div className="h-full w-3/6 hidden 2xl:flex justify-center items-center">
                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75 }}
                    className="2xl:w-[600px] 2xl:h-[95%] sm:h-[80%] sm:w-[50%] flex flex-col justify-center items-center shadow-2xl rounded-lg bg-white"
                    
                > 
                    <h3 className="font-semibold text-4xl mb-10" >Entrar em sua conta</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField 
                                control={form.control}
                                name = "first_name"
                                render = {({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu nome" {...field} className="rounded-lg sm:w-[200px] 2xl:w-[500px]"/>                                        
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name = "last_name"
                                render = {({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu sobrenome" {...field} className="rounded-lg sm:w-[200px] 2xl:w-[500px]"/>                                        
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name = "email"
                                render = {({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Digite seu email" {...field} className="rounded-lg sm:w-[200px] 2xl:w-[500px]"/>                                        
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                    <span className="mt-10">Já possui uma conta? <Link href={"/signin"} className="font-bold hover:underline ">Entre aqui!</Link></span>
                </motion.div>
                </div>
            </div>
        </div>

    )

}