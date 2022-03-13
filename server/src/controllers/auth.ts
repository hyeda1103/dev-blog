import { Request, Response } from 'express'
import AWS from 'aws-sdk'



export const register = (req: Request, res: Response) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const { name, email, password } = req.body;
  // Example code for SES:
  // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
  const params = {
    Source: `${process.env.EMAIL_FROM}`, /** SENDER_EMAIL_ADDRESS */
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: [`${process.env.EMAIL_TO}`],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<html><body><h1>Hello, ${name}</h1></body></html>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Complete your registration'
      }
    }
  }
  
  const sendEmailonRegister = new AWS.SES({
    apiVersion: '2010-12-01'
  }).sendEmail(params).promise()
  
  sendEmailonRegister.then(data => {
    console.log('Email submitted to SES', data)
    res.send('Email sent')
  }).catch(error => {
    console.log('SES email on register', error)
    res.send('Email failed')
  })
}