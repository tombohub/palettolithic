interface Props {
  shadeHexValue: string;
}

export default function Shade(props: Props) {
  return <div style={{ backgroundColor: props.shadeHexValue }}></div>;
}
