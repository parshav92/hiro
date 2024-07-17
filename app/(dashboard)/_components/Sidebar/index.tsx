import { List } from "./list"
import { NewButton } from "./new-button"

export const SideBar = () => {
    return (
        <aside className="fixed h-full z-[1] bg-blue-950 w-[60px] flex p-3 flex-col text-white gap-y-4 ">
            <List />
            <NewButton />
        </aside>
    )
}