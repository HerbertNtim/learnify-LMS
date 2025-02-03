import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseCategories } from "@/lib/utils";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A toolbar component with search bar and dropdown select for categories.
 *
 * @param {ToolbarProps} props The props for the toolbar component.
 * @prop {Function} onSearch Called when the search bar is changed.
/******  cbc29356-48f1-4604-8e5d-e59962e6b24f  *******/const Toolbar = ({ onSearch, onCategoryChange }: ToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="toolbar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search courses"
        className="toolbar__search"
      />
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="toolbar__select">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className="bg-customgreys-primarybg hover:bg-customgreys-primarybg">
          <SelectItem value="all" className="toolbar__select-item">
            All Categories
          </SelectItem>
          {courseCategories.map((category) => (
            <SelectItem
              key={category.value}
              value={category.value}
              className="toolbar__select-item"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Toolbar;
