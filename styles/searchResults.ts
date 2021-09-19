import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  box-sizing: border-box;
  margin-top: 0.25rem;
  padding-bottom: 0.25rem;
  border: 1px solid ${({ theme }) => theme.text};  
  /* border-right: 1px solid ${({ theme }) => theme.text}; */
  gap: 0.25rem;

  /* width */        
  ::-webkit-scrollbar {
      width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
      background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
      background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
      background: #555;
  }
`
export const Result = styled.p`
  font-size: 13px;
  padding: 8px 24px;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.text};
`
