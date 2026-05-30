// Reusable syntax-highlight token spans (GitHub Dark theme).
// Keeps code-editor JSX readable: <K>const</K> <V>me</V> = ...

export const K = ({ children }) => (
  <span className="text-syn-keyword">{children}</span>
) // keyword
export const Fn = ({ children }) => (
  <span className="text-syn-func">{children}</span>
) // function name
export const Str = ({ children }) => (
  <span className="text-syn-string">{children}</span>
) // string
export const Num = ({ children }) => (
  <span className="text-syn-number">{children}</span>
) // number
export const Ty = ({ children }) => (
  <span className="text-syn-type">{children}</span>
) // type
export const Cm = ({ children }) => (
  <span className="text-syn-comment italic">{children}</span>
) // comment
export const P = ({ children }) => (
  <span className="text-syn-punc">{children}</span>
) // punctuation / brackets
export const Id = ({ children }) => (
  <span className="text-syn-ident">{children}</span>
) // identifier (default text)
export const Prop = ({ children }) => (
  <span className="text-[#79c0ff]">{children}</span>
) // object property key
