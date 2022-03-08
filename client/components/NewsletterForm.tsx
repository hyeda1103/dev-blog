import { useState } from 'react';
import { decode } from 'html-entities';

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

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event: any) => {
    setError('');
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
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
    if ( "0" !== result?.[0]?.trim() ) {
     return `${decode(message)}`;
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : '';
  }

  return (
    <>
      <div>
        <div>
          <input
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            placeholder="당신의 이메일"
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
        </div>
        <div>
          <button onClick={handleFormSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div>
        {status === "sending" && <div>구독신청 중 ...</div>}
        {status === "error" || error ? (
          <div
            dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
          />
        ) : null }
        {status === "success" && status !== "error" && !error && (
          <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
        )}
      </div>
    </>
  );
}
