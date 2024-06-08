"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { apiInstance } from "@/utils/api-instance"

export type User = {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "first_name",
        header: "First Name",
    },
    {
        accessorKey: "last_name",
        header: "Last Name",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },    
    {
        id: "actions",
        cell: function Cell ({ row }) {

            const user = row.original
            const accessToken = localStorage.getItem("user-access-token"); 
            
            const [userInfo, setUserInfo] = useState({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username
            })

            function updateUser(id: string) {
                
                apiInstance.put(`/users/${id}/`, userInfo, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }                 
                }).then(function (response: any) {
                    
                    if (response.status !== 200) {
                        toast.error("Houve um erro ao editar o usuário");
                    }

                    toast.success("Usuário editado com sucesso");
                    window.location.reload();

                }).catch(function (error: any){
                    toast.error(error);
                })                

            }

            function deleteUser(id: string) {                

                apiInstance.delete(`/users/${id}/`, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then(function (response: any) {
                    console.log(response)

                    if (response.status !== 204) {
                        toast.error("Houve um erro ao tentar deletar o usuário")
                    }

                    toast.success("Usuário deletado com sucesso!");
                    window.location.reload();

                }).catch(function (error: any) {
                    toast.error(error);
                })
            }

            return (                
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}>
                                        Editar usuário
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="w-[512px]">
                                <DialogHeader>
                                    <DialogTitle>Editar perfil</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="first_name" className="text-right">
                                            Nome
                                        </Label>
                                        <Input
                                            id="first_name"
                                            defaultValue={user.first_name}
                                            className="col-span-3"
                                            value={userInfo.first_name}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    first_name: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="last_name" className="text-right">
                                            Sobrenome
                                        </Label>
                                        <Input
                                            id="last_name"
                                            defaultValue={user.last_name}
                                            className="col-span-3"
                                            value={userInfo.last_name}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    last_name: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            defaultValue={user.email}
                                            className="col-span-3"
                                            value={userInfo.email}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    email: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Usuário
                                        </Label>
                                        <Input
                                            id="username"
                                            defaultValue={user.username}
                                            className="col-span-3"
                                            value={userInfo.username}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    username: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose>Fechar</DialogClose>
                                    <Button type="submit" onClick={(e) => {updateUser(user.id)}}>Save changes</Button>
                                </DialogFooter>                            
                            </DialogContent>
                        </Dialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}>
                                        Deletar usuário
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tem certeza que deseja deletar o usuário: {user.username}? Esta ação não poderá ser desfeita.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={(e) => deleteUser(user.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>                    
                </DropdownMenu>
                
            )
        },
    },
]