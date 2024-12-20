export default function CustomerLayout ({children}) {

    return (
        <>
            <div>
                <nav className="w-full bg-gray-900 ">
                    
                    <div className="flex justify-between p-4 max-w-7xl mx-auto">
                    <h1 className="font-bold">Shark Tank</h1>
                    <a href={'/logout'}>Logout</a>
                    </div>
                </nav>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}