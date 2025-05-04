const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 py-8 mt-10">
            {/* Rotaract Club Section */}
            <div className="text-center px-6">
                <h2 className="text-2xl font-bold mb-2">
                    Proudly Supported by the Rotaract Club of SIET
                </h2>
                <p className="text-lg text-gray-600">
                    Connecting communities, fostering innovation, and building a better tomorrow.
                </p>
                <p className="text-md text-gray-600 mt-2">
                    For any campus-based events or support, feel free to reach out to us!
                </p>

                {/* Social Links */}
                <div className="flex justify-center items-center gap-6 mt-6">
                    <a
                        href="https://instagram.com/rotaractsiet"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Rotaract SIET Instagram"
                        className="hover:scale-110 transition-transform duration-200"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/800px-Instagram_icon.png"
                            alt="Instagram Icon"
                            className="w-10 h-10"
                        />
                    </a>
                    <a
                        href="mailto:rotaractsiet2425@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Email Rotaract SIET"
                        className="hover:scale-110 transition-transform duration-200"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
                            alt="Gmail Icon"
                            className="w-10 h-10"
                        />
                    </a>
                </div>
            </div>

            {/* Creator Section */}
            <div className="mt-8 text-center">
                <p className="text-md text-gray-600">
                    Created with ❤️ by{' '}
                    <a
                        className="text-blue-600 hover:text-blue-400 underline"
                        href="https://www.rprakashdass.in"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Prakash Dass R
                    </a>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    All Avenue Chair, Rotaract SIET (2024 - 2025)
                </p>
                <p className="text-sm text-gray-600 mt-2">
                    Visit{' '}
                    <a
                        className="text-blue-600 hover:text-blue-400 underline"
                        href="https://www.rprakashdass.in"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        rprakashdass.in
                    </a>{' '}
                    for more projects.
                </p>
            </div>

            {/* Footer Bottom */}
            <div className="bg-gray-200 mt-8 py-4">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
                    <p className="text-sm text-gray-600">
                        For more updates, follow Rotaract SIET:
                    </p>
                    <a
                        href="https://instagram.com/rotaractsiet"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram page of Rotaract SIET"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-400 transition-all"
                    >
                        Instagram
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/800px-Instagram_icon.png"
                            alt="Instagram Icon"
                            className="w-5 h-5"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;