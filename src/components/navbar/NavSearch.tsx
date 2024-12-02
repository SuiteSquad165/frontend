"use client";

import { Input } from "../shadcn-ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useRouter } from "next/navigation";

type NavSearchProps = {
  onSearch: (value: string) => void; // Callback to pass the search term to the parent component
};

const NavSearch = ({ onSearch }: NavSearchProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    onSearch(value); // Trigger the callback with the updated search term
  }, 500);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push("/");
    }
  };

  return (
    <Input
      type="text"
      placeholder="Find a property by city..."
      className="max-w-xs dark:bg-muted"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      onKeyDown={handleKeyPress}
      value={search}
    />
  );
};

export default NavSearch;
