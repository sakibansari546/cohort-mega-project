const verificationEmailTemplate = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with our App, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email!",
          link: verificationURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordEmailTemplate = (username, verificationURL) => {
  return {
    body: {
      name: username,
      intro: "Forgot your password? No problem, we've got you covered.",
      action: {
        instructions: "To reset your password, please click the button below:",
        button: {
          color: "#FF5733", // Optional action button color
          text: "Reset your password",
          link: verificationURL,
        },
      },
      outro:
        "If you did not request a password reset, please ignore this email or contact support if you have questions.",
    },
  };
};

export { verificationEmailTemplate, forgotPasswordEmailTemplate };
