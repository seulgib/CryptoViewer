import React, {useState} from 'react';
import { ThemeProvider } from 'styled-components';
import  { darkTheme, lightTheme } from "./theme";
import Router from './Router';
//createGlobalStyle을 사용하면, 전역 스타일 default값을 줄 수 있음.
import styled,{createGlobalStyle} from 'styled-components';
import {ReactQueryDevtools} from 'react-query/devtools';
import './App.css';
import {useRecoilValue} from "recoil";
import { isDarkAtom } from './atom';

const GlobalStyle=createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap')
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  body{
    font-family:font-family: "Source Sans 3", sans-serif;
    background-color: ${props=>props.theme.bgColor};
    color:${props=>props.theme.textColor};
  }
  a{
    text-decoration:none;
    //color를 부모에게서 가져와라
    color:inherit;
  }
  *{
    box-sizing:border-box;
  }
`

function App(){
  const isDark = useRecoilValue(isDarkAtom);
  //<>은 fragment = 유령 컴포넌트로, 부모 없이 서로 붙어있는 것들을 return할 수 있음.
  return <>
  <ThemeProvider theme={isDark?darkTheme:lightTheme}>
  <GlobalStyle />
  <Router /> 
  <ReactQueryDevtools initialIsOpen={true}/>
  </ThemeProvider>
  </>;
}

export default App;
