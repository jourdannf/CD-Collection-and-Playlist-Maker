export default function AuthLayout ({children}) {
    return (
        <div className="h-screen content-center">
            <div className="w-2/4 min-h-3/6 mx-auto p-7 bg-push-play-blue-900/18 rounded-xl content-center">
                {children}
            </div>
            
        </div>
    )
}