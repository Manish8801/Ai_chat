"use client";
import { Button } from "@/components/ui/button";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleButton = (theme: "dark" | "light" | "system") => {
    setTheme(theme);
  };

  return (
    <div className="flex items-center justify-center rounded-full bg-accent-foreground/10">
      <Button
        variant="ghost"
        size="icon"
        className={`${theme === "light" ? "bg-accent-foreground/20" : ""} rounded-full flex items-center justify-center transition-colors duration-100`}
        onClick={() => handleButton("light")}
      >
        <Sun />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`${theme === "dark" ? "bg-accent-foreground/20" : ""} rounded-full flex items-center justify-center transition-colors duration-100`}
        onClick={() => handleButton("dark")}
      >
        <Moon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`${theme === "system" ? "bg-accent-foreground/20" : ""} rounded-full flex items-center justify-center transition-colors duration-100`}
        onClick={() => handleButton("system")}
      >
        <Laptop />
      </Button>
    </div>
  );
}
