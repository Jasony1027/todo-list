import { createGlobalStyle, css } from "styled-components";

export default createGlobalStyle`
${({ theme }) => css`
  html {
    height: 100%;
      .todoapp {
        background: ${theme.colors.background};
        color: ${theme.colors.black};
      }
      .theme-switch {
        float: right
      }
      body {
         background: ${theme.colors.background};
      }
      a:visited{
        color:green;
      }
    }
  }
`}
`;
