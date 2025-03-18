"use client";
import React from "react";

interface ITextPropType {
  style?: string;
  id?: string;
  children: React.ReactNode;
  as?: "h2" | "h1" | "h3" | "h4" | "h5" | "h6" | "p";
  clickFunc?: () => void;
}

export const Text: React.FC<ITextPropType> = ({
  style,
  children,
  clickFunc,
  id,
  as,
}: ITextPropType) => {
  const Component: React.FC<ITextPropType> = ({
    as,
    style,
    id,
    clickFunc,
    children,
  }) => {
    const Element = as ? as : "div";
    return React.createElement(
      Element,
      { className: style, onClick: clickFunc, id: id },
      children
    );
  };
  if (as) {
    return (
      <Component style={style} clickFunc={clickFunc} as={as} id={id}>
        {children}
      </Component>
    );
  } else {
    return (
      <h6 className={style} onClick={clickFunc} id={id}>
        {children}
      </h6>
    );
  }
};
