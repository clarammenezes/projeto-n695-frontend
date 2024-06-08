"use client"

import {
    Book,
    Cloud,
    Github,
    LogOut,
    Settings,
    Sheet,
    SheetIcon,
    StickyNote,
    User,
    Users
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
function HeaderComponent() {

    const router = useRouter();

    function logout() {

        localStorage.removeItem('userAccessToken');
        localStorage.removeItem('userRefreshToken');
        router.push('/signin');

    }

    return (
        <header>
            <div className="grid justify-items-end p-3 mr-6 fixed w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={(e) => {router.push('/user-dashboard')}}>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Usuários</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {router.push('/books')}}>
                                <Book className="mr-2 h-4 w-4" />
                                <span>Livros</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <StickyNote className="mr-2 h-4 w-4" />
                            <a href="https://testefaculdade.pythonanywhere.com/politica-de-privacidade/" target="_blank">Política de privacide</a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {logout()}}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sair</span>
                        </DropdownMenuItem>                        
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default HeaderComponent