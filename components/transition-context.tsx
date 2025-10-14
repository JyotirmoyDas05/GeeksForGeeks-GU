"use client";

import React, { createContext, useContext, useState } from "react";

type TransitionContextValue = {
  isTransitionActive: boolean;
  setTransitionActive: (v: boolean) => void;
};

const TransitionContext = createContext<TransitionContextValue | undefined>(
  undefined
);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitionActive, setIsTransitionActive] = useState(false);

  return (
    <TransitionContext.Provider
      value={{ isTransitionActive, setTransitionActive: setIsTransitionActive }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}

export default TransitionContext;
