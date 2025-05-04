import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../../config/api";

const LoginPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            navigate("/memes");
        }
    }, [navigate]);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [showAdminChoice, setShowAdminChoice] = useState(false);

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSendingOtp(true);
        try {
            const response = await axios.post(`${SERVER_URL}/auth/check-user`, { email });

            if (response.data.exists) {
                setMessage("User found! Logging in...");
            } else {
                setMessage("User not found! Signing you up...");
            }

            await axios.post(`${SERVER_URL}/auth/send-otp`, { email });
            alert("OTP sent! Kindly check your spam.");
            setStep(2);
        } catch (error) {
            console.error(error);
            alert("Failed to send OTP. Try again.");
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifyingOtp(true);
        try {
            const response = await axios.post(`${SERVER_URL}/auth/verify-otp`, { email, otp });
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", response.data.role);

            if (response.data.role === "admin") {
                setShowAdminChoice(true);
            } else {
                navigate("/memes");
            }
        } catch (error) {
            console.error(error);
            alert("Invalid OTP. Try again.");
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {showAdminChoice ? (
                <div className="border p-5 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold mb-4">Choose a Panel</h2>
                    <button
                        onClick={() => navigate("/admin")}
                        className="bg-blue-600 text-white px-4 py-2 m-2 rounded"
                    >
                        Admin Panel
                    </button>
                    <button
                        onClick={() => navigate("/memes")}
                        className="bg-green-500 text-white px-4 py-2 m-2 rounded"
                    >
                        User Panel
                    </button>
                </div>
            ) : (
                <div className="border p-5 rounded-lg shadow-lg text-center">
                    {step === 1 ? (
                        <>
                            <h2 className="text-xl font-bold mb-4">Enter Your Email</h2>
                            {message && <p className="text-red-400 mb-2">{message}</p>}
                            <form onSubmit={handleSendOTP}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="border p-2 w-full mb-3"
                                    required
                                    disabled={isSendingOtp}
                                />
                                <button
                                    type="submit"
                                    className={`p-2 rounded w-full ${
                                        isSendingOtp
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-blue-500 text-white"
                                    }`}
                                    disabled={isSendingOtp}
                                >
                                    {isSendingOtp ? "Sending OTP..." : "Send OTP"}
                                </button>
                            </form>
                            <p className="text-sm text-red-400 mt-2">
                                Note: Please check your spam folder if you don't receive the OTP in your inbox.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
                            <form onSubmit={handleVerifyOTP}>
                                <input
                                    type="text"
                                    value={email}
                                    className="border p-2 w-full mb-3 bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    className="border p-2 w-full mb-3"
                                    required
                                />
                                <button
                                    type="submit"
                                    className={`p-2 rounded w-full ${
                                        isVerifyingOtp
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-green-500 text-white"
                                    }`}
                                    disabled={isVerifyingOtp}
                                >
                                    {isVerifyingOtp ? "Authorizing..." : "Verify OTP"}
                                </button>
                            </form>
                            <p className="text-sm text-red-400 mt-2">
                                Note: Please check your spam folder.
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginPage;