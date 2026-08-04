import{B as e,H as t}from"./utils-BkEaPY0J.js";import{t as n}from"./jsx-runtime-DIf4hgSt.js";import{t as r}from"./ThemeContext-BGcjjvPb.js";var i=t(e(),1);function a(e,t){(0,i.useEffect)(()=>{if(!e)return;let n=setTimeout(()=>{t(!1)},2200);return()=>clearTimeout(n)},[e])}var o=n();function s({title:e,additionalStyle:t=``}){let n=(0,i.useContext)(r).theme;return(0,o.jsxs)(`div`,{className:`
        fixed right-5 bottom-5
        flex items-center gap-3
        max-w-sm
        rounded-xl
        border
        backdrop-blur-md
        px-4 py-3
        ${n===`Light`?`shadow-lg`:`shadow-primary/30`}
        text-sm
        animate-in fade-in slide-in-from-bottom-4
        ${t}
      `,children:[(0,o.jsx)(`div`,{className:`\r
          flex h-6 w-6\r
          shrink-0\r
          items-center justify-center\r
          rounded-full\r
          bg-current/20\r
        `,children:`!`}),(0,o.jsx)(`p`,{children:e})]})}export{a as n,s as t};