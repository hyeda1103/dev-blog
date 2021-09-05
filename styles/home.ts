import styled from "styled-components";

export const Bookshelf = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  position: relative;
  box-sizing: border-box;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.text};
`