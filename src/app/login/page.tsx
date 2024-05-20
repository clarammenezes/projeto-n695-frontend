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

        const fetchUsersApi = await fetch("https://testefaculdade.pythonanywhere.com/api/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
            },
            body: JSON.stringify(userData)
        })

        if (fetchUsersApi.status === 201) {
            toast.success("Usuário cadastrado com sucesso")
        } else {
            toast.error("Erro ao cadastrar usuário")
        }

    }

    return (
        // <div className="w-lvw h-lvh justify-center items-center">
            <Tabs defaultValue="entrar" className="w-lvw h-lvh justify-center items-center">
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
        // </div>
    )
}
