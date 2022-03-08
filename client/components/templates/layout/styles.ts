import styled from 'styled-components'

export const Main = styled.main`
  width: 960px;
  margin: 0 auto;
  padding: 7rem 0;
  height: 100%;
  min-height: calc(100vh - 41px);
  box-sizing: border-box;

  .paragraph {
    margin: 4rem 0.75rem;
  }

  pre {
    /* background-color: #eff0f1; */
    position: relative;
    padding: 8px;
    border-radius: 4px;
    overflow: auto;
    margin: 4rem 0;
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
    
    /* window-buttons */
    span[class*="red"] {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #e04f5f;
      position: absolute;
      top: 14px;
      left: 16px;
      z-index: 50;
    }
    span[class*="yellow"] {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fcba38;
      position: absolute;
      top: 14px;
      left: 33px;
      z-index: 50;
    }
    span[class*="green"] {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #00cc94;
      position: absolute;
      top: 14px;
      left: 50px;
      z-index: 50;
    }

    code {
      position: relative;
      top: -1.7rem;
    }
  }
  // styles regardless of programming language
  pre[class*="language-"],
  code[class*="language-"] {

  }
  // styles for javascript
  pre[class*="language-javascript"],
  code[class*="language-javascript"] {
    color: #4ec9b0;
  }
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6a9955;
  }

  .token.punctuation {
    color: #d4d4d4;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #b5cea8;
  }
`
