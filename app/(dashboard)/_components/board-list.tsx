"use client"

import Image from "next/image";
import { EmptySearch } from "./empty-list";
import { EmptyFavourites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    }
    }


export const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = [];

    if(!data?.length && query.search) {
        return <EmptySearch />
    }
    if(!data?.length && query.favorites) {
        return <EmptyFavourites />
    }
    if(!data?.length) {
        return <EmptyBoards/>
    }
    return (
        <div>
            BoardList
        </div>
    );
}