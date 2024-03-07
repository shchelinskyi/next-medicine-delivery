import {Fragment} from "react";
import Link from "next/link";
import {links} from "@/utils/links";
import s from "./NavigationPanel.module.scss";

const NavigationPanel = () => {
    return (
        <nav>
            <ul className={s.list}>
                {links.map((item, index) => {
                    return (
                        <Fragment key={item.linkName}>
                            <li className={s.listItem}>
                                <Link href={item.linkHref} className={s.link}>
                                    {item.linkName}
                                </Link>
                            </li>
                            {index % 2 === 0 && index !== links.length - 1 && (
                                <li className={s.divider} />
                            )}
                        </Fragment>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavigationPanel;
