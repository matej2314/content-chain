import Image from 'next/image';

const SIDEBAR_BRAND_ALT = 'Content Chain';
const SIDEBAR_LOGO_SRC = '/content-chain-logo-transparent.png';
const SIDEBAR_LOGO_WIDTH = 530;
const SIDEBAR_LOGO_HEIGHT = 275;

export function SidebarBrandMark() {
  return (
    <Image
      src={SIDEBAR_LOGO_SRC}
      alt={SIDEBAR_BRAND_ALT}
      width={SIDEBAR_LOGO_WIDTH}
      height={SIDEBAR_LOGO_HEIGHT}
      className="h-16 lg:h-20 w-auto"
    />
  );
}
