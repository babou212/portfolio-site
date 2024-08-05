import * as React from "react";

interface EmailTemplateProps {
  email: string ;
  content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  content,
}) => (
  <div>
    <h1>Contact form submission</h1>
      <p>
        From <strong>{email}</strong>
      </p>
    <h2>Message:</h2>
     <p>{content}</p>
</div>
);

export default EmailTemplate;
