let otp;
function generateOTP(len) {
    try {
        const fullOtp = Math.floor(100000 + Math.random() * 900000);
        otp = fullOtp.toString().slice(0, len); // Store the sliced version
        return otp;
    } catch (error) {
        console.error("Error generating OTP:", error);
        throw new Error("OTP generation failed");
    }
}

function otpVerify(userOtp){
    try {
        if (userOtp === otp) { // Now both are strings
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw new Error("OTP verification failed");
    }
}

module.exports = {
    generateOTP,
    otpVerify
};