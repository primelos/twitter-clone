import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}
const SidebarRow = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex max-w-fit items-center space-x-2 p-x rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100 group"
    >
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter hidden text-base font-light lg:text-xl md:inline-flex cursor-pointer">
        {title}
      </p>
    </div>
  );
};

export default SidebarRow;
