import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ResetPasswordView() {
    // const { state } = useLocation();
    // const phoneNumber = state?.phoneNumber;

    // useEffect(() => {
    //     dispatch(
    //         fetchOtpAction({
    //         to: phoneNumber,
    //         message: "OTP for Login in SOS-Health Care is -",
    //         })
    //     );
    // }, []);
    return (
        <h1>In Reset Password Page {phoneNumber}</h1>
    );
}