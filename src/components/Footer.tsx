import FooterColumn from './FooterColumn';
import FooterSocialLinks from './FooterSocialLinks';
import { footerColumns, legalLinks } from './footerData';
import { Link } from 'react-aria-components';

function Footer() {
  return (
    <footer className="bg-black text-gray-50">
      <div className="flex w-full flex-col gap-8 px-4 py-12 lg:px-16">
        {/* Parte superior */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">

          <div className="flex w-full flex-col items-center gap-3 text-center lg:max-w-lg lg:items-start lg:text-left">
            <span className="text-base font-bold text-gray-50">LOGO</span>
            <p className="text-base leading-7 text-gray-50">
              Urna commodo pulvinar elementum fermentum ac rhoncus in id.
              Turpis lacus nullam dictum gravida egestas sed neque.
            </p>
            <FooterSocialLinks/>
          </div>

          {/* RESPONSIVE Mobile: grid de 3 cols, Desktop: flex row con gap fijo, alineado al inicio*/}
          <nav
            aria-label="Links del footer"
            className="grid grid-cols-3 justify-items-center gap-8 w-full lg:flex lg:gap-16 lg:w-auto lg:justify-items-start ">
            {footerColumns.map((col) => (
              <FooterColumn
                key={col.title}
                title={col.title}
                links={col.links}
              />
            ))}
          </nav>
        </div>

        {/*Linea que divide*/}
        <hr className="border-t border-white/28"/>

        {/*inferior */}
        <div className="flex flex-col items-center gap-4 text-base text-gray-50 lg:flex-row lg:justify-between">
          <div className=" flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:order-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-sm text-base underline underline-offset-4 transition hover:opacity-70
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >{link.label} </Link>
            ))}
          </div>
          <p className="text-center lg:order-1 lg:text-left"> © 2026 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;