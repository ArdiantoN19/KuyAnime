import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { FunctionComponent, ReactNode } from "react";

const Arrow: FunctionComponent<{
  children: ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => {
  return (
    <button type="button" className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export const NextArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <Arrow onClick={onClick}>
      <ArrowRight />
    </Arrow>
  );
};
export const PrevArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <Arrow onClick={onClick}>
      <ArrowLeft />
    </Arrow>
  );
};

export default Arrow;
