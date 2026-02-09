import React from "react";
import Link from "next/link";

export default function MenuWidget({ data, title }) {
  return (
    <div className="cs_menu_widget_wrap">
      {title && (
        <h3 className="cs_menu_widget_title cs_fs_20 cs_semibold mb-3">
          {title}
        </h3>
      )}
      <nav aria-label={title || "Navigation"}>
        <ul className="cs_menu_widget cs_mp0">
          {data?.map((item, index) => (
            <li key={index}>
              <Link href={item.href} prefetch={true}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
