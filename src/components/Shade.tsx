interface Props {
  shadeHexValue: string;
}

export default function Shade(props: Props) {
  return (
    <div
      data-name="shade"
      className=""
      style={{ backgroundColor: props.shadeHexValue }}
    ></div>
  );
}
