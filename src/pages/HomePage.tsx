import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/model/default" });
  }, []);

  return null;
}
