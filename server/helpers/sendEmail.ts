export const registerEmailParams = (email: string, token: string) => {
  // Example code for SES:
  // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
  return {
    Source: `${process.env.EMAIL_FROM}`, /** SENDER_EMAIL_ADDRESS */
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: [`${process.env.EMAIL_TO}`],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
              <html>
                <h1>회원가입을 위한 이메일 인증메일입니다</h1>
                <p>다음 링크에서 회원가입을 완료하여 주십시오</p>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
              </html>
            `
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Complete your registration'
      }
    }
  }
}