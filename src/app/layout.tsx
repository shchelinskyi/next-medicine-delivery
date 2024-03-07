import {ReactNode} from 'react';
import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import StoreProvider from "@/providers/StoreProvider";
import NavigationPanel from "@/components/NavigationPanel";
import "./globals.css";

const roboto = Roboto({subsets: ["latin"], weight:["300","400", "500",  "700",  "900"]});

export const metadata: Metadata = {
    title: "Medicine Delivery",
    description: "Get your medicine delivered fast and hassle-free. " +
        "Order online for convenient doorstep delivery. " +
        "Fast processing and confidential service guaranteed.",
};

export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={roboto.className}>
        <StoreProvider>
            <AntdRegistry>
                <div className="wrapper">
                    <NavigationPanel/>
                    <main>
                        {children}
                    </main>
                </div>
            </AntdRegistry>
        </StoreProvider>
        </body>
        </html>
    );
}
