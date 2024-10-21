import Link from "next/link";
import { Button } from "../shadcn-ui/button";
import Image from "next/image";
import favicon from "@/app/favicon.ico";

const Logo = () => {
  return (
    <Button size="icon" asChild className="bg-white hover:bg-gray-50 border-1">
      <Link href="/">
        <Image src={favicon} alt="Icon" className="w-6 h-6" />
      </Link>
    </Button>
  );
};

export default Logo;
