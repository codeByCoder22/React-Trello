[react router dom auth](https://www.robinwieruch.de/react-router-authentication/)
[react router dom auth](D:\Documents\Web\React\react_router_dom_auth)

Error :
ERROR in src/shared/components/InlineFormComponent.tsx:74:29
TS2322: Type 'RefObject<HTMLInputElement | HTMLTextAreaElement>' is not assignable to type 'LegacyRef<HTMLInputElement> | undefined'.  
 Type 'RefObject<HTMLInputElement | HTMLTextAreaElement>' is not assignable to type 'RefObject<HTMLInputElement>'.
Type 'HTMLInputElement | HTMLTextAreaElement' is not assignable to type 'HTMLInputElement'.
Type 'HTMLTextAreaElement' is missing the following properties from type 'HTMLInputElement': accept, align, alt, capture, and 27 more.
72 | placeholder={inputPlaceholder}
73 | onKeyDown={handleKeyDown}

> 74 | ref={inputRef}

       |                             ^^^
    75 |                         />
    76 |                     )}
    77 |                     {inputType === "textarea" && (

ERROR in src/shared/components/InlineFormComponent.tsx:85:29
TS2322: Type 'RefObject<HTMLInputElement | HTMLTextAreaElement>' is not assignable to type 'LegacyRef<HTMLTextAreaElement> | undefined'.  
 Type 'RefObject<HTMLInputElement | HTMLTextAreaElement>' is not assignable to type 'RefObject<HTMLTextAreaElement>'.
Type 'HTMLInputElement | HTMLTextAreaElement' is not assignable to type 'HTMLTextAreaElement'.
Type 'HTMLInputElement' is missing the following properties from type 'HTMLTextAreaElement': cols, rows, textLength, wrap
83 | className="input-form-input"
84 | onKeyDown={handleKeyDown}

> 85 | ref={inputRef}

       |                             ^^^
    86 |                         ></textarea>
    87 |                     )}
    88 |                     {hasButton && (

/**\*\*\*\***\***\*\*\*\*** \*/
npm run build
serve -s build

npm install @reduxjs/toolkit
