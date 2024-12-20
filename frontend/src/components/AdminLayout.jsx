export default function AdminLayout({children}){
    return (
        <>
            <div className="flex">
            <aside className="w-72 h-screen p-4 bg-gray-900 flex flex-col justify-between">
                <h1 className="font-bold text-2xl">Shark Tank</h1>
                <a href="/logout" className="border-t border-gray-100 py-2">Logout</a>
            </aside>
            <div className="p-5">
                {children}
            </div>
            </div>
        </>
    )
}