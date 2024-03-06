import OTPEntry from './otpScreen';
import PasswordReset from './resetScreen'
import { useSelector } from "react-redux";
import './otpScreen.css';

 function ResetPasswordView() {
  const { isValidOtp } = useSelector(state => state.resetPassword)

    const handleSubmit = (e,otp) => {
        e.preventDefault();
        // Handle OTP verification logic here
        console.log('Entered OTP:', otp);
        // Redirect or show a success message based on verification
      };

    return (
        <div className="reset-wrapper">
        {!isValidOtp ? <OTPEntry handleSubmit={handleSubmit}/> : <PasswordReset />}
        </div>
    );
}

export default ResetPasswordView