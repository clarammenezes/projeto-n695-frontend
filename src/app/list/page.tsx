import {columns, User} from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<User[]> {

    const fetchUserList = await fetch("https://testefaculdade.pythonanywhere.com/api/users/");

    if (fetchUserList.status === 200) {
        const data: User[]= await fetchUserList.json();
        return data;
    }

    return [];
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
