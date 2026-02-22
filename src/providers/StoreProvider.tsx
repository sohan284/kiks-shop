"use client";

// this wrapper is required because next.js app router layouts are server components
// redux provider only works on the client side, so we isolate it here
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
