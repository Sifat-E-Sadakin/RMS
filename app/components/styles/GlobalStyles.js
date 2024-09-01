import { createGlobalStyle } from "styled-components";

export const sizes = {
  xxl: 1920,
  xl: 1440,
  lg: 1280,
  md: 1024,
  sm: 768,
  xs: 360,
};

export const resFont = (min, max) => {
  return `calc(${min}px + (${max} - ${min}) * ((100vw - 360px) / (1920 - 360)))`;
};

export const query = size => {
  return `@media screen and (min-width: ${size}px)`;
};

const GlobalStyle = createGlobalStyle`
    body{
        background-color: #ffffff;
        color: #000000;
        margin: 0;
    }
    h1,h2,h3,h4,h5,h6,p{
        margin: 0;
    }
    a{
        text-decoration: none;
    }
    ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    main{
      min-height: 40.7vh;
    }
    .main-container{
        padding: 30px 20px;
        ${query(sizes.md)}{
            padding: 40px 50px;
        }
        ${query(sizes.lg)}{
            padding: 60px 10%;
        }
    }
    .main-container-x{
        padding: 0 20px;
        ${query(sizes.md)}{
            padding: 0 50px;
        }
        ${query(sizes.lg)}{
            padding: 0 10%;
        }
    }
    .main-container-y{
      padding: 30px 0px;
        ${query(sizes.md)}{
            padding: 40px 0px;
        }
        ${query(sizes.lg)}{
            padding: 60px 0%;
        }
    }
 
`;

export default GlobalStyle;
