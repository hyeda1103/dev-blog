import { useState } from 'react';
import { Container, EmailInput, SubmitButton, Message } from '@/styles/newsletterform';
import Spinner from './Spinner';

export default function NewsletterForm( { status, message, onValidated }: any) {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError('');

    if (!email) {
      setError('유효한 이메일 주소를 입력하세요');
      return;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    return email && email.indexOf("@") > -1 && isFormValidated;
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event: any) => {
    setError('');
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  }

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message: string) => {
    if (!message) {
     return '';
    }
    const result = message?.split('-') ?? null;
    if ("0" !== result?.[0]?.trim()) {
     return '이미 구독 중인 이메일 주소입니다';
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? '입력값이 유효하지 않습니다' : '';
  }

  return (
      <Container>
        <EmailInput
          onChange={(event) => setEmail(event?.target?.value ?? '')}
          type="email"
          placeholder="당신의 이메일 주소"
          onKeyUp={(event) => handleInputKeyEvent(event)}
        />
        <SubmitButton onClick={handleFormSubmit}>
          {
            status === "sending"
              ? <Spinner />
              : '구독신청'
          }
        </SubmitButton>
        
        {status === "error" || error ? (
          <Message status={status}>{getMessage(message)}</Message>
        ) : null }
        {status === "success" && status !== "error" && !error && (
          <Message status={status}>성공적으로 구독신청되었습니다</Message>
        )}
      </Container>
  );
}
