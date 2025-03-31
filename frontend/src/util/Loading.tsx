const Loading = () => {
    const loadingMessages = [
        "🕵️‍♂️ Scouring the internet for the dankest memes... Hold tight! 🚀",
        "🤔 Downloading memes from the cloud... of questionable humor.",
        "😂 Preparing a meme buffet... Get your voting forks ready!",
        "🛠️ Generating memes with AI... just kidding, these are handcrafted!",
        "🚀 Loading faster than your WiFi on a bad day...",
        "📡 Beaming memes straight from Area 51... please wait!",
        "🧠 Training a monkey to type ‘Loading memes...’ Hold on!",
        "⏳ Taking longer than expected? Great memes take time!",
        "📦 Your memes are currently being shipped via pigeon express.",
        "🚜 Farming some fresh memes... Harvesting soon!",
        "💾 Downloading 100TB of memes... Just kidding, almost there!",
        "👀 Peeking into your meme history for better recommendations... or not.",
        "🔥 Roasting your patience while we fetch the best memes!",
        "💨 Loading... still faster than Internet Explorer.",
        "🕰️ If this takes too long, consider making your own memes!"
    ];

    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

    return (
        <p className="text-center bg-center font-mono font-bold h-screen flex flex-col justify-center items-center">
            <p className="text-3xl">Loading!....</p>
            <p className="text-xl">{randomMessage}</p>
        </p>
    );
}

export default Loading