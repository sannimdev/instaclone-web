import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme = {
    accent: '#0095f6',
    bgColor: '#FAFAFA',
    fontColor: '#383838',
    borderColor: 'rgb(219, 219 , 219)',
};
export const darkTheme = {
    bgColor: '#2c2c2c',
    fontColor: '#383838',
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: ${(props) => props.theme.fontColor}
    }
    a {
      text-decoration: none;
    }
`;
