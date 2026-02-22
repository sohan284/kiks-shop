import React from "react";

export const ProductDetailsSkeleton = () => {
    return (
        <main className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 animate-pulse">
                {/* Gallery Skeleton */}
                <div className="lg:col-span-8">
                    {/* Desktop Grid Skeleton */}
                    <div className="hidden lg:grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`aspect-square bg-zinc-300 ${i === 0 ? "rounded-tl-[4rem]" :
                                    i === 1 ? "rounded-tr-[4rem]" :
                                        i === 2 ? "rounded-bl-[4rem]" :
                                            i === 3 ? "rounded-br-[4rem]" : ""
                                }`} />
                        ))}
                    </div>

                    {/* Mobile Gallery Skeleton */}
                    <div className="block lg:hidden">
                        <div className="relative mb-4 aspect-square rounded-[1.5rem] h-[273px] w-full bg-zinc-300" />
                        <div className="grid grid-cols-5 gap-3 px-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="aspect-square rounded-lg bg-zinc-300" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info Skeleton */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="h-6 w-24 bg-zinc-300 rounded-md" />
                        <div className="h-10 w-3/4 bg-zinc-300 rounded-md" />
                        <div className="h-8 w-32 bg-zinc-300 rounded-md" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="h-4 w-16 bg-zinc-300 rounded" />
                        <div className="flex gap-3">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="h-8 w-8 rounded-full bg-zinc-300" />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="h-4 w-12 bg-zinc-300 rounded" />
                        <div className="grid grid-cols-5 gap-2">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-12 rounded-lg bg-zinc-300" />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <div className="flex gap-2">
                            <div className="h-14 flex-1 rounded-xl bg-zinc-300" />
                            <div className="h-14 w-14 rounded-xl bg-zinc-300" />
                        </div>
                        <div className="h-14 w-full rounded-xl bg-zinc-300" />
                    </div>
                </div>
            </div>
        </main>
    );
};
