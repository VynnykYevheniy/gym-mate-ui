import React from "react";
import MenuItem from "./MenuItem";

const MenuSection = ({ sectionName, items, onMenuClick }) => (
    <div>
        <p className="text-secondTextColor text-xl mb-4 text-left">{sectionName}</p>
        <section className="mb-8 p-0">
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        iconSrc={item.iconSrc}
                        label={item.label}
                        onClick={() => onMenuClick(item.component)}
                    />
                ))}
            </ul>
        </section>
    </div>
);

export default MenuSection;
