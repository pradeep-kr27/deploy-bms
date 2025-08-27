import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { ResetPassword } from "../../api/users";
import { message } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function Reset() {
  const { email: urlEmail } = useParams(); // Extract email from URL parameters (old approach)
  const location = useLocation(); // Get state from navigation (new approach)
  const navigate = useNavigate();
  const [isValidSession, setIsValidSession] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const handleLoginRedirect = () => {
    // Clear reset password session when user goes to login
    sessionStorage.removeItem('resetPasswordSession');
    sessionStorage.removeItem('resetPasswordEmail');
    sessionStorage.removeItem('resetPasswordTimestamp');
    navigate('/login');
  };

  const onFinish = async (values) => {
    try {
      const response = await ResetPassword(values, userEmail);
      if (response.success) {
        message.success(response.message);
        // Clear the session flag and redirect
        sessionStorage.removeItem('resetPasswordSession');
        sessionStorage.removeItem('resetPasswordEmail');
        sessionStorage.removeItem('resetPasswordTimestamp');
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    if (localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    // Try to get email from different sources
    let emailToUse = '';
    
    // Method 1: From navigation state (new secure approach)
    if (location.state?.email && location.state?.fromForgetPassword) {
      emailToUse = location.state.email;
    }
    // Method 2: From URL parameter (old approach, but validate session)
    else if (urlEmail) {
      emailToUse = decodeURIComponent(urlEmail);
    }
    // Method 3: From session storage
    else {
      emailToUse = sessionStorage.getItem('resetPasswordEmail');
    }

    // Check if user came from forget password page
    const resetSession = sessionStorage.getItem('resetPasswordSession');
    const sessionEmail = sessionStorage.getItem('resetPasswordEmail');
    const timestamp = sessionStorage.getItem('resetPasswordTimestamp');
    
    if (!resetSession || !sessionEmail) {
      message.error("Invalid access. Please use the forgot password flow.");
      navigate("/forget");
      return;
    }

    // Check if session is not too old (30 minutes)
    if (timestamp && (Date.now() - parseInt(timestamp)) > 30 * 60 * 1000) {
      message.error("Session expired. Please request a new OTP.");
      sessionStorage.clear();
      navigate("/forget");
      return;
    }

    // Verify the email matches the session
    if (!emailToUse || sessionEmail !== emailToUse) {
      message.error("Invalid email parameter.");
      navigate("/forget");
      return;
    }

    setUserEmail(emailToUse);
    setIsValidSession(true);
    console.log("Using email:", emailToUse);
  }, [urlEmail, location, navigate]);

  // Only render the form if session is valid
  if (!isValidSession) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Validating access...
      </div>
    );
  }

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Reset Password</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="OTP"
                htmlFor="otp"
                name="otp"
                className="d-block"
                rules={[{ required: true, message: "OTP is required" }]}
              >
                <Input
                  id="otp"
                  type="number"
                  placeholder="Enter your otp"
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                ></Input>
              </Form.Item>
              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  RESET PASSWORD
                </Button>
              </Form.Item>
            </Form>
            <div style={{ marginTop: "1rem" }}>
              <p>
                Remember your password?{" "}
                <span 
                  onClick={handleLoginRedirect}
                  style={{ 
                    color: "#1890ff", 
                    cursor: "pointer", 
                    textDecoration: "underline" 
                  }}
                >
                  Login here
                </span>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Reset;
