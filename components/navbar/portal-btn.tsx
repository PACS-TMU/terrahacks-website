export default function PortalBtn() {
    return (
        <div id="portal-btn" className="flex flex-row items-center text-lg xl:text-xl 2xl:text-2xl">
            <button
                aria-label="Button to Application Portal"
                className="bg-green-600 text-white font-semibold px-6 py-4 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300"
                onClick={() => {
                    window.open("https://portal.terrahacks.ca", "_blank", 'noopener noreferrer');
                }}
            >
                Application Portal
            </button>
        </div>
    )
}