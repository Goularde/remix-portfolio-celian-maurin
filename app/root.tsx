import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import classNames from "classnames";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-10 bg-background h-12 ">
        <ul className="flex items-center justify-center text-xl gap-2">
          <AppNavLink to="">Projets</AppNavLink>
          <AppNavLink to="contact">Contact</AppNavLink>
          <AppNavLink to="dashboard">Dashboard</AppNavLink>
        </ul>
      </nav>
      <div className="pt-12 w-full mb-12">
        <Outlet />
      </div>
    </>
  );
}

type AppNavLinkProps = {
  to: string;
  children: React.ReactNode;
};

const AppNavLink = ({ to, children }: AppNavLinkProps) => {
  return (
    <li className="p-2 rounded-md">
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames("text-gray-500 hover:text-gray-300 ", {
            "text-white": isActive,
          })
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
