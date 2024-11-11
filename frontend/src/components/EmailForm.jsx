// src/components/EmailForm.jsx
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

function EmailForm({ onNext }) {
  const [email, setEmail] = useState("");

  return (
    <Box>
      <Text mb={4}>Please enter your email to start the assessment:</Text>
      <Input type="email" placeholder="Your email" color="white" value={email} onChange={(e) => setEmail(e.target.value)} mb={4} />
    </Box>
  );
}

export default EmailForm;
