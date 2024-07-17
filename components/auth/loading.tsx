import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full gap-y-4 flex flex-col items-center justify-center">
            <Image src="/logo.svg" alt="loading" width={80} height={80} className="animate-pulse duration-700"/>
        </div>
    );
};