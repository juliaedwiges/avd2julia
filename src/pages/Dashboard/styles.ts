import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Tabela = styled.table`
  margin-top: 2rem;
  tr td {
    border: 1px solid #ddd;
    text-align: center;
  }
  tr:hover {
    background-color: #5f9ea0;
  }
  thead {
    background-color: #5f9ea0;
  }
`;

export const H1 = styled.h1` 
    font-size: 25px;
    color: #0000CD;
    text-align: center;
`;

export const Button = styled.button` 
    background-color: #008CBA;
    color: #FFFFFF
`;

export const ButtonRed = styled.button` 
    background-color: #FF0000;
    color: #FFFFFF;
`;

export const ButtonGreen = styled.button` 
    background-color: #32CD32;
    color: #FFFFFF;
`;

