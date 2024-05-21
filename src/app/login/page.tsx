"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {useState} from "react";
import {toast} from "sonner";
import axios from "axios";

export default function Page() {

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
    })

    async function handleLogin() {

        if (!userData.first_name || !userData.last_name || !userData.email || !userData.username || !userData.password) {
            toast.error("Preencha todos os campos")
            return
        }

        axios.post('https://testefaculdade.pythonanywhere.com/api/users/', userData)
            .then(function (response: any)  {

                if (response.status === 201) {
                    toast.success("Usuário cadastrado com sucesso")
                }

            })
            .catch(function (error: any)  {
                console.log(error)
                toast.error("Erro ao cadastrar usuário")
            })

    }

    return (
        <div className="flex justify-center items-center h-lvh w-lvw bg-slate-900">
            <Tabs defaultValue="entrar">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="entrar">Entrar</TabsTrigger>
                    <TabsTrigger value="registrar">Registrar</TabsTrigger>
                </TabsList>
                <TabsContent value="entrar">
                    <Card>
                        <CardHeader>
                            <CardTitle>Entrar</CardTitle>
                            <CardDescription>
                                Entre em sua conta.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Entrar</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="registrar">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registrar</CardTitle>
                            <CardDescription>
                                Registrar uma conta nova
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="first_name">Nome</Label>
                                <Input id="first_name" value={userData.first_name} onChange={e => setUserData({
                                    ...userData,
                                    first_name: e.target.value
                                })}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="last_name">Sobrenome</Label>
                                <Input id="last_name" value={userData.last_name} onChange={e => setUserData({
                                    ...userData,
                                    last_name: e.target.value
                                })}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" value={userData.email} onChange={e => setUserData({
                                    ...userData,
                                    email: e.target.value
                                })}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value={userData.username} onChange={e => setUserData({
                                    ...userData,
                                    username: e.target.value
                                })}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password" type="password" value={userData.password} onChange={e => setUserData({
                                    ...userData,
                                    password: e.target.value
                                })}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleLogin} >Registrar</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
