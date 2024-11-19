export default function CardLanding({icon,name,description,features,color}){
    return <>
        <div
            className={`bg-white rounded-xl p-6 shadow-lg border-2 border-transparent transition-all duration-300 ${color} hover:shadow-xl`}
        >
            <div className="flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-center mb-3 text-gray-800">
                {name}
            </h3>
            <p className="text-gray-600 text-center mb-4">
                {description}
            </p>
            <ul className="space-y-2 justify-center items-center">
                {features.map((feature, idx) => (
                <li
                    key={idx}
                    className="flex items-center text-gray-700"
                >
                    <svg 
                    className="w-4 h-4 mr-2 text-green-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                    />
                    </svg>
                    {feature}
                </li>
                ))}
            </ul>
        </div>
    </>
}